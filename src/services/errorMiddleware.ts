import { AuthActions } from '../redux/authRedux'
import { GeneralActions, GeneralTypes } from '../redux/generalRedux'

// types
import type { AnyAction, Dispatch } from 'redux'
import type { AxiosResponse, AxiosError } from 'axios'
import type { IState } from '../store/reducers'
import type { AuthState } from '../redux/authRedux'

const errorMiddleware = ({ dispatch, getState }: { dispatch: Dispatch<AnyAction>; getState: () => IState }) => 
  (next: (arg0: AnyAction) => void) => (action: AnyAction & { type: string; error: AxiosError }): void => {
    if (action.type === GeneralTypes.ON_REQUEST_FAILURE) {
      const authState: AuthState = getState().auth
      const response: AxiosResponse | undefined = action.error.response
      if (response?.status === 401 && authState.authorization) { // probably expired session
        dispatch(AuthActions.logout())
        dispatch(GeneralActions.toggleModal('authExpireAlert', true))
      }
    }
    next(action)
  }

export default errorMiddleware
