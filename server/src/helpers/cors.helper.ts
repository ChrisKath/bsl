const errorMsg: string = 'The CORS policy for this site does not allow access from the specified Origin.'
const allowedOrigins: Array<string> = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://web.bsl.local',
  'http://bsl.tap10.net',
  'http://de1.us'
]

export const corsOrigin: any = (origin: any, callback: Function): any => {
  // allow requests with no origin, (like mobile apps or curl requests)
  if (!origin) return callback(null, true)

  if (allowedOrigins.indexOf(origin) < 0) {
    return callback(new Error(errorMsg), false)
  }

  return callback(null, true)
}