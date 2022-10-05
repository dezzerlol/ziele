import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  // create swagger doc on localhost:5000/api/docs
  const config = new DocumentBuilder()
    .setTitle('Ziele api')
    .setDescription('Documentation for the Ziele api')
    .setVersion('1.0.0')
    .addTag('ziele')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
