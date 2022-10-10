// @flow
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

// types
import type { ImmutableType } from '../Types/ImmutableTypes'
import type { ValueObject } from '../Types/ValuesType'

import { timers } from '../config'

/* ------------- Types and Action Creators ------------- */

export type AuthState = ImmutableType & {
  authorization: string,
  error: ValueObject,
  expire: number,
  time: string,
}

const { Types, Creators } = createActions({
  clearError: null,
  loginRequest: ['username', 'password'],
  loginRequestSuccess: ['authorization'],
  logout: null,
  setAuthorization: ['authorization'],
  setError: ['error'],
  setExpire: ['expire'],
  setTime: ['date'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({ // eslint-disable-line
  authorization: null,
  error: null,
  expire: 0,
  time: '',
})

/* ------------- Reducers ------------- */

export const clearError = (state: AuthState): AuthState =>
  state.set('error', INITIAL_STATE.error)

export const loginRequestSuccess = (state: AuthState, { authorization }: { authorization: string }): AuthState =>
  state.merge({
    authorization,
    error: INITIAL_STATE.error,
    time: moment().format('DD.MM.YYYY HH:mm:ss'),
    expire: (Date.now() + timers.authExpireTimeout),
  })

export const logout = (state: AuthState): AuthState =>
  state.merge(INITIAL_STATE)

export const setAuthorization = (state: AuthState, { authorization }: { authorization: string }): AuthState =>
  state.set('authorization', authorization)

export const setError = (state: AuthState, { error }: { error: ValueObject }): AuthState =>
  state.set('error', error)

export const setExpire = (state: AuthState, { expire = 0 }: { expire?: number }): AuthState =>
  state.set('expire', Date.now() + expire)

export const setTime = (state: AuthState, { time }: { time: string }): AuthState =>
  state.set('time', time)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLEAR_ERROR]: clearError,
  [Types.LOGIN_REQUEST]: (state) => state,
  [Types.LOGIN_REQUEST_SUCCESS]: loginRequestSuccess,
  [Types.LOGOUT]: logout,
  [Types.SET_AUTHORIZATION]: setAuthorization,
  [Types.SET_TIME]: setTime,
  [Types.SET_ERROR]: setError,
  [Types.SET_EXPIRE]: setExpire,
})
