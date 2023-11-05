const { isArray } = Array

const isString = (val) => typeof val === 'string'

const isFunction = (val) => typeof val === 'function'

const isObject = (val) => toString.call(val) === '[object Object]'

const isTypeToString = (val) => toString.call(val)

export { isArray, isString, isFunction, isObject, isTypeToString }
