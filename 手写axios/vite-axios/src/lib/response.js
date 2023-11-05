// 请求返回包装
export default function response(xhr, config) {
  const headersText = xhr.getAllResponseHeaders()
  const headers = {}

  headersText.split('\r\n').forEach((text) => {
    if (!text?.trim()) return
    const [key, val] = text.split(': ')

    headers[key] = val
  })

  return {
    statusText: xhr.statusText,
    status: xhr.status,
    data: xhr.responseText,
    headers,
    config
  }
}
