declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'axios'
declare module 'moment'
declare module 'vee-validate'
declare module 'vee-validate/dist/vee-validate.full'

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module "*.svg" {
  const content: any;
  export default content
}