import { AxiosHeaders } from './AxiosHeaders'

// 包装响应结果
export const response = (xhr, config) => {
  const headers = new AxiosHeaders(xhr.getAllResponseHeaders())

  return {
    config,
    data: xhr.responseText,
    headers,
    request: xhr,
    status: xhr.status,
    statusText: xhr.statusText
  }
}
