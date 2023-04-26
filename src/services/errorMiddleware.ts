import { authActions } from '../redux/authRedux'
import { generalActions, generalTypes } from '../redux/generalRedux'

// types
import type { AnyAction, Dispatch } from 'redux'
import type { AxiosResponse } from 'axios'
import type { AxiosError } from '../types/errorTypes'
import type { State } from '../store/reducers'
import type { AuthState } from '../redux/authRedux'

const errorMiddleware = ({ dispatch, getState }: { dispatch: Dispatch<AnyAction>; getState: () => State }) => 
  (next: (arg0: AnyAction) => void) => (action: AnyAction & { type: string; error?: AxiosError }): void => {
    if (action.type === generalTypes.ON_REQUEST_FAILURE && action.error) {
      const authState: AuthState = getState().auth
      const errorResponse: AxiosResponse | undefined = action.error.response
      if (errorResponse?.status === 401 && authState.authorization) { // probably expired session
        dispatch(authActions.logout())
        dispatch(generalActions.toggleModal('authExpireAlert', true))
      }
    }
    next(action)
  }

export default errorMiddleware
