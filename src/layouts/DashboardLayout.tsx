import { Navigate, Outlet } from 'react-router-dom'

import { SideMenu } from '../components'
import { useAuthStore } from '../stores'

export const DashboardLayout = () => {
  const status = useAuthStore((state) => state.status)
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus)

  if (status === 'pending') {
    checkAuthStatus()
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    )
  }

  if (status === 'unauthorized') return <Navigate to="/auth/login" />

  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
