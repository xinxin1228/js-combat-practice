import { isArray } from './check'

export default function deepCopy(target, type = {}) {
  for (const key in target) {
    const val = target[key]

    if (typeof val === 'object') {
      if (!val) {
        type[key] = val
      } else {
        type[key] = isArray(val) ? [] : {}

        deepCopy(val, type[key])
      }
    } else {
      type[key] = val
    }
  }

  return type
}
