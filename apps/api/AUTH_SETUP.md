# 🔐 Sistema de Autenticación JWT con Roles

## ✅ Implementado

### Módulo de Autenticación
- **JWT Authentication** con Passport
- **Role-Based Access Control (RBAC)** con permisos
- **Guards** para proteger rutas
- **Decorators** para facilitar el uso

## 📦 Estructura

```
src/modules/auth/
├── auth.module.ts
├── auth.service.ts
├── auth.controller.ts
├── strategies/
│   └── jwt.strategy.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
└── decorators/
    ├── permissions.decorator.ts
    └── current-user.decorator.ts
```

## 🔑 Endpoints

### POST /auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "planType": "company",
    "companyId": "uuid",
    "roleId": "uuid"
  }
}
```

### POST /auth/register
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "planType": "vendor",
  "companyId": "uuid-optional"
}
```

## 🛡️ Uso en Controllers

### 1. Proteger con JWT (solo autenticación)
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
```

### 2. Proteger con Permisos (autenticación + autorización)
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  @Get()
  @Permissions('view_products')
  findAll() {
    return 'Lista de productos';
  }

  @Post()
  @Permissions('manage_products')
  create(@Body() data: any) {
    return 'Crear producto';
  }
}
```

### 3. Obtener usuario actual
```typescript
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Get('my-data')
@UseGuards(JwtAuthGuard)
getData(@CurrentUser() user: any) {
  // user contiene: { userId, email, planType, companyId, roleId }
  return `Data for ${user.email}`;
}
```

## 🎯 JWT Payload

El token incluye:
```typescript
{
  sub: string;        // userId
  email: string;      // email del usuario
  planType: string;   // 'vendor' | 'technician' | 'company'
  companyId: string;  // ID de la empresa (nullable)
  roleId: string;     // ID del rol (nullable)
}
```

## 🔐 Permisos Disponibles

Los permisos se definen en la tabla `permissions` y se asignan a roles:

- `manage_users` - Gestionar usuarios
- `view_users` - Ver usuarios
- `manage_customers` - Gestionar clientes
- `view_customers` - Ver clientes
- `manage_products` - Gestionar productos
- `view_products` - Ver productos
- `manage_sales` - Gestionar ventas
- `view_sales` - Ver ventas
- `manage_services` - Gestionar servicios técnicos
- `view_services` - Ver servicios técnicos
- `manage_cash_register` - Gestionar caja registradora
- `view_cash_register` - Ver caja registradora
- `manage_inventory` - Gestionar inventario
- `view_inventory` - Ver inventario
- `view_reports` - Ver reportes
- `manage_company` - Gestionar empresa
- `manage_roles` - Gestionar roles y permisos

## 🔧 Variables de Entorno

```env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

## 📝 Ejemplo Completo

```typescript
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('sales')
@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SalesController {
  @Get()
  @Permissions('view_sales')
  findAll(@CurrentUser() user: any) {
    // Solo usuarios con permiso 'view_sales' pueden acceder
    return `Sales for company ${user.companyId}`;
  }

  @Post()
  @Permissions('manage_sales')
  create(@Body() data: any, @CurrentUser() user: any) {
    // Solo usuarios con permiso 'manage_sales' pueden crear
    return `Creating sale for user ${user.userId}`;
  }
}
```

## 🧪 Testing con Swagger

1. Ir a `http://localhost:3010/api`
2. Hacer login en `/auth/login`
3. Copiar el `access_token`
4. Click en "Authorize" (candado verde)
5. Pegar el token: `Bearer <access_token>`
6. Ahora puedes probar rutas protegidas

## 🚀 Próximos Pasos

Para proteger otros controllers, simplemente:
1. Importar los guards y decorators
2. Agregar `@UseGuards(JwtAuthGuard, RolesGuard)`
3. Agregar `@Permissions('permission_code')` a cada ruta
4. Agregar `@ApiBearerAuth()` para Swagger