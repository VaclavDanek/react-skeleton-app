/* eslint-disable @typescript-eslint/consistent-type-imports */

import { combineReducers } from 'redux'

// reducers
import GeneralReduxReducer from '../redux/generalRedux'
import AuthReduxReducer from '../redux/authRedux'
import UserDataReduxReducer from '../redux/userDataRedux'

// types
import type { Reducer } from 'redux'
import type { GeneralState } from '../redux/generalRedux'
import type { AuthState } from '../redux/authRedux'
import type { UserDataState } from '../redux/userDataRedux'

export interface IGlobalState { 
  [ReducersEnum.general]: GeneralState;
}

export interface IState extends IGlobalState { 
  [ReducersEnum.auth]: AuthState;
  [ReducersEnum.userData]: UserDataState;
}

export enum ReducersEnum {
  auth = 'auth',
  general = 'general',
  userData = 'userData',
}

export type ReducerType = typeof GeneralReduxReducer | typeof AuthReduxReducer | typeof UserDataReduxReducer
export type ReducersType = Partial<Record<ReducersEnum, ReducerType>>

const createRootReducer = (asyncReducers: ReducersType = {}): Reducer => {
  const staticReducers: ReducersType = {
    [ReducersEnum.general]: GeneralReduxReducer,
  }

  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  })
}

export default createRootReducer