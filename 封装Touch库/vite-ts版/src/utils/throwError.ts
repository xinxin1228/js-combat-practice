/**
 * 统一的错误抛出
 * @param isError 是否错误
 * @param mes 错误提示
 */
export default function throwError(isError: boolean, mes: string): void {
  if (isError) throw new Error(mes)
}
