import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Bear {
  id: number
  name: string
}

interface BearState {
  blackBears: number
  polarBears: number
  pandaBears: number
  bears: Bear[]
  totalBears: () => number
  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void
  doNothing: () => void
  addBear: () => void
  clearBears: () => void
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,
      bears: [{ id: 1, name: 'oso 1' }],
      totalBears: () => get().blackBears + get().polarBears + get().pandaBears,
      increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),
      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            { id: state.bears.length + 1, name: `oso ${state.bears.length + 1}` }
          ]
        })),
      clearBears: () => set({ bears: [] })
    }),
    { name: 'bears-store' }
  )
)
