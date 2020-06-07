import axios from 'axios'
import config from '@/modules/config'
import { storage } from '@/modules/storage'
import { getCookie } from 'tiny-cookie'

/**
 * Create new Initial.
 */
const Initial: any = axios.create({
  baseURL: config.APP_API
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Initial.interceptors.request.use((config: any) => {
  const token: any = getCookie(config.X_CSRF_TOKEN)

  if (token) {
    config.headers[config.AUTH_TOKEN] = `Bearer ${token}`
  }
  
  return config
})

/**
 * allows changes to the response data to be made before
 * it is passed to then/catch
 */
// Initial.interceptors.response.use(
//   (response: any) => response,
//   (errors: any) => errors
// )

export default Initial