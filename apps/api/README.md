# ServiceFlow API

Backend API for ServiceFlow - Sistema integral de gestión para negocios de servicio técnico y ventas.

## Arquitectura de Base de Datos

### Tipos de Usuario
- **VENDOR**: Vendedores individuales
- **TECHNICIAN**: Técnicos individuales  
- **COMPANY**: Empresas (pueden tener múltiples usuarios)

### Entidades Principales

#### Core System
- `SystemAdmin`: Administradores del sistema
- `Plan`: Planes de suscripción
- `Company`: Empresas
- `User`: Usuarios del sistema
- `Role`: Roles por empresa
- `Permission`: Permisos del sistema
- `Subscription`: Suscripciones
- `SubscriptionSeat`: Asientos adicionales
- `Payment`: Pagos

#### Business Logic
- `Customer`: Clientes
- `Supplier`: Proveedores
- `Product`: Productos
- `CashRegister`: Cajas registradoras
- `Sale`: Ventas
- `SaleItem`: Items de venta
- `ServiceOrder`: Órdenes de servicio
- `ServiceItem`: Items de servicio
- `Device`: Dispositivos de clientes
- `Warranty`: Garantías

## Setup

1. Copiar `.env.example` a `.env` y configurar variables
2. Instalar dependencias: `pnpm install`
3. Ejecutar migraciones: `pnpm migration:run`
4. Sembrar datos iniciales: `pnpm seed`
5. Iniciar desarrollo: `pnpm start:dev`

## Scripts Disponibles

- `pnpm start:dev` - Desarrollo con hot reload
- `pnpm build` - Compilar para producción
- `pnpm migration:generate` - Generar nueva migración
- `pnpm migration:run` - Ejecutar migraciones
- `pnpm seed` - Sembrar datos iniciales
- `pnpm lint` - Linter
- `pnpm test` - Tests

## API Documentation

Una vez iniciado el servidor, la documentación Swagger estará disponible en:
`http://localhost:3010/api`