// form validator
export default {
  fill: {
    required: true,
    message: 'Please fill is required'
  },
  default: {
    type: 'string',
    pattern: /^[a-z*A-Z*0-9*]+$/,
    message: 'Please fill is (English or Number) only'
  },
  email: {
    type: 'email',
    message: 'Please verify your Email Address'
  },
  url: {
    type: 'url',
    message: 'Please enter a valid URL'
  }
}
