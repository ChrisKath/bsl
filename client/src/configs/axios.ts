import axios from 'axios'
import config from '@/configs/app'
import { getCookie } from 'tiny-cookie'

/**
 * Create new Axios.
 */
const Axios: any = axios.create({
  baseURL: config.API_BASE_URL
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Axios.interceptors.request.use((buffer: any): any => {
  const token: any = getCookie(config.APP_AUTH)

  if (token) {
    buffer.headers[config.AUTH_TOKEN] = `Bearer ${token}`
  }
  
  return buffer
})

/**
 * allows changes to the response data to be made before
 * it is passed to then/catch
 */
Axios.interceptors.response.use(
  (response: any) => response,
  (errors: any) => errors.response || errors
)

export default Axios