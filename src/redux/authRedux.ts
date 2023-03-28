import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

// types
import type { ImmutableObject } from 'seamless-immutable'
import type { DefaultActionTypes, DefaultActionCreators } from 'reduxsauce'
import type { AnyAction } from 'redux'
import type { ObjectType } from '../types'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginRequestSuccess: ['authorization', 'expire'],
  logout: null,
  setAuthorization: ['authorization'],
  setError: ['error'],
  setExpire: ['expire'],
  setTime: ['time'],
})

export interface IAuthTypes extends DefaultActionTypes {
  CLEAR_ERROR: 'CLEAR_ERROR';
  LOGIN_REQUEST: 'LOGIN_REQUEST';
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS';
  LOGOUT: 'LOGOUT';
  SET_AUTHORIZATION: 'SET_AUTHORIZATION';
  SET_ERROR: 'SET_ERROR';
  SET_EXPIRE: 'SET_EXPIRE';
  SET_TIME: 'SET_TIME';
}

export interface IAuthActions extends DefaultActionCreators {
  loginRequest: (username: string, password: string) => AnyAction;
  loginRequestSuccess: (authorization: string, expire: number) => AnyAction;
  logout: () => AnyAction;
  setAuthorization: (authorization: string) => AnyAction;
  setError: (error: ObjectType) => AnyAction;
  setExpire: (expire: number) => AnyAction;
  setTime: (time: string) => AnyAction;
}

export const AuthTypes = Types as IAuthTypes
export const AuthActions = Creators as IAuthActions

/* ------------- Initial State ------------- */

export type AuthState = ImmutableObject<{
  authorization: string | null;
  error: ObjectType | null;
  expire: number;
  time: string;
}>

export const INITIAL_STATE: AuthState = Immutable({
  authorization: null,
  error: null,
  expire: 0,
  time: '',
})

/* ------------- Reducers ------------- */

export const loginRequestSuccess = (state: AuthState, { authorization, expire = 0 }: 
  { authorization: string; expire: number }): AuthState => (
    state.merge({
      authorization,
      error: INITIAL_STATE.error,
      time: moment().format('DD.MM.YYYY HH:mm:ss'),
      expire,
    })
  )

export const logout = (state: AuthState): AuthState =>
  state.merge(INITIAL_STATE)

export const setAuthorization = (state: AuthState, { authorization }: { authorization: string }): AuthState =>
  state.set('authorization', authorization)

export const setError = (state: AuthState, { error }: { error: ObjectType | null }): AuthState =>
  state.set('error', error)

export const setExpire = (state: AuthState, { expire = 0 }: { expire: number }): AuthState =>
  state.set('expire', expire)

export const setTime = (state: AuthState, { time }: { time: string }): AuthState =>
  state.set('time', time)

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_REQUEST]: (state: AuthState) => state,
  [AuthTypes.LOGIN_REQUEST_SUCCESS]: loginRequestSuccess,
  [AuthTypes.LOGOUT]: logout,
  [AuthTypes.SET_AUTHORIZATION]: setAuthorization,
  [AuthTypes.SET_ERROR]: setError,
  [AuthTypes.SET_EXPIRE]: setExpire,
  [AuthTypes.SET_TIME]: setTime,
})
