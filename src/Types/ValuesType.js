// @flow

export type Values = {
  [name: string]: string | number,
}

export type ValueObject = {
  [key: string]: ValueObject | string | number | Function | Array,
}

export type Alert = { type: string, message: string }
export type Tooltip = { align?: string, text: string }
export type Sort = { param: string, desc?: boolean }
