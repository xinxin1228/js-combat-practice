import deepCopy from './deepCopy'
import { isArray, isTypeToString } from './check'

/**
 * 对象的合并
 * @param {object} target 默认对象
 * @param  {Array<object>} mergeObj 需要合并的对象，合并优先级根据编写顺序，越后的优先级越高.PS: mergeConfig(target, obj1, obj2, obj3)
 * 优先级：obj3 > obj2 > obj1
 * @returns
 */
export default function mergeConfig(target, ...mergeObj) {
  if (mergeObj.length === 1) {
    mergeObj = mergeObj[0]
    target = deepCopy(target, isArray(target) ? [] : {})
    mergeObj = deepCopy(mergeObj, isArray(mergeObj) ? [] : {})

    for (const key in mergeObj) {
      let oldVal = target[key]
      let newVal = mergeObj[key]

      if (typeof newVal === 'object') {
        if (!newVal) {
          target[key] = newVal
          continue
        }

        if (isTypeToString(newVal) !== isTypeToString(oldVal)) {
          oldVal = isArray(newVal) ? [] : {}
        }

        target[key] = mergeConfig(oldVal, newVal)
      } else {
        target[key] = newVal
      }
    }
  } else {
    while (mergeObj.length) {
      let obj = mergeObj.shift()

      target = mergeConfig(target, obj)
    }
  }

  return target
}
