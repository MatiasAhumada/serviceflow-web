# 📚 Documentación Swagger - ServiceFlow API

## 🌐 Acceso a la Documentación

Una vez iniciado el servidor, accede a:
```
http://localhost:3010/api
```

## 🔐 Autenticación en Swagger

### Paso 1: Login
1. Expandir el endpoint `POST /auth/login`
2. Click en "Try it out"
3. Ingresar credenciales:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
4. Click en "Execute"
5. Copiar el `access_token` de la respuesta

### Paso 2: Autorizar
1. Click en el botón **Authorize** 🔒 (arriba a la derecha)
2. En el campo "Value" ingresar: `Bearer {tu_access_token}`
3. Click en "Authorize"
4. Click en "Close"

¡Ahora puedes probar todos los endpoints protegidos!

## 📋 Estructura de la Documentación

### 🔑 Authentication
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar nuevo usuario

### 👥 Users
- `GET /users` - Listar todos los usuarios
- `GET /users/{id}` - Obtener usuario por ID
- `POST /users` - Crear usuario
- `PATCH /users/{id}` - Actualizar usuario
- `DELETE /users/{id}` - Eliminar usuario

### 🏢 Companies
- `GET /companies` - Listar empresas
- `GET /companies/{id}` - Obtener empresa por ID
- `POST /companies` - Crear empresa
- `PATCH /companies/{id}` - Actualizar empresa
- `DELETE /companies/{id}` - Eliminar empresa

### 🎭 Roles & Permissions
**Roles:**
- `GET /roles` - Listar roles (filtrable por companyId)
- `GET /roles/{id}` - Obtener rol por ID
- `POST /roles` - Crear rol
- `PATCH /roles/{id}` - Actualizar rol
- `DELETE /roles/{id}` - Eliminar rol

**Permissions:**
- `GET /permissions` - Listar permisos
- `GET /permissions/{id}` - Obtener permiso por ID
- `POST /permissions` - Crear permiso
- `PATCH /permissions/{id}` - Actualizar permiso
- `DELETE /permissions/{id}` - Eliminar permiso

### 💳 Plans & Subscriptions
**Plans:**
- `GET /plans` - Listar planes disponibles
- `GET /plans/{id}` - Obtener plan por ID
- `POST /plans` - Crear plan
- `PATCH /plans/{id}` - Actualizar plan
- `DELETE /plans/{id}` - Eliminar plan

**Subscriptions:**
- `GET /subscriptions` - Listar suscripciones
- `GET /subscriptions/{id}` - Obtener suscripción por ID
- `POST /subscriptions` - Crear suscripción
- `PATCH /subscriptions/{id}` - Actualizar suscripción
- `DELETE /subscriptions/{id}` - Eliminar suscripción

**Payments:**
- `GET /payments` - Listar pagos
- `GET /payments/{id}` - Obtener pago por ID
- `POST /payments` - Registrar pago
- `PATCH /payments/{id}` - Actualizar pago
- `DELETE /payments/{id}` - Eliminar pago

### 👤 Customers & Suppliers
**Customers:**
- `GET /customers` - Listar clientes (filtrable por companyId)
- `GET /customers/{id}` - Obtener cliente por ID
- `POST /customers` - Crear cliente
- `PATCH /customers/{id}` - Actualizar cliente
- `DELETE /customers/{id}` - Eliminar cliente

**Suppliers:**
- `GET /suppliers` - Listar proveedores
- `GET /suppliers/{id}` - Obtener proveedor por ID
- `POST /suppliers` - Crear proveedor
- `PATCH /suppliers/{id}` - Actualizar proveedor
- `DELETE /suppliers/{id}` - Eliminar proveedor

### 📦 Products & Inventory
- `GET /products` - Listar productos (filtrable por companyId)
- `GET /products/{id}` - Obtener producto por ID
- `POST /products` - Crear producto (requiere permiso `manage_products`)
- `PATCH /products/{id}` - Actualizar producto (requiere permiso `manage_products`)
- `DELETE /products/{id}` - Eliminar producto (requiere permiso `manage_products`)

