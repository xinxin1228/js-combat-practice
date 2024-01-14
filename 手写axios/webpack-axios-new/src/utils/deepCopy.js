export const deepCopy = obj => {
  if (typeof obj !== 'object') return obj
  if (obj === null) return null

  let newObj = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    const val = obj[key]

    // 优化 如果是类 就不再深拷贝
    if (typeof val === 'object') {
      // 类
      if (val?.constructor?.name !== 'Object') {
        newObj[key] = val
      } else {
        newObj[key] = deepCopy(val)
      }
    } else {
      newObj[key] = val
    }
  }

  return newObj
}
