// @flow
import { combineReducers } from 'redux'

import type { Store } from 'redux'
import { reducer as GeneralReduxReducer } from '../Redux/GeneralRedux'
import { reducer as UserDataReduxReducer } from '../Redux/UserDataRedux'
import { reducer as AuthReduxReducer } from '../Redux/AuthRedux'

// types
import type { GeneralState } from '../Redux/GeneralRedux'
import type { UserDataState } from '../Redux/UserDataRedux'
import type { AuthState } from '../Redux/AuthRedux'

export type GlobalState = Store & {
  auth: AuthState,
  general: GeneralState,
  userData: UserDataState,
}

const rootReducer = (): GlobalState =>
  combineReducers({
    auth: AuthReduxReducer,
    general: GeneralReduxReducer,
    userData: UserDataReduxReducer,
  })

export default rootReducer
