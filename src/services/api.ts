import axios from 'axios'

// types
import type { AxiosBasicCredentials, AxiosInstance, AxiosResponse } from 'axios'

const apis: Record<string, AxiosInstance> = {
  myApi: axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    }
  }),
}

export const setHeader = (apiKey: string, header: string, value?: string | string[]): void => {
  if (value) { apis[apiKey].defaults.headers.common[header] = value } else { delete apis[apiKey].defaults.headers.common[header] }
}

export const setGlobalHeader = (header: string, value?: string | string[]): void => {
  if (value) { axios.defaults.headers.common[header] = value } else { delete axios.defaults.headers.common[header] }
}

export const setBasicAuth = (apiKey: string, credentials?: AxiosBasicCredentials): void => {
  if (credentials) { apis[apiKey].defaults.auth = credentials } else { delete apis[apiKey].defaults.auth }
}

export const setGlobalBasicAuth = (credentials?: AxiosBasicCredentials): void => {
  if (credentials) { axios.defaults.auth = credentials } else { delete axios.defaults.auth }
}

const endpoints: Record<string, (...args: any[]) => Promise<AxiosResponse>> = {
  // post
  login: (username: string, password: string): Promise<AxiosResponse> => (
    apis.myApi.post(`login`, { username, password }, { timeout: 15000 })
  ),

  // put

  // get

  // delete
}

export default endpoints
