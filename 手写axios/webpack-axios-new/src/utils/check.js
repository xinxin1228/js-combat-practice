const checkType = type => {
  return value => {
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
}

const isString = val => typeof val === 'string'

const isArray = val => Array.isArray(val)

const isFunction = val => typeof val === 'function'

const isNumber = val => typeof val === 'number'

const isObject = checkType('Object')

export { isArray, isString, isFunction, isObject, isNumber }
