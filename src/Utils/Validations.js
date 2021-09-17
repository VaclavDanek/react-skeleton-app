// @flow

export const matches = (value: any, regex: string): boolean => new RegExp(regex).test(value)

export const isNumber = (value: any): boolean => Number.isFinite(value)

export const hasMinNumber = (value: number, minNumber: number): boolean => value >= minNumber

export const hasMaxNumber = (value: number, maxNumber: number): boolean => value <= maxNumber

export const isAlphabetic = (value: string | number): boolean => /^[a-zA-Z]+$/.test(value)

export const isAlphanumeric = (value: string | number): boolean => /^[a-zA-Z0-9]+$/.test(value)

export const hasMinLength = (value: string, minLength: number): boolean =>
  new RegExp(`^.{${minLength},}$`).test(value)

export const hasMaxLength = (value: string, maxLength: number): boolean =>
  new RegExp(`^.{0,${maxLength}}$`).test(value)

export const isEmail = (value: string): boolean =>
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)

export const isPhone = (value: string, withPrefix?: boolean = false): boolean => {
  if (withPrefix) {
    return /^((00|\+)\d{3})+ ?[1-9]\d{2} ?\d{3} ?\d{3}$/.test(value)
  }
  return /^((00|\+)\d{3})? ?[1-9]\d{2} ?\d{3} ?\d{3}$/.test(value)
}

export const isPSC = (value: string): boolean => /^\d{3}\s?\d{2}$/.test(value)

export const isICO = (value: string) => {
  const match = /^\d{8}$/.exec(value)
  if (!match)
    return false

  let control = 0
  for (let index = 0; index < 7; index++) {
    control += Number(match[0][index]) * (8 - index)
  }

  const mod = control % 11
  return ((11 - mod) % 10) === Number(match[0][7])
}

export const isRC = (value: string): boolean => {
  const match = /^(\d{2})(\d{2})(\d{2})\/?(\d{3})(\d?)$/.exec(value)
  if (!match)
    return false

  let year = Number(match[1])
  let month = Number(match[2])
  const day = Number(match[3])
  const ext = match[4]
  const c = match[5]

  if (!c) {
    if (ext === '000') {
      return false
    }
    year += year > 53 ? 1800 : 1900
  }
  else {
    const mod = Number(match[0].replace('/', '')) % 11
    if (mod !== 0) {
      return false
    }
    year += year > 53 ? 1900 : 2000
  }
  if (month > 50) {
    month -= 50
  } else if (month > 20) {
    month -= 20
  }

  return (month > 0 && month <= 12 && day > 0 && day <= (new Date(year, month, 0)).getDate())
}

export const checkRCWithMonth = (rc: string, month: number | string): boolean => {
  const match = /^\d{2}(\d{2})\d{2}\/?\d{3}\d?$/.exec(rc)
  if (!match)
    return false

  return Number(month) === Number(match[1])
}
