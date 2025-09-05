-- Tabla de usuarios
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('ciudadano', 'moderador', 'entidad_externa'))
);

-- Tabla de localidades
CREATE TABLE localidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de sectores
CREATE TABLE sector (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de tipos de reporte
CREATE TABLE tipo_reporte (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de entidades externas
CREATE TABLE entidad_externa (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(150)
);

-- Tabla de reportes
CREATE TABLE reporte (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('pendiente', 'clasificado', 'escalado')),
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
    tipo_reporte_id INT REFERENCES tipo_reporte(id),
    sector_id INT REFERENCES sector(id),
    localidad_id INT REFERENCES localidad(id)
);

-- Relación muchos a muchos: reporte escalado a entidades externas
CREATE TABLE reporte_entidad (
    id SERIAL PRIMARY KEY,
    reporte_id INT REFERENCES reporte(id) ON DELETE CASCADE,
    entidad_id INT REFERENCES entidad_externa(id),
    fecha_envio TIMESTAMP DEFAULT NOW()
);
