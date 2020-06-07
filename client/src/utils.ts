import store from '@/store'

export function isObjectEmpty (input: any): boolean {
  if (Object.getOwnPropertyNames) {
    return (Object.getOwnPropertyNames(input).length === 0)
  } else {
    for (let key in input) {
      if (hasProp(input, key)) {
        return false
      }
    }
    return true
  }
}

export function isObject (input: any): boolean {
  // IE8 will treat undefined and null as object if it wasn't for
  // input != null
  return input != null && Object.prototype.toString.call(input) === '[object Object]'
}

export function isArray (input: any): boolean {
  return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]'
}

export function isFunction (input: any): boolean {
  return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]'
}

export function isNumber (input: any): boolean {
  return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]'
}

export function isDate (input: any): boolean {
  return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]'
}

export function isUndefined (input: any): boolean {
  return input === void 0
}

export function hasProp (object: any, prop: string): boolean {
  return object.hasOwnProperty(prop) || Object.prototype.hasOwnProperty.call(object, prop)
}

export function hasArray (input: any): number {
  return isArray(input) ? input.length : 0
}

/**
 * Key generator.
 */
export function keyCode (): string {
  return (`${1e4}-${1e4}-${4e4}-${1e6}`).replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

/**
 * Truncate limitor text.
 * 
 * @param {string} input
 * @param {number} limit
 */
export function truncate (input: string, limit: number): string {
  if (input.length <= limit) return input

  const bake: string  = '...'
  let x: string = input.substr(0, limit)
  let n: number = input.lastIndexOf(' ')

  if (n > -1) x = input.substr(0, n)

  return String(`${x}${bake}`)
}

/**
 * Convert to Price.
 * 
 * @param {number|string} input
 * @param {number} fix delimiters
 */
export function price (input: number | string, fix: number): string {
  const n: string = Number(input).toFixed(fix || 0).toString()
  return n.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * Pad Digits
 * 
 * @param {number} number
 * @param {number} digits
 */
export function pad (number: number, digits: number): number {
  const arr: any = Array(Math.max(digits - String(number).length + 1, 0))
  return arr.join(0) + number
}

/**
 * clone.
 * 
 * @param {object|array} input
 */
export function clone (input: any): any {
  return JSON.parse( JSON.stringify( input ) )
}

/**
 * Convert to Upper Case.
 * 
 * @param {string} input
 */
export function upperCase (input: string): string {
  return String(input).toLocaleUpperCase()
}

/**
 * Convert to Lower Case.
 * 
 * @param {string} input
 */
export function lowerCase (input: string | number): string {
  return String(input).toLocaleLowerCase()
}

/**
 * Convert to Capitalize.
 * 
 * @param {string} input
 */
export function capitalize (input: string): string {
  const array: any = String(input).split(/[ ]+/)
  return array.map((word: string): string => {
    return `${upperCase(word.charAt(0))}${word.slice(1)}`
  }).join(' ')
}

/**
 * Convert elm Hightlight.
 * 
 * @param {string} input
 * @param {string} search
 */
export function hls (input: string, search: string): string {
  const regExp: any = new RegExp(search, 'gi')
  const hls: string = String(input).replace(regExp,
    (match: string): string => `<span class=ui--hls>${match}</span>`)

    return search ? hls : input
}

/**
 * Events loading component.
 * 
 * @param {boolean} input
 */
export function load (input: boolean = true): void {
  store.commit('APP.CORE/SET_STATE', {
    field: 'load',
    data: input
  })
}

/**
 * Events alert component.
 * 
 * @param {string} message
 * @param {object} config
 */
export function alert (message: string, config: object | any = {}): any {
  if (message === 'close') {
    message = ''
    config.type = 'dialog'
    config.showBtnCancel = false
  }

  return new Promise((resolve: any): any => {
    store.commit('APP.CORE/SET_ALERT', {
      status: Boolean(message),
      title: config.showTitle
        ? (config.title ? config.title : '📣 System Alert')
        : false,
      message,
      config: {
        ...config,
        resolve
      }
    })
  })
}

/**
 * Striptag HTML.
 * 
 * @param {string} input
 */
export function stripTag (input: string): string {
  const tag: any = new RegExp(/<[^>]+>/, 'g')
  return input.replace(tag, '')
}

/**
 * Entities HTML symbol code.
 * 
 * @param {string} input
 */
export function entities (input: any): any {
  const str: string = String(input)

  const encode: any = () => {
    let buf = []
    
    for (let i = str.length-1; i >= 0; i--) {
      buf.unshift(['&#', (str[i] as any).charCodeAt(), ';'].join(''))
    }
    
    return buf.join('')
  }

  const decode: any = () => {
    return str.replace(/&#(\d+);/g, (match: any, dec: any): string => {
      return String.fromCharCode(dec)
    })
  }

  return {
    encode, decode
  }
}