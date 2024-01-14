import { deepCopy } from './deepCopy'

/**
 * 合并配置
 * @param {object} baseConfig 配置信息
 * @param {Array<object>} mergeCon 被合并的配置信息列表
 */
export const mergeConfig = (baseConfig, ...mergeList) => {
  if (mergeList.length === 1) {
    baseConfig = deepCopy(baseConfig)
    let mergeCon = deepCopy(mergeList[0])

    for (const key in mergeCon) {
      const oldVal = baseConfig[key]
      const newVal = mergeCon[key]

      if (toString.call(oldVal) !== toString.call(newVal)) {
        baseConfig[key] = newVal
      } else if (typeof newVal !== 'object') {
        baseConfig[key] = newVal
      } else {
        baseConfig[key] = mergeConfig(oldVal, newVal)
      }
    }
  } else {
    while (mergeList.length) {
      let mergeCon = mergeList.shift()
      baseConfig = mergeConfig(baseConfig, mergeCon)
    }
  }

  return baseConfig
}
