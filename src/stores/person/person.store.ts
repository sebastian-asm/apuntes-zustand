import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { customFirebaseStorage } from '../storages/firebase.storage'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

// [['zustand/devtools', never]] nos ayuda con el tipado para indicar el nombre de la acción
const storeApi: StateCreator<PersonState & Actions, [['zustand/devtools', never]]> = (set) => ({
  firstName: '',
  lastName: '',
  // el setFirstName se indica el nombre de la acción la cual se mostrar en la devtool de redux
  setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) => set({ lastName: value }, false, 'setLastName')
})

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      storeApi,
      // nombre y personalizacion del storage (en este caso usando el sessionStorage)
      // { name: 'person-storage', storage: customSessionStorage }
      // guardando en firebase
      { name: 'person-storage', storage: customFirebaseStorage }
    )
  )
)
