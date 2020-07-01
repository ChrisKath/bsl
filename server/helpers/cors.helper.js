const errorMsg = 'The CORS policy for this site does not allow access from the specified Origin.'
const allowedOrigins = [
  'http://localhost:8080/',
  'http://localhost:3000/',
  'http://web.bsl.local/',
  'http://bsl.tap10.net/',
  'http://de1.us/'
]

module.exports = (origin, callback) => {
  
  // allow requests with no origin, (like mobile apps or curl requests)
  if (!origin) return callback(null, true)

  if (allowedOrigins.indexOf(origin) < 0) {
    return callback(new Error(errorMsg), false)
  }

  return callback(null, true)
}