import { StateStorage, createJSONStorage } from 'zustand/middleware'

const firebaseUrl = 'https://zustand-demo-a02cd-default-rtdb.firebaseio.com/zustand'

const firebaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const resp = await fetch(`${firebaseUrl}/${name}.json`)
      return await resp.json()
    } catch (error) {
      console.log(error)
      return null
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: 'PUT',
        body: JSON.stringify(value)
      })
    } catch (error) {
      console.log(error)
    }
  },
  removeItem: function (): void {}
}

export const customFirebaseStorage = createJSONStorage(() => firebaseApi)
