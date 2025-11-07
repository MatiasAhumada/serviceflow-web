# Auth Module - JWT & Role-Based Authentication

## Uso en Controllers

### 1. Proteger rutas con JWT

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard) // Protege todas las rutas del controller
export class UsersController {
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return user; // { userId, email, planType, companyId, roleId }
  }
}
```

### 2. Proteger rutas con Permisos

```typescript
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica ambos guards
export class ProductsController {
  @Get()
  @Permissions('view_products') // Requiere permiso específico
  findAll() {
    return 'Lista de productos';
  }

  @Post()
  @Permissions('manage_products') // Requiere permiso de gestión
  create() {
    return 'Crear producto';
  }
}
```

### 3. Múltiples permisos (OR logic)

```typescript
@Get('reports')
@Permissions('view_reports', 'manage_reports') // Cualquiera de los dos
getReports() {
  return 'Reportes';
}
```

## Endpoints de Auth

### Login
```
POST /auth/login
Body: { email: string, password: string }
Response: { access_token: string, user: {...} }
```

### Register
```
POST /auth/register
Body: { 
  email: string, 
  password: string, 
  name: string, 
  planType: 'vendor' | 'technician' | 'company',
  companyId?: string 
}
Response: { access_token: string, user: {...} }
```

## JWT Payload

El token incluye:
- `sub`: userId
- `email`: email del usuario
- `planType`: tipo de plan (vendor, technician, company)
- `companyId`: ID de la empresa (si aplica)
- `roleId`: ID del rol del usuario

## Variables de Entorno

```env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```