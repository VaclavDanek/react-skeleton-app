// types
import type { AxiosError } from 'axios'

export enum ErrorTypesEnum {
  INFO = 0,
  WARNING = 1,
  CRITICAL = 2,
}

export interface ICustomErrorEvent {
  message: string;
  stack: any;
}

export interface IError {
  error: ErrorEvent | ICustomErrorEvent;
  type: number;
  time: Date;
}

export interface IAxiosError extends AxiosError {
  stack: string;
}
