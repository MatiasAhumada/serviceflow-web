import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

// Forzar timezone UTC para Node.js
process.env.TZ = 'UTC';

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

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación. Para acceder a rutas protegidas:

1. Hacer login en \`/auth/login\` con email y password
2. Copiar el \`access_token\` de la respuesta
3. Click en el botón **Authorize** (🔒) arriba
4. Ingresar: \`Bearer {access_token}\`
5. Click en **Authorize**

## 📋 Módulos Disponibles

### Core System
- **Authentication** - Login, registro y gestión de tokens JWT
- **Users** - Gestión de usuarios del sistema
- **Companies** - Administración de empresas
- **Roles & Permissions** - Control de acceso basado en roles
- **Plans & Subscriptions** - Planes de suscripción y pagos

### Business Logic
- **Customers & Suppliers** - Gestión de clientes y proveedores
- **Products & Inventory** - Catálogo de productos e inventario
- **Sales & Cash Register** - Ventas y caja registradora
- **Technical Services** - Órdenes de servicio, dispositivos y garantías

## 🎯 Características

- ✅ Multi-tenant (soporte para múltiples empresas)
- ✅ Role-Based Access Control (RBAC)
- ✅ Tres tipos de usuarios: Vendor, Technician, Company
- ✅ Sistema de suscripciones con asientos adicionales
- ✅ Gestión completa de ventas y servicios técnicos
- ✅ Control de inventario y stock
- ✅ Caja registradora con apertura/cierre
- ✅ Garantías y seguimiento de dispositivos

---

<b>Desarrollado por Matías Ahumada</b><br>
<a href="https://www.linkedin.com/in/matias-ahumada-dev/" target="_blank">LinkedIn</a> |
<a href="https://github.com/MatiasAhumada" target="_blank">GitHub</a><br>
Teléfono: +54 9 381 352-8658
  `,
    )
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
      'JWT-auth',
    )
    .addTag('Authentication', 'Endpoints de autenticación y registro')
    .addTag('Users', 'Gestión de usuarios del sistema')
    .addTag('Companies', 'Administración de empresas')
    .addTag('Roles & Permissions', 'Control de acceso y permisos')
    .addTag('Plans & Subscriptions', 'Planes, suscripciones y pagos')
    .addTag('Customers & Suppliers', 'Gestión de clientes y proveedores')
    .addTag('Products & Inventory', 'Catálogo de productos e inventario')
    .addTag('Sales & Cash Register', 'Ventas y caja registradora')
    .addTag(
      'Technical Services',
      'Órdenes de servicio, dispositivos y garantías',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3010);
}

bootstrap();
