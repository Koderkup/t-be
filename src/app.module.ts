import {
  // MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { PromotionalBlockModule } from './modules/promotional-block/promotional-block.module';
import { CategoryTypeModule } from './modules/category-type/category-type.module';
import { ColorModule } from './modules/color/color.module';
import { SizeModule } from './modules/size/size.module';
import { CareListModule } from './modules/care-list/care-list.module';
import { ProductItemModule } from './modules/product-item/product-item.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { AdBlockModule } from './modules/ad-block/ad-block.module';
import { AppConfigurationsModule } from './modules/app-configuration/app-configuration.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PromoCodeModule } from './modules/promo-code/promo-code.module';
import { ShopModule } from './modules/shop/shop.module';
import { SegmentModule } from './modules/segment/segment.module';
import { MailModule } from './modules/mail/mail.module';
import { DesignModule } from '@modules/design/design.module';
import { FunctionalityModule } from '@modules/functionality/functionality.module';
import { UserPaymentModule } from '@modules/user-payment/user-payment.module';
// import { RedisLoggerMiddleware } from './middlewares/redis.logger';
// import { excludeRedisRoutes } from '@const/redis.exclude-routes';
import { APP_FILTER } from '@nestjs/core';
import { StatisticsModule } from '@modules/statistics/statistics.module';
import { RedisModule } from '@modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import awsConfig from '@cfg/aws.config';
import { UploaderModule } from '@modules/uploader/uploader.module';
import { CustomLoggerService } from './logger/custom-logger.service';
import { LogicExceptionFilter } from './filters/exception.filter';
import { BotModule } from './modules/bot/bot.module';
import { SubscriberMessageModule } from './modules/subscriber-message/subscriber-message.module';
import { CustomLoggerModule } from './logger/custom-logger.module';
import { TemplatesModule } from './modules/template/template.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from '@services/cron.service';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { CommentModule } from '@modules/comment/comment.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UploaderModule,
    PromotionalBlockModule,
    CategoryTypeModule,
    ColorModule,
    SizeModule,
    CareListModule,
    ProductItemModule,
    AuthModule,
    UserModule,
    OrderModule,
    AdBlockModule,
    ShopModule,
    AppConfigurationsModule,
    CustomerModule,
    PromoCodeModule,
    SegmentModule,
    MailModule,
    UserPaymentModule,
    DesignModule,
    CommentModule,
    FunctionalityModule,
    StatisticsModule,
    RedisModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'local '
          ? '.env'
          : `.env-${process.env.NODE_ENV}`,
      load: [awsConfig],
      isGlobal: true,
    }),
    BotModule,
    SubscriberMessageModule,
    CustomLoggerModule,
    TemplatesModule,
    RecommendationModule,
  ],
  providers: [
    PrismaService,
    CustomLoggerService,
    {
      provide: APP_FILTER,
      useFactory: (logger: CustomLoggerService) =>
        new LogicExceptionFilter(logger),
      inject: [CustomLoggerService],
    },
    CronService,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(RedisLoggerMiddleware)
  //     .exclude(...excludeRedisRoutes)
  //     .forRoutes('*');
  // }
}
