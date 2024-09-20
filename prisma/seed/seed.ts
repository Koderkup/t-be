import {
  PrismaClient,
  Currency,
  SegmentType,
  Order,
  Country,
  CategoryType,
  SubscriberMessageStatus,
} from '@prisma/client';
import { copycat } from '@snaplet/copycat';
import { CurrencyNameMapping } from '../../src/helpers/currency';
import shopTemplatesMockData from '../../src/helpers/shopTemplatesMockData';
import lodash from 'lodash';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { open } from 'fs/promises';

const prisma = new PrismaClient();
const currencies = Object.keys(CurrencyNameMapping);
const curLen = currencies.length;

const s3client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
});

async function createImageLinks() {
  const images_name = [
    'q1.png',
    'q2.png',
    'q3.png',
    'q4.png',
    'q5.png',
    'q6.png',
  ];
  const array_of_images: Array<string> = [];

  for (const filename of images_name) {
    const fd = await open(`./prisma/seed/images/${filename}`);
    try {
      const stream = fd.createReadStream();
      const f_name = Date.now().toString();
      const command = new PutObjectCommand({
        Bucket: 'tapply',
        Key: f_name,
        Body: stream,
        ContentType: 'image/png',
      });
      await s3client.send(command);
      array_of_images.push(f_name);
    } finally {
      await fd.close();
    }
  }

  return array_of_images;
}

const getRandomCurrency = () => {
  const len = lodash.random(1, 7);
  const arr: Currency[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(currencies[Math.floor(Math.random() * curLen)] as Currency);
  }
  return arr;
};

const randomIndex = (arrayLength: number) =>
  Math.floor(Math.random() * arrayLength);

function getRandomSubset(array: string[]) {
  const shuffledArray = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const randomCount = randomIndex(array.length) + 1;

  return shuffledArray.slice(0, randomCount);
}

