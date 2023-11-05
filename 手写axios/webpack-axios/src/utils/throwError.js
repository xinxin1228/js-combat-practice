export default function throwError(isError, mes) {
  if (isError) throw new Error(mes)
}
