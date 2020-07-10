import { isNumber, upperCase } from '@/utils'

/**
 * @param {string} prop
 * @param {any} value
 */
Object.defineProperty(Array.prototype, 'findOne', {
  value: function (prop: string, value: any): any {
    return [].concat(this)
      .find((r: any) => r[prop] === value)
  }
})

/**
 * @param {string} prop
 * @param {any} value
 */
Object.defineProperty(Array.prototype, 'findAll', {
  value: function (prop: string, value: any): any {
    return [].concat(this)
      .filter((r: any) => r[prop] === value)
  }
})

/**
 * @param {string} prop
 * @param {any} value
 */
Object.defineProperty(Array.prototype, 'remove', {
  value: function (prop: string, value: any): any {
    return [].concat(this)
      .filter((r: any) => r[prop] !== value)
  }
})

/**
 * @param {string} prop
 */
Object.defineProperty(Array.prototype, 'groupBy', {
  value: function (prop: string): any {
    return [].concat(this)
      .reduce((g: any, i: any): any => {
        g[i[prop]] = g[i[prop]] || []
        g[i[prop]].push(i)
        return g
      }, {})
  }
})

/**
 * @param {string} prop
 * @param {string} type
 */
Object.defineProperty(Array.prototype, 'orderBy', {
  value: function (prop: string, type: string = 'asc'): any {
    return [].concat(this)
      .sort((a: any, b: any): any => {
        const propA: any = (isNumber(a[prop]) ? a[prop] : upperCase(a[prop]))
        const propB: any = (isNumber(b[prop]) ? b[prop] : upperCase(b[prop]))

        return (type === 'desc')
          ? (propB < propA) ? -1 : (propB > propA) ? 1 : (propB >= propA) ? 0 : NaN
          : (propA < propB) ? -1 : (propA > propB) ? 1 : (propA >= propB) ? 0 : NaN
      })
  }
})
