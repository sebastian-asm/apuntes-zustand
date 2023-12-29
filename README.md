# Zustand: Gestor de estado

## Bases del gestor

[Documentación](https://docs.pmnd.rs/zustand/getting-started/introduction)

Zustand sigue la misma filosofía de redux al crear un estado inmutable. Con este gestor no es necesario implementarlo mediante un provider. Se podría decir que su "dificultad" es la implementación del tipado con TypeScript.

Instalación: `pnpm add zustand`

- **set**: agregar al state

- **get**: leer del state

- **stores**: estos se deben exportar como un hook de React, o sea, anteponiendo el _use_ y luego el nombre, por ejemplo, _useAuthStore_.

- **useShallow**: analiza las propiedades de un objeto y confirma si realmente cambiaron, si cambiaron, se vuelve a renderizar de lo contrario no hace nada

- **middlewares**: permite agregar funcionalidades extras, algunos son:

  - persist: permite hacer persistente los datos en localstorage, sessionstorage o en alguna db
  - devtools: permite usar la extension de redux para tener un panorama global del estado
  - immer: permite mutar el estado de manera más sencilla (es necesaria su instalación: `pnpm add immer`)

- **patrón "slices"**: es cortar un gran store en pequeñas partes faciles de mantener

- **subscribe**: permitirá emitir cualquier cambio de un store a otro (nextState y preState)

Para la simulación del login se utilizó la imágen de Docker: [https://hub.docker.com/r/klerith/teslo-shop-cors](https://hub.docker.com/r/klerith/teslo-shop-cors)
