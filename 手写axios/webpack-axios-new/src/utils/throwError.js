export const throwError = (isError, mes) => {
  if (isError) {
    throw new Error(mes)
  }
}
