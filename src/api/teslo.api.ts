import axios from 'axios'

import { useAuthStore } from '../stores'

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// todas las request que se hagan con axios se tomará el token que está en el store de zustand
tesloApi.interceptors.request.use((config) => {
  // getState nos permite leer el store fuera del context de react
  const { token } = useAuthStore.getState()
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

export default tesloApi
