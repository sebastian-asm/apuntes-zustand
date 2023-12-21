# Zustand: Gestor de estado

## Bases del gestor

Zustand sigue la misma filosofía de redux al crear un estado inmutable. Con este gestor no es necesario implementarlo mediante un provider.

Instalación: `pnpm add zustand`

- **set**: agregar al state
- **get**: leer del state
- **useShallow**: analiza las propiedades de un objeto y confirma si realmente cambiaron, si cambiaron, se vuelve a renderizar de lo contrario no hace nada
- **middlewares**: permite agregar funcionalidades extras
  - persist: permite hacer persistente los datos en localstorage, sessionstorage o en alguna db
  - devtools: permite usar la extension de redux para tener un panorama global del estado
