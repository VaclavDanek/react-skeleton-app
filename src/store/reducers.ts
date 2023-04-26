import { combineReducers } from 'redux'

// reducers
import { generalRedux, authRedux } from '../redux'

// types
import type { Reducer } from 'redux'
import type { UserState } from '../redux/userRedux'

export interface AsyncReducers {
  user: Reducer<UserState>;
}

const staticReducers = {
  general: generalRedux.generalReducer,
  auth: authRedux.authReducer,
}

const createRootReducer = (asyncReducers: Partial<AsyncReducers> = {}): Reducer => (
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  })
)

export type StaticState = { [K in keyof typeof staticReducers]: ReturnType<typeof staticReducers[K]> }
export type AsyncState<T extends Partial<AsyncReducers>> = { [K in keyof T]: T[K] extends Reducer<infer S> ? S : never }
export type State = StaticState & Partial<AsyncState<AsyncReducers>>

export default createRootReducer