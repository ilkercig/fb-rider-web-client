import axios from 'axios'

const setupAxiosInterceptors = (redirectToLogin: () => void): number => {
  return axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        redirectToLogin()
      }
      return Promise.reject(error)
    }
  )
}

export default setupAxiosInterceptors
