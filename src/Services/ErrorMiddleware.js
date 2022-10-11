import { setExpire } from '../Redux/AuthRedux'

const ErrorMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === 'ON_REQUEST_FAILURE') {
    const response = action.error.response
    if (response && response.status === 401) {
      const authorization = getState().auth.authorization
      if (authorization) { // probably expired
        dispatch(setExpire(Date.now())) // or dispatch(logout())
      }
    }
  }
  next(action)
}

export default ErrorMiddleware
