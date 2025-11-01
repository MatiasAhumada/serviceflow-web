import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Cambia esto en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('ServiceFlow API')
    .setDescription(
      `**ServiceFlow** es un sistema integral de gestión diseñado para negocios de **servicio técnico y ventas**.

Este sistema permite administrar tanto la parte de servicios técnicos (reparaciones, diagnósticos, presupuestos, órdenes de trabajo) como la parte comercial (ventas de accesorios, dispositivos, insumos, etc.).

Ofrece herramientas para:

- Gestionar clientes, productos y servicios técnicos.
- Crear y monitorear órdenes de reparación.
- Controlar inventario y movimientos de stock.
- Registrar ventas, facturación y recibos.
- Administrar caja diaria, ingresos y egresos.
- Emitir comprobantes, reportes y estadísticas.
- Unificar toda la operación del negocio desde un solo lugar.

Ideal para talleres técnicos, locales de reparación, o negocios que combinan venta y servicio.

  
  <b>Desarrollado por Matías Ahumada</b><br>
  <a href="https://www.linkedin.com/in/matias-ahumada-dev/" target="_blank">LinkedIn</a> |
  <a href="https://github.com/MatiasAhumada" target="_blank">GitHub</a><br>
  Teléfono: +54 9 381 352-8658
  `,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3010);
}

bootstrap();