### 💰 Sales & Cash Register
**Cash Registers:**
- `GET /cash-registers` - Listar cajas registradoras
- `GET /cash-registers/{id}` - Obtener caja por ID
- `POST /cash-registers` - Crear caja
- `PATCH /cash-registers/{id}` - Actualizar caja
- `DELETE /cash-registers/{id}` - Eliminar caja

**Sales:**
- `GET /sales` - Listar ventas (filtrable por companyId)
- `GET /sales/{id}` - Obtener venta por ID
- `POST /sales` - Crear venta
- `PATCH /sales/{id}` - Actualizar venta
- `DELETE /sales/{id}` - Eliminar venta

### 🔧 Technical Services
**Service Orders:**
- `GET /service-orders` - Listar órdenes de servicio (filtrable por companyId)
- `GET /service-orders/{id}` - Obtener orden por ID
- `POST /service-orders` - Crear orden de servicio
- `PATCH /service-orders/{id}` - Actualizar orden
- `DELETE /service-orders/{id}` - Eliminar orden

**Devices:**
- `GET /devices` - Listar dispositivos
- `GET /devices/{id}` - Obtener dispositivo por ID
- `POST /devices` - Registrar dispositivo
- `PATCH /devices/{id}` - Actualizar dispositivo
- `DELETE /devices/{id}` - Eliminar dispositivo

**Warranties:**
- `GET /warranties` - Listar garantías
- `GET /warranties/{id}` - Obtener garantía por ID
- `POST /warranties` - Crear garantía
- `PATCH /warranties/{id}` - Actualizar garantía
- `DELETE /warranties/{id}` - Eliminar garantía

## 🎯 Ejemplos de Uso

### Crear un Usuario
```json
POST /users
{
  "email": "nuevo@example.com",
  "name": "Nuevo Usuario",
  "passwordHash": "$2b$10$...",
  "planType": "vendor",
  "status": "active"
}
```

### Crear un Producto (requiere autenticación)
```json
POST /products
Headers: Authorization: Bearer {token}
{
  "name": "Laptop HP",
  "sku": "LAP-HP-001",
  "category": "Computadoras",
  "price": 45000,
  "cost": 35000,
  "stockQuantity": 10,
  "companyId": "uuid-empresa"
}
```

### Crear una Venta
```json
POST /sales
{
  "customerId": "uuid-cliente",
  "sellerId": "uuid-vendedor",
  "saleNumber": "V-2024-001",
  "date": "2024-01-15T10:30:00Z",
  "total": 45000,
  "paymentMethod": "card",
  "status": "completed",
  "items": [
    {
      "productId": "uuid-producto",
      "quantity": 1,
      "unitPrice": 45000,
      "subtotal": 45000
    }
  ]
}
```

## 🔒 Permisos Requeridos

Algunos endpoints requieren permisos específicos:

- **Products**: `view_products`, `manage_products`
- **Sales**: `view_sales`, `manage_sales`
- **Services**: `view_services`, `manage_services`
- **Cash Register**: `view_cash_register`, `manage_cash_register`
- **Inventory**: `view_inventory`, `manage_inventory`
- **Reports**: `view_reports`
- **Company**: `manage_company`
- **Roles**: `manage_roles`

## 📝 Notas Importantes

1. **Multi-tenancy**: Muchos endpoints aceptan `companyId` como query parameter para filtrar por empresa
2. **Relaciones**: Los endpoints GET incluyen relaciones relevantes automáticamente
3. **Validación**: Todos los endpoints validan los datos de entrada
4. **Errores**: La API retorna códigos HTTP estándar (200, 201, 400, 401, 404, etc.)
5. **JWT**: Los tokens expiran según la configuración (default: 7 días)

## 🚀 Testing Rápido

1. Registrar usuario: `POST /auth/register`
2. Hacer login: `POST /auth/login`
3. Autorizar en Swagger con el token
4. Probar cualquier endpoint protegido

## 📞 Soporte

Para más información, consultar:
- README.md del proyecto
- AUTH_SETUP.md para detalles de autenticación
- Código fuente en los controllers