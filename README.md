# Zustand: Gestor de estado

## Bases del gestor

Zustand sigue la misma filosofía de redux al crear un estado inmutable. Con este gestor no es necesario implementarlo mediante un provider.

Instalación: `pnpm add zustand`

- **set**: agregar al state
- **get**: leer del state
- **useShallow**: analiza las propiedades de un objeto y confirma si realmente cambiaron, si cambiaron, se vuelve a renderizar de lo contrario no hace nada.
