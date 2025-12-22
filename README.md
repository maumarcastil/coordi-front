# Coordi Frontend

Aplicación web para gestión de envíos con cotizaciones, órdenes y tracking en tiempo real.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** Material UI 7
- **Estado Global:** Redux Toolkit
- **Data Fetching:** TanStack Query (React Query)
- **Formularios:** React Hook Form + Zod
- **Autenticación:** NextAuth.js 5
- **Testing:** Jest + React Testing Library
- **Lenguaje:** TypeScript

## Requisitos

- Node.js 18+
- pnpm 10+

## Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno (ya viene con valores para desarrollo)
cp .env.example .env.local

# Iniciar en desarrollo
pnpm dev
```

La aplicación estará en `http://localhost:3000`

> **Nota:** El archivo `.env.example` ya incluye valores configurados para desarrollo local. Solo necesitas copiarlo a `.env.local` y funcionará inmediatamente.

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del backend API | `http://localhost:3001` |
| `NEXT_PUBLIC_WS_URL` | URL del WebSocket | `ws://localhost:3001` |
| `AUTH_SECRET` | Secreto para NextAuth | Incluido para dev |

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Desarrollo con hot-reload |
| `pnpm build` | Compilar para producción |
| `pnpm start` | Ejecutar en producción |
| `pnpm lint` | Verificar código con Biome |
| `pnpm test` | Ejecutar tests |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm test:coverage` | Tests con cobertura |

## Arquitectura

El proyecto sigue una arquitectura basada en **Features**:

```
src/
├── app/                 # App Router (páginas y layouts)
├── features/            # Módulos por dominio
│   ├── auth/           # Autenticación
│   │   ├── components/ # Componentes específicos
│   │   ├── schemas/    # Validaciones Zod
│   │   └── hooks/      # Hooks específicos
│   ├── quotes/         # Cotizaciones
│   └── orders/         # Órdenes
└── shared/              # Código compartido
    ├── services/       # Llamadas API
    ├── hooks/          # Hooks globales
    ├── store/          # Redux store
    ├── providers/      # Context providers
    └── types/          # Tipos TypeScript
```

## Testing

El proyecto incluye tests unitarios y de integración:

| Tipo | Tecnología | Cobertura |
|------|------------|-----------|
| Schemas (Zod) | Jest | Validaciones de formularios |
| Redux Reducers | Jest | Estado global |
| Componentes | React Testing Library | UI e interacciones |
| Custom Hooks | renderHook | Lógica de hooks |

```bash
# Ejecutar tests
pnpm test

# Ver cobertura
pnpm test:coverage
```

## Funcionalidades

- **Autenticación:** Login/Registro con NextAuth.js
- **Cotizaciones:** Crear y consultar cotizaciones de envío
- **Órdenes:** Gestionar órdenes de envío
- **Tiempo Real:** Actualizaciones via WebSocket
- **Responsive:** Diseño adaptable con Material UI

## Licencia

ISC
