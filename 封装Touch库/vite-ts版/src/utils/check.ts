const checkType = (type: string) => (obj: any) => {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}

const isString: (obj: any) => boolean = checkType('String')
const isNumber: (obj: any) => boolean = checkType('Number')
const isObject: (obj: any) => boolean = checkType('Object')
const { isArray } = Array
const isFunction: (obj: any) => boolean = checkType('Function')

export { isString, isNumber, isObject, isArray, isFunction }
