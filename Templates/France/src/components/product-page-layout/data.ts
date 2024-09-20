import testImg from 'public/images/product-2.webp';
import testImg2 from 'public/images/product-4.webp';

export const recommendationsData = [
  {
    id: '4',
    name: 'Cozy Cascade Knit',
    descriptionShort: 'It is shirt item',
    prices: [
      {
        price: 200,
        currency: 'USD',
      },
      {
        price: 300,
        currency: 'TWD',
      },
    ],
    mediasUrl: [testImg],
  },
  {
    id: '5',
    name: 'Radiant Bloom Floral',
    descriptionShort: 'This is a test item',
    prices: [
      {
        price: 200,
        currency: 'USD',
      },
      {
        price: 300,
        currency: 'TWD',
      },
    ],
    mediasUrl: [testImg2],
  },
];

export const careListData = {
  id: '1-care',
  text: '<ul><li>Fabric: High-quality blend of polyester and spandex</li><li>Sparkling sequins for a celestial touch</li><li>Soft and comfortable for extended wear</li><li>Relaxed fit for easy movement</li> <li>Versatile for various occasions</li> <li>Care: Hand wash or delicate cycle in cold water</li><li>Avoid harsh chemicals and tumble dry on low</li><li>Lay flat to dry for best results</li><li>Store flat to preserve sequin integrity</li></ul>',
};
