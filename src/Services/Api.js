import axios from 'axios'

const serverUrl = ''
const api = axios.create({
  baseURL: `${serverUrl}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setHeader = (key, value) => {
  if (value) {
    axios.defaults.headers.common[key] = value
  } else {
    delete axios.defaults.headers.common[key]
  }
}

export const setAuth = (values) => {
  if (values) {
    axios.defaults.auth = values
  } else {
    delete axios.defaults.auth
  }
}

const endpoints = {

  // post
  login: (username, password) => api.post(`login`, { username, password }, {
    timeout: 15000,
  }),

  // put

  // get

  // delete

  // helpers
  serverUrl,
  setHeader,
}

export default endpoints
