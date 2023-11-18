export const throwError = (isError, mes) => {
  if (isError) throw new Error(mes)
}

export const throwWarn = (isWarn, mes) => {
  if (isWarn) console.warn(mes)
}
