const errorMsg: string = 'The CORS policy for this site does not allow access from the specified Origin.'
const allowedOrigins: Array<string> = [
  'http://localhost:3001/',
  'http://web.bsl.local/',
  'http://bsl.tap10.net/',
  'http://www.de1.us/',
  'http://de1.us/'
]

module.exports = (origin: string, callback: any): any => {
  // allow requests with no origin, (like mobile apps or curl requests)
  if (!origin) return callback(null, true)

  if (allowedOrigins.indexOf(origin) < 0) {
    return callback(new Error(errorMsg), false)
  }

  return callback(null, true)
}