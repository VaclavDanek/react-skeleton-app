import Immutable from 'seamless-immutable'
import moment from 'moment'
import { createReducer, createActions } from 'reduxsauce'

// types
import type { ImmutableObject } from 'seamless-immutable'
import type { DefaultActionTypes, DefaultActionCreators } from 'reduxsauce'
import type { AnyAction } from 'redux'
import type { ObjectType } from '../types'

/* ------------- Types and Action Creators ------------- */

interface AuthTypes extends DefaultActionTypes {
  LOGIN_REQUEST: 'LOGIN_REQUEST';
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS';
  LOGOUT: 'LOGOUT';
  SET_AUTHORIZATION: 'SET_AUTHORIZATION';
  SET_ERROR: 'SET_ERROR';
  SET_EXPIRE: 'SET_EXPIRE';
  SET_TIME: 'SET_TIME';
}

interface AuthActions extends DefaultActionCreators {
  loginRequest: (username: string, password: string) => AnyAction;
  loginRequestSuccess: (authorization: string, expire: number) => AnyAction;
  logout: () => AnyAction;
  setAuthorization: (authorization: string) => AnyAction;
  setError: (error: ObjectType) => AnyAction;
  setExpire: (expire: number) => AnyAction;
  setTime: (time: string) => AnyAction;
}

export const { Types: authTypes, Creators: authActions }: { Types: AuthTypes; Creators: AuthActions } = (
  createActions({
    loginRequest: ['username', 'password'],
    loginRequestSuccess: ['authorization', 'expire'],
    logout: null,
    setAuthorization: ['authorization'],
    setError: ['error'],
    setExpire: ['expire'],
    setTime: ['time'],
  })
)

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authorization: null as string | null,
  error: null as ImmutableObject<ObjectType> | null,
  expire: 0,
  time: '',
})

export type AuthState = typeof INITIAL_STATE

/* ------------- Reducers ------------- */

const loginRequestSuccess = (state: AuthState, { authorization, expire = 0 }: 
  { authorization: string; expire: number }): AuthState => (
    state.merge({
      authorization,
      error: INITIAL_STATE.error,
      time: moment().format('DD.MM.YYYY HH:mm:ss'),
      expire,
    })
  )

const logout = (state: AuthState): AuthState =>
  state.merge(INITIAL_STATE)

const setAuthorization = (state: AuthState, { authorization }: { authorization: string }): AuthState =>
  state.set('authorization', authorization)

const setError = (state: AuthState, { error }: { error: ObjectType | null }): AuthState =>
  state.set('error', error)

const setExpire = (state: AuthState, { expire = 0 }: { expire: number }): AuthState =>
  state.set('expire', expire)

const setTime = (state: AuthState, { time }: { time: string }): AuthState =>
  state.set('time', time)

/* ------------- Hookup Reducers To Types ------------- */

export const authReducer = createReducer(INITIAL_STATE, {
  [authTypes.LOGIN_REQUEST]: (state: AuthState) => state,
  [authTypes.LOGIN_REQUEST_SUCCESS]: loginRequestSuccess,
  [authTypes.LOGOUT]: logout,
  [authTypes.SET_AUTHORIZATION]: setAuthorization,
  [authTypes.SET_ERROR]: setError,
  [authTypes.SET_EXPIRE]: setExpire,
  [authTypes.SET_TIME]: setTime,
})

export default authReducer
