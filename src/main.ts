import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(

    new ValidationPipe({
      whitelist: true,
      //Con whitelist hacemos que solo se reciban los datos que necesitamos, pero no marca errores 
      forbidNonWhitelisted: true,
      //forbidNonWhitelisted nos marca errores al enviar datos que no son requeridos por la ruta
      transform: true,
      //Transform nos ayuda a transformar la data a la que esta en los DTOs
      transformOptions: {
        enableImplicitConversion:true,
      } 
    })
  )

  app.setGlobalPrefix("/api/v1")
  //Aqui agregamos el prefijo que llevara toda la api
  await app.listen(3000);
}
bootstrap();
