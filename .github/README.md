## 📁 Estructura del Proyecto `metrics-ods-app`

La estructura del proyecto está organizada para separar claramente las capas del backend, los recursos de frontend, la base de datos, documentación y configuración de GitHub.

```
metrics-ods-app/
│
├── .github/ # Configuraciones de GitHub (templates, workflows, etc.)
│ └── README.md # Documentación principal del repositorio
|
├── backend/
│ └── src/ # Código fuente del backend
│   ├── application/ # Lógica de aplicación (casos de uso, servicios de orquestación)
│   ├── config/ # Archivos de configuración de entorno o del sistema
│   ├── domain/ # Entidades del dominio, lógica de negocio pura
│   ├── infrastructure/ # Implementaciones de acceso a datos, servicios externos
│   ├── interfaces/ # Interfaces expuestas (APIs, controladores, etc.)
│   └── tests/ # Pruebas unitarias y de integración
│
├── database/ # Scripts, modelos y documentación relacionada a la base de datos
│
├── docs/ # Documentación general del proyecto
│
├── frontend/ # Código del frontend (app móvil/web)
│
├── .gitignore # Archivos y carpetas ignoradas por Git
│
└── README.md # Información de la aplicación
```

Esta estructura sigue principios de arquitectura limpia, donde cada capa tiene responsabilidades bien definidas. Permite escalar el proyecto de forma organizada y mantener el código desacoplado.
