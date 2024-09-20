import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { LogicExceptionFilter } from './filters/exception.filter';
import { CustomLoggerService } from './logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Tapply BE')
    .setDescription('BE Server for LMSYV')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      responses: {
        '403': { description: 'Forbidden' },
        '404': { description: 'Not Found' },
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(morgan('dev'));
  const logger = app.get(CustomLoggerService);
  app.useGlobalFilters(new LogicExceptionFilter(logger));

  await app.listen(1337);
  //const server = app.getHttpServer();
  //const router = server._events.request._router;

  //const availableRoutes: [] = router.stack
  //  .map((layer) => {
  //    if (layer.route) {
  //      return {
  //        route: {
  //          path: layer.route?.path,
  //          method: layer.route?.stack[0].method,
  //        },
  //      };
  //    }
  //  })
  //  .filter((item) => item !== undefined);
  //console.log(availableRoutes);
}
bootstrap();
