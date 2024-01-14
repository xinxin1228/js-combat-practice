import { isObject, isFunction } from '../utils/check'
import { throwError } from '../utils/throwError'
import { AxiosError } from './AxiosError'

// 发送请求
export const request = config => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    let {
      url,
      method,
      headers,
      data,
      timeout,
      params,
      signal,
      onUploadProgress,
      onDownloadProgress
    } = config

    throwError(params && !isObject(params), 'params must be an object')
    throwError(
      onUploadProgress && !isFunction(onUploadProgress),
      'onUploadProgress must be a function'
    )
    throwError(
      onDownloadProgress && !isFunction(onDownloadProgress),
      'onDownloadProgress must be a function'
    )

    // 去hash
    url = url.split('#')[0]
    // 拼接params
    if (params) {
      if (url.includes('?')) {
        if (url.endsWith('&')) {
          url += Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&')
        } else {
          url += `&${Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&')}`
        }
      } else {
        url += '?'
      }
    }

    xhr.open(method, url)

    if (timeout) {
      xhr.timeout = timeout
    }
    if (signal) {
      if (signal.aborted) {
        xhr.abort()
      } else {
        signal.addEventListener('abort', () => {
          xhr.abort()
        })
      }
    }

    for (const header in headers) {
      xhr.setRequestHeader(header, String(headers[header]))
    }

    xhr.send(JSON.stringify(data))
    const createError = (message, code) => {
      return new AxiosError(message, code, config, xhr)
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr)
      } else {
        reject(
          createError(
            `Request failed with status code ${xhr.status}`,
            'ERR_BAD_RxEQUEST'
          )
        )
      }
    })
    xhr.addEventListener('error', () => {
      reject(createError('Network Error', 'ERR_NETWORK'))
    })
    xhr.addEventListener('timeout', () => {
      reject(createError(`timeout of ${timeout}ms exceeded`, 'ECONNABORTED'))
    })
    xhr.addEventListener('abort', () => {
      reject(createError('canceled', 'ERR_CANCELED'))
    })

    xhr.upload.addEventListener('progress', e => {
      onUploadProgress && onUploadProgress(e)
    })
    xhr.addEventListener('progress', e => {
      onDownloadProgress && onDownloadProgress(e)
    })
  })
}
