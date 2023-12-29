import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../stores'

export const LoginPage = () => {
  const navigate = useNavigate()
  const loginUser = useAuthStore((state) => state.loginUser)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { email, password } = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
    }

    try {
      await loginUser(email.value, password.value)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input type="email" name="email" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Contraseña</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <button type="submit" className="bg-indigo-600 mt-4">
          Iniciar sesión
        </button>
      </form>
    </>
  )
}
