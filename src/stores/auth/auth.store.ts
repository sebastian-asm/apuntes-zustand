import { StateCreator, create } from 'zustand'

// type indica que solo las tome como interfaces y no como object
import type { AuthStatus, User } from '../../interfaces'
import { AuthService } from '../../services/auth.service'
import { devtools, persist } from 'zustand/middleware'

export interface AuthState {
  status: AuthStatus
  token?: string
  user?: User
  loginUser: (email: string, password: string) => Promise<void>
  checkAuthStatus: () => Promise<void>
  logoutUser: () => void
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password)
      set({ status: 'authorized', token, user })
    } catch {
      set({ status: 'unauthorized', token: undefined, user: undefined })
      throw new Error('Unable to login')
    }
  },
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus()
      set({ status: 'authorized', token, user })
    } catch {
      set({ status: 'unauthorized', token: undefined, user: undefined })
      throw new Error('Unauthorized')
    }
  },
  logoutUser: () => set({ status: 'pending', token: undefined, user: undefined })
})

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
)
