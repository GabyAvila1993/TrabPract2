
# Sistema de Ventas - Aplicación Web

Este proyecto es un sistema de ventas desarrollado con una arquitectura cliente-servidor. El backend está construido con Node.js, Express y Prisma para la conexión con una base de datos MySQL. El frontend está desarrollado con React, usando React Router para la navegación entre módulos.

---

## Tecnologías usadas

- **Backend**: Node.js, Express, Prisma, MySQL
- **Frontend**: React, React Router DOM
- **Estilos**: CSS puro
- **Base de datos**: MySQL

---

## Estructura del proyecto

### Backend

- Express sirve como servidor REST API.
- Prisma es el ORM para conectarse a MySQL.
- Modelos principales:
  - `Cliente` (con `Telefono` relacionado)
  - `Proveedor`
  - `Producto`
  - `Categoria`
  - `Venta` y `VentaProducto` (para ventas y productos vendidos)

### Frontend

- React con componentes para cada módulo:
  - Clientes
  - Proveedores
  - Productos
  - Categorías
  - Ventas
- Navegación entre módulos con React Router.
- Formularios para creación y listado con botones para eliminar.
- Estilos aplicados para diseño centrado y limpio.

---

## Modelos Prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Proveedor {
  id         Int        @id @default(autoincrement())
  dni        String     @unique
  nombre     String
  direccion  String
  telefono   String
  web        String
  productos  Producto[]
}

model Cliente {
  id        Int      @id @default(autoincrement())
  dni       String   @unique
  nombre    String
  calle     String
  numero    String
  localidad String
  telefonos Telefono[]
  ventas    Venta[]
}

model Telefono {
  id        Int     @id @default(autoincrement())
  numero    String
  clienteId Int
  cliente   Cliente @relation(fields: [clienteId], references: [id], onDelete: Cascade)
}

model Producto {
  id           Int       @id @default(autoincrement())
  nombre       String
  precio       Float
  stock        Int
  categoriaId  Int
  proveedorId  Int
  categoria    Categoria @relation(fields: [categoriaId], references: [id])
  proveedor    Proveedor @relation(fields: [proveedorId], references: [id])
  ventas       VentaProducto[]
}

model Categoria {
  id          Int        @id @default(autoincrement())
  nombre      String
  descripcion String
  productos   Producto[]
}

model Venta {
  id         Int      @id @default(autoincrement())
  fecha      DateTime
  clienteId  Int
  descuento  Float
  montoFinal Float
  cliente    Cliente  @relation(fields: [clienteId], references: [id], onDelete: Cascade)
  productos  VentaProducto[]
}

model VentaProducto {
  id          Int      @id @default(autoincrement())
  productoId  Int
  ventaId     Int
  precioVenta Float
  cantidad    Int
  subtotal    Float
  producto    Producto @relation(fields: [productoId], references: [id], onDelete: Cascade)
  venta       Venta    @relation(fields: [ventaId], references: [id], onDelete: Cascade)
}
```

---

## Endpoints principales del Backend

- `GET /clientes` - Lista clientes con teléfonos.
- `POST /clientes` - Crear cliente con teléfonos.
- `DELETE /clientes/:id` - Eliminar cliente y datos relacionados.

- `GET /proveedores` - Lista proveedores.
- `POST /proveedores` - Crear proveedor.
- `DELETE /proveedores/:id` - Eliminar proveedor.

- `GET /productos` - Lista productos con relaciones.
- `POST /productos` - Crear producto.
- `DELETE /productos/:id` - Eliminar producto.

- `GET /categorias` - Lista categorías.
- `POST /categorias` - Crear categoría.
- `DELETE /categorias/:id` - Eliminar categoría.

- `GET /ventas` - Lista ventas con productos y cliente.
- `POST /ventas` - Crear venta con productos.
- `DELETE /ventas/:id` - Eliminar venta y sus productos.

---

## Cómo ejecutar el proyecto

### Backend

1. Clonar el repositorio.
2. Crear archivo `.env` con la variable `DATABASE_URL` apuntando a tu base de datos MySQL.
3. Ejecutar migraciones con Prisma: `npx prisma migrate dev`
4. Iniciar servidor: `node server.js` (o con nodemon)

### Frontend

1. Ingresar a la carpeta frontend.
2. Instalar dependencias: `npm install`
3. Ejecutar app React: `npm start`

---
