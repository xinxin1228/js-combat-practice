/**
 * 抛出错误
 * @param {boolean} isError 是否出错
 * @param {string} mes 错误信息
 */
export const throwError = (isError, mes = '抛出了错误') => {
  if (isError) throw new Error(mes)
}

/**
 * 抛出警告
 * @param {boolean} isWarn 是否警告
 * @param {string} mes 警告信息
 */
export const throwWarn = (isWarn, mes = '抛出了warn') => {
  if (isWarn) console.warn(mes)
}

/**
 * 去除 - ，并全部转为小写
 * @param {string | HTMLElement} arg 要转换的标签名称或元素
 */
export const stringLowerCase = arg => {
  if (typeof arg === 'string') {
    return arg.replaceAll('-', '').toLowerCase()
  } else if (arg instanceof HTMLElement) {
    return arg.tagName.replaceAll('-', '').toLowerCase()
  } else {
    throwError(true, '传入参数类型必须为 string 或 HTMLElement !')
  }
}
