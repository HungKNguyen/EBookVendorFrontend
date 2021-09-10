import axios from 'axios'
import { history } from './App'
import { toast } from 'react-toastify'

const instance = axios.create({ withCredentials: true })
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (!error.response) {
    toast.error('Network error')
  } else {
    const { status, data } = error.response
    if (status === 400 || status === 404) {
      history.push('/notfound')
    }
    if (status === 401) {
      history.push('/login')
      localStorage.removeItem('user')
    }
    if (status === 403) {
      history.push('/forbidden')
    }
    if (status === 500) {
      toast.error(data.message)
    }
  }
  return Promise.reject(error)
})

export { instance }