const main = async () => {
  console.log('Starting seeding process...');
  const mediaLinks = await createImageLinks();
  console.log('Media links created:', mediaLinks);

  const seededMessage = (table: string) => console.log(`${table} seeded.`);
  const skipSeedingMessage = (table: string) =>
    console.log(`${table} already exist, skipping seeding.`);

  // Seed users
  let users = await prisma.user.findMany();

  if (users.length === 0) {
    users = await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.user.create({
          data: {
            password:
              '$2b$10$dxoVAxyi2nnEtf2DGfxw7ueGGLL8W9QZbFZGx/Jgn7iWw75j8VUMe',
            email: `user${index}@test-user-email.com`,
            telegramId: lodash.random(105655000).toString(),
            firstname: `test-name-${index}`,
            lastname: 'test-lastName',
          },
        }),
      ),
    );
    seededMessage('Users');
  } else {
    skipSeedingMessage('Users');
  }

  const designTags = ['Light', 'Minimalism', 'Bright', 'Classic'];

  // Seed designs
  let designs = await prisma.design.findMany();

  if (designs.length === 0) {
    designs = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.design.create({
          data: {
            textSize: +lodash.random(10, 20),
            price: +lodash.random(10, true),
            tags: getRandomSubset(designTags),
          },
        }),
      ),
    );
    seededMessage('Designs');
  } else {
    skipSeedingMessage('Designs');
  }

  // Seed templates
  let templates = await prisma.template.findMany();

  if (templates.length === 0) {
    templates = await Promise.all(
      shopTemplatesMockData.map((templateMock, index) => {
        return prisma.template.create({
          data: {
            name: templateMock.name,
            description: templateMock.description,
            isBlocked: !!(index % 2),
            mediaUrl: 'https://img.icons8.com/ios/50/shop--v1.png',
          },
        });
      }),
    );
    seededMessage('Templates');
  } else {
    skipSeedingMessage('Templates');
  }

  // Seed shops
  let shops = await prisma.shop.findMany();

  if (shops.length === 0) {
    shops = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.shop.create({
          data: {
            inDraft: lodash.random(0, 1) ? true : false,
            user: {
              connect: users.map((user) => ({ id: user.id }))[0],
            },
            design: {
              connect: designs.map((design) => ({ id: design.id }))[0],
            },
            template: {
              connect: templates.map((template) => ({ id: template.id }))[
                lodash.random(0, templates.length - 1)
              ],
            },
            name: 'test-name',
            type: 'test-type',
            description: 'random description',
            mediaUrl:
              'https://www.indiafilings.com/learn/wp-content/uploads/2023/03/How-can-I-register-my-shop-and-establishment-online.jpg',
          },
        }),
      ),
    );
    seededMessage('Shops');
  } else {
    skipSeedingMessage('Shops');
  }

  // Seed app configurations
  const appConfigCount = await prisma.appConfiguration.count();

  if (appConfigCount <= 1) {
    await prisma.appConfiguration.create({
      data: {
        minOrderAmountWithDelivery: +lodash.random(500, true).toFixed(2),
        minOrderAmountWithoutDelivery: +lodash.random(100, true).toFixed(2),
        location: copycat.postalAddress(lodash.random(100, true).toFixed(2)),
        phoneNumber: copycat.phoneNumber(+lodash.random(100, true).toFixed(2)),
        email: copycat.email('seed', {
          domain: 'tapply-email.dev',
          limit: 15,
        }),
        emailPassword:
          '$2b$10$dxoVAxyi2nnEtf2DGfxw7ueGGLL8W9QZbFZGx/Jgn7iWw75j8VUMe',
        shopCurrencies: getRandomCurrency(),
        shop: {
          connect: { id: shops[0].id },
        },
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        country: lodash.sample(Object.keys(Country)) as Country,
      },
    }),
      seededMessage('AppConfigurations');
  } else {
    skipSeedingMessage('AppConfigurations');
  }

  // Seed promotional blocks
  const promoBlockCount = await prisma.promotionalBlock.count();

  if (promoBlockCount === 0) {
    await Promise.all(
      Array.from({ length: 5 }).map((_, index) =>
        prisma.promotionalBlock.create({
          data: {
            shop: {
              connect: shops.map((shop) => ({ id: shop.id }))[0],
            },
            mediaUrl: lodash.sample(mediaLinks),
            link: 'https://randomForTest.com',
            isActive: !!(index % 2),
          },
        }),
      ),
    );

    seededMessage('promotionalBlocks');
  } else {
    skipSeedingMessage('promotionalBlocks');
  }

  // Seed categories
  const categories = await prisma.categoryType.findMany();
  let categories1: CategoryType[] = categories.filter(
    (category) => !category.parentId,
  );
  let categories2: CategoryType[] = categories.filter(
    (category) => !!category.parentId,
  );

  if (categories1.length === 0) {
    categories1 = await Promise.all(
      Array.from({ length: 5 }).map((_, index) =>
        prisma.categoryType.create({
          data: {
            createdAt: copycat.dateString('foo', {
              minYear: 2023,
              maxYear: 2024,
            }),
            updatedAt: copycat.dateString('foo', {
              minYear: 2025,
              maxYear: 2026,
            }),
            shop: {
              connect: { id: shops[0].id },
            },
            name: `test-name-${index}`,
            description: 'test-description',
          },
        }),
      ),
    );

    seededMessage('Category without parent');
  } else {
    skipSeedingMessage('Category without parent');
  }

  if (categories2.length === 0) {
    categories2 = await Promise.all(
      Array.from({ length: 5 }).map((_, index) =>
        prisma.categoryType.create({
          data: {
            createdAt: copycat.dateString('foo', {
              minYear: 2023,
              maxYear: 2024,
            }),
            updatedAt: copycat.dateString('foo', {
              minYear: 2025,
              maxYear: 2026,
            }),
            shop: {
              connect: { id: shops[0].id },
            },
            parent: {
              connect: { id: categories1[0].id },
            },
            name: `test-name-cat2-${index}`,
            description: 'test-description',
          },
        }),
      ),
    );

    seededMessage('Category with parent');
  } else {
    skipSeedingMessage('Category with parent');
  }

  // Seed care lists
  let careLists = await prisma.careList.findMany();

  if (careLists.length === 0) {
    careLists = await Promise.all(
      Array.from({ length: 5 }).map((_, index) =>
        prisma.careList.create({
          data: {
            shop: {
              connect: { id: shops[0].id },
            },
            name: `test-name-careList-${index}`,
            text: 'some text',
          },
        }),
      ),
    );

    seededMessage('CareLists');
  } else {
    skipSeedingMessage('CareLists');
  }

  // Seed colors
  let colors = await prisma.color.findMany();

  if (colors.length === 0) {
    colors = await Promise.all(
      Array.from({ length: 5 }).map((_, index) =>
        prisma.color.create({
          data: {
            shop: {
              connect: { id: shops[0].id },
            },
            name: `test-name-colors-${index}`,
            hexCode: 'fff',
          },
        }),
      ),
    );

    seededMessage('Colors');
  } else {
    skipSeedingMessage('Colors');
  }

  // Seed sizes
  let sizes = await prisma.size.findMany();

  if (sizes.length === 0) {
    sizes = await Promise.all(
      Array.from({ length: 5 }).map((_, index) =>
        prisma.size.create({
          data: {
            shop: {
              connect: { id: shops[0].id },
            },
            name: `test-name-size-${index}`,
          },
        }),
      ),
    );

    seededMessage('Sizes');
  } else {
    skipSeedingMessage('Sizes');
  }

  // Seed product items
  let productItems = await prisma.productItem.findMany();

  if (productItems.length === 0) {
    productItems = await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.productItem.create({
          data: {
            prices: [
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
            ],
            createdAt: copycat.dateString('foo', {
              minYear: 2023,
              maxYear: 2024,
            }),
            updatedAt: copycat.dateString('foo', {
              minYear: 2025,
              maxYear: 2026,
            }),
            careList: {
              connect: { id: careLists[0].id },
            },
            categoryType: {
              connect: { id: categories2[0].id },
            },
            colors: {
              connect: { id: colors[0].id },
            },
            sizes: {
              connect: { id: sizes[0].id },
            },
            shop: {
              connect: { id: shops[0].id },
            },
            mediasUrl: mediaLinks.slice(0, index),
            name: `test-name-${index}`,
            descriptionFull: 'description full',
            descriptionShort: 'description short',
            cost: lodash.random(10, true),
            stock: lodash.random(10, true),
            currency: getRandomCurrency()[0],
            discount: lodash.random(10, 70),
            isFeatured: true,
          },
        }),
      ),
    );

    seededMessage('ProductItems');
  } else {
    skipSeedingMessage('ProductItems');
  }

  // Seed recommendations
  const recommendationCount = await prisma.recommendation.count();

  if (recommendationCount === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.recommendation.create({
          data: {
            productItem: {
              connect: { id: productItems[index].id },
            },
            recommendedItem: {
              connect: { id: productItems[index].id },
            },
            shop: {
              connect: { id: shops[0].id },
            },
          },
        }),
      ),
    );

    seededMessage('Recommendations');
  } else {
    skipSeedingMessage('Recommendations');
  }

  // Seed customers
  let customers = await prisma.customer.findMany();

  if (customers.length === 0) {
    customers = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.customer.create({
          data: {
            telegramID: lodash.random(105655000).toString(),
            preferredCurrency: getRandomCurrency()[0],
            shop: {
              connect: { id: shops[0].id },
            },
            lastLogin: new Date(),
          },
        }),
      ),
    );

    seededMessage('Customers');
  } else {
    skipSeedingMessage('Customers');
  }

  // Seed promo codes
  let promoCodes = await prisma.promoCode.findMany();

  if (promoCodes.length === 0) {
    promoCodes = await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.promoCode.create({
          data: {
            code:
              copycat.word(lodash.random(1, 100).toFixed(2)).toUpperCase() +
              index,
            discount: +lodash.random(1, 100).toFixed(2),
            isActive: lodash.random(0, 1) ? true : false,
            startDate: copycat.dateString('bar', {
              minYear: 2023,
              maxYear: 2024,
            }),
            endDate: copycat.dateString('bar', {
              minYear: 2025,
              maxYear: 2026,
            }),
            shop: {
              connect: { id: shops[0].id },
            },
          },
        }),
      ),
    );

    seededMessage('PromoCodes');
  } else {
    skipSeedingMessage('PromoCodes');
  }

  // Seed orders
  let orders = await prisma.order.findMany();

  if (orders.length === 0) {
    orders = await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.order.create({
          data: {
            totalPrice: [
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
            ],
            discountAmount: +lodash.random(1, 100).toFixed(2),
            deliveryPrice: +lodash.random(100, 200),
            customer: {
              connect: lodash.sample(customers),
            },
            shop: {
              connect: lodash.sample(shops),
            },
            promoCode: {
              connect: lodash.sample(promoCodes),
            },
            orderNumber: index,
            currency: getRandomCurrency()[0],
          },
        }),
      ),
    );

    seededMessage('Orders');
  } else {
    skipSeedingMessage('Orders');
  }

  const orders1 = orders.slice(0, orders.length / 2);
  const orders2 = orders.slice(orders.length / 2);

  // Seed order items
  const orderItemsCount = await prisma.orderItem.count();

  if (orderItemsCount === 0) {
    await Promise.all(
      Array.from({ length: 4 }).map(() =>
        prisma.orderItem.create({
          data: {
            prices: [
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
            ],
            productItem: {
              connect: { id: productItems[0].id },
            },
            shop: {
              connect: { id: shops[0].id },
            },
            order: {
              connect: { id: orders1[0].id },
            },
            quantity: lodash.random(1, 10),
          },
        }),
      ),
    );

    await Promise.all(
      Array.from({ length: 4 }).map(() =>
        prisma.orderItem.create({
          data: {
            prices: [
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
              {
                currency: getRandomCurrency(),
                price: lodash.random(10000, true).toFixed(2),
              },
            ],
            productItem: {
              connect: { id: productItems[1].id },
            },
            shop: {
              connect: { id: shops[0].id },
            },
            order: {
              connect: { id: orders2[0].id },
            },
            quantity: lodash.random(1, 10),
          },
        }),
      ),
    );

    seededMessage('OrderItems');
  } else {
    skipSeedingMessage('OrderItems');
  }

  const updateCustomersWithOrders = async (orders: Order[]) => {
    for (const customer of customers) {
      await prisma.customer.update({
        where: { telegramID: customer.telegramID },
        data: {
          orders: {
            connect: orders.map((order) => ({ id: order.id })),
          },
        },
      });
    }
  };

  await updateCustomersWithOrders(orders1)
    .then(() => console.log('Customers updated successfully with orders1'))
    .catch((error) => console.error('Error updating customers:', error));

  await updateCustomersWithOrders(orders2)
    .then(() => console.log('Customers updated successfully with orders2'))
    .catch((error) => console.error('Error updating customers:', error));

  // Seed ad blocks
  const adBlocksCount = await prisma.adBlock.count();

  if (adBlocksCount === 0) {
    await Promise.all(
      Array.from({ length: 1 }).map(() =>
        prisma.adBlock.create({
          data: {
            createdAt: copycat.dateString('foo', {
              minYear: 2023,
              maxYear: 2024,
            }),
            updatedAt: copycat.dateString('foo', {
              minYear: 2025,
              maxYear: 2026,
            }),
            shop: {
              connect: { id: shops[0].id },
            },
            mediaUrl: lodash.sample(mediaLinks),
            promoTitle: 'test-promo-title',
            promoLink: 'some link',
            promoURL: 'some url',
            isActive: true,
          },
        }),
      ),
    );
    seededMessage('AdBlocks');
  } else {
    skipSeedingMessage('AdBlocks');
  }

  // Seed functionalities
  let functionalities = await prisma.functionality.findMany();

  if (functionalities.length === 0) {
    functionalities = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.functionality.create({
          data: {
            shops: {
              connect: { id: shops[0].id },
            },
            mediaUrl: mediaLinks[0],
            name: 'test-name',
            description: 'test-description',
            userPayment: {},
            price: lodash.random(10, true),
          },
        }),
      ),
    );

    seededMessage('Functionalities');
  } else {
    skipSeedingMessage('Functionalities');
  }

  // Seed messages to subscribers
  await Promise.all(
    Array.from({ length: 10 }).map((_, index) =>
      prisma.subscriberMessage.create({
        data: {
          message: `test-message-text-${index}`,
          mediaUrl:
            'https://wholesalehelper.io/blog/wp-content/uploads/2022/10/How-to-Offer-Volume-Discount-on-Shopify-Store-270x180.png',
          shopId: shops[randomIndex(shops.length)].id,
          status: Object.values(SubscriberMessageStatus)[
            Math.floor(
              Math.random() * Object.values(SubscriberMessageStatus).length,
            )
          ],
        },
      }),
    ),
  );

  // Seed user payments
  const userPaymentsCount = await prisma.userPayment.count();

  if (userPaymentsCount === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.userPayment.create({
          data: {
            user: {
              connect: { id: users[0].id },
            },
            shop: {
              connect: { id: shops[0].id },
            },
            design: {
              connect: { id: designs[0].id },
            },
            functionalities: {
              connect: functionalities.map((f) => ({ id: f.id })),
            },
            paymentIdentifier: '',
            paymentMethod: 'ton',
            totalPrice: lodash.random(100, 200),
          },
        }),
      ),
    );

    seededMessage('UsesPayments');
  } else {
    skipSeedingMessage('UsesPayments');
  }

  // Seed dashboards
  const dashboardsCount = await prisma.dashboard.count();

  if (dashboardsCount === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.dashboard.create({
          data: {
            logs: '',
            notifications: '',
            analytics: '',
          },
        }),
      ),
    );

    seededMessage('Dashboards');
  } else {
    skipSeedingMessage('Dashboards');
  }

  // Seed segments
  const segmentsCount = await prisma.segment.count();

  if (segmentsCount === 0) {
    await Promise.all(
      Object.values(SegmentType).map((type) =>
        prisma.segment.create({
          data: {
            type,
            description: 'test',
          },
        }),
      ),
    );

    seededMessage('Segments');
  } else {
    skipSeedingMessage('Segments');
  }

  // Seed comment
  const commentCount = await prisma.comment.count();

  if (commentCount === 0) {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.comment.create({
          data: {
            content: `Test text ${index}`,
            productItemId: productItems[index].id,
            rating: lodash.random(1, 5),
            customerId: customers[index].telegramID,
          },
        }),
      ),
    );
    seededMessage('Comment');
  } else {
    skipSeedingMessage('Comment');
  }

  // TODO: remove in the next PR!
  const shop = await prisma.shop.create({
    data: {
      name: 'Tapply',
      user: { connect: { id: (await prisma.user.findFirst()).id } },
      type: 'Food and Beverage',
      customers: {
        connect: customers.map((c) => ({
          telegramID: c.telegramID,
        })),
      },
      promoCodes: { connect: { id: promoCodes[0].id } },
      products: {
        connect: productItems.map((p) => ({ id: p.id })),
      },
      orders: { connect: orders.map((o) => ({ id: o.id })) },
      configuration: {
        connect: { id: (await prisma.appConfiguration.findFirst()).id },
      },
      promotionalBlock: {
        connect: { id: (await prisma.promotionalBlock.findFirst()).id },
      },
      categoryType: { connect: { id: categories[0].id } },
      careList: { connect: { id: careLists[0].id } },
      color: { connect: { id: colors[0].id } },
      size: { connect: { id: sizes[0].id } },
      recommendation: {
        connect: { id: (await prisma.recommendation.findFirst()).id },
      },
      orderItem: { connect: { id: (await prisma.orderItem.findFirst()).id } },
      adBlock: {
        connect: { id: (await prisma.adBlock.findFirst()).id },
      },
      functionalities: { connect: { id: functionalities[0].id } },
      design: {
        connect: { id: designs[0].id },
      },
      userPayment: {
        connect: { id: (await prisma.userPayment.findFirst()).id },
      },
      template: { connect: { id: templates[0].id } },
      description: 'Description...',
      mediaUrl:
        'https://www.indiafilings.com/learn/wp-content/uploads/2023/03/How-can-I-register-my-shop-and-establishment-online.jpg',
      subscriberMessage: {
        connect: { id: (await prisma.subscriberMessage.findFirst()).id },
      },
    },
  });

  console.log('!!!Shop', shop.id);

  console.log('Database seeded successfully!');
};

main()
  .catch((e) => {
    console.error('Seeding error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
