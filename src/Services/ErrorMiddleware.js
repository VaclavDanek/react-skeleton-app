import { setExpire } from '../Redux/AuthRedux'

const ErrorMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === 'ON_REQUEST_FAILURE') {
    const response = action.error.response
    if (response && response.status === 401/* && response.data.includes('xpired')*/) {
      const authorization = getState().auth.authorization
      if (authorization) {
        dispatch(setExpire(0)) // or dispatch(logout())
      }
    }
  }
  next(action)
}

export default ErrorMiddleware
