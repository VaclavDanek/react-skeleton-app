// @flow

// types
import type { Sort, ValueObject } from '../Types/ValuesType'

// app functions //

// general functions //

export const stringifyErrors = (object: ValueObject): string => {
  const jsonFriendlyErrorReplacer = (key: string, value: any): any => {
    if (value instanceof Error) {
      return {
        ...value,
        name: value.name,
        message: value.message,
        stack: value.stack,
      }
    }
    return value
  }
  return JSON.stringify(object, jsonFriendlyErrorReplacer)
}

export const isFullScreen = (doc?: Document = window.document): boolean => {
  return !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement)
}

export const toggleFullScreen = (elem?: HTMLElement = document.documentElement): boolean => {
  const doc = window.document
  if (!isFullScreen(doc)) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullScreen()
    }
    return true // fullscreen state
  }
  else {
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      doc.webkitExitFullscreen()
    }
    return false // fullscreen state
  }
}

export const getCookie = (key: string): string | null => {
  const nameEQ = `${key  }=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookies = decodedCookie.split(';')
  for (let index = 0; index < cookies.length; index++) {
    let cookie = cookies[index]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length).trim()
    }
  }
  return null
}

// param minutes with zero value, creates a session cookie
export const setCookie = (key: string, value: any, minutes?: number = (10 * 365 * 24 * 60), samesite?: string, secure?: boolean): void => {
  const params = ['path=/']
  if (samesite === 'strict' || samesite === 'lax') {
    params.push(`samesite=${samesite}`)
  }
  if (secure) {
    if (samesite === 'none') {
      params.push('samesite=none')
    }
    params.push('secure')
  }
  if (minutes) {
    const date = new Date()
    date.setTime(date.getTime() + (minutes * 60 * 1000))
    params.push(`expires=${date.toUTCString()}`)
  }
  document.cookie = `${key}=${value};${params.join(';')}`
}

export const sort = (
  array: Array<ValueObject>,
  sorts: Array<Sort>,
  locale?: string = navigator.language,
  options?: ValueObject = { numeric: true, sensitivity: 'base' }
): Array<ValueObject> => {
  const compare = (a: ValueObject, b: ValueObject, index?: number = 0): number | compare<a, b, index> => { // eslint-disable-line no-use-before-define
    const { desc, param } = sorts[index]

    let result = 0
    if (desc)
      result = b[param].localeCompare(a[param], locale, options)
    else
      result = a[param].localeCompare(b[param], locale, options)

    index++
    if (result === 0 && sorts.length > index)
      return compare(a, b, index)

    return result
  }
  return array.sort((a, b) => compare(a, b))
}

export const checkType = (variable: any, expected: string): void => {
  const type = typeof variable
  if (type !== expected) {
    throw `TypeError: the variable type is ${type}, but a ${expected} is expected`
  }
}

export const round = (value: number): number => (Math.round(value * 100) / 100)
