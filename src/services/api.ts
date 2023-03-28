import axios from 'axios'

// types
import type { AxiosBasicCredentials, AxiosInstance } from 'axios'

const apis: Record<string, AxiosInstance> = {
  myApi: axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    }
  }),
}

export const setHeader = (apiKey: string, header: string, value?: string): void => {
  if (value) { apis[apiKey].defaults.headers.common[header] = value } else { delete apis[apiKey].defaults.headers.common[header] }
}

export const setGlobalHeader = (header: string, value?: string): void => {
  if (value) { axios.defaults.headers.common[header] = value } else { delete axios.defaults.headers.common[header] }
}

export const setAuth = (apiKey: string, values?: AxiosBasicCredentials): void => {
  if (values) { apis[apiKey].defaults.auth = values } else { delete apis[apiKey].defaults.auth }
}

export const setGlobalAuth = (values?: AxiosBasicCredentials): void => {
  if (values) { axios.defaults.auth = values } else { delete axios.defaults.auth }
}

const endpoints: Record<string, (...args: any[]) => Promise<any>> = {
  // post
  login: (username: string, password: string): Promise<any> => apis.myApi.post(`login`, { username, password }, {
    timeout: 15000,
  }),

  // put

  // get

  // delete
}

export default endpoints
