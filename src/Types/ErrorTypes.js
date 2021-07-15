// @flow
import React from 'react'

export type ErrorType = 0 | 1 | 2

export type Error = {
  error: string,
  type: number,
  time: Date,
}

export type ErrorEvent = {
  message: Error,
  stack: React.ErrorInfo,
}
