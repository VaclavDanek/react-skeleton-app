/* eslint-disable @typescript-eslint/naming-convention */

import Immutable from 'seamless-immutable'
import moment from 'moment'
import { createReducer, createActions } from 'reduxsauce'

// types
import type { ImmutableObject } from 'seamless-immutable'
import type { CreatedActions, Handlers } from 'reduxsauce'
import type { ActionCreator, AnyAction } from 'redux'
import type { ObjectType } from '../types'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authorization: null as string | null,
  error: null as ImmutableObject<ObjectType> | null,
  issuedAt: 0 as number | string,
  expiration: 0 as number | string,
})

export type AuthState = typeof INITIAL_STATE

/* ------------- Types and Action Creators ------------- */

type Types = { [K in keyof typeof handlers]: K }
type Actions = { [K in keyof typeof actionCreators]: typeof actionCreators[K] }

const actionCreators = {
  loginRequest: (username: string, password: string) => ({ type: 'LOGIN_REQUEST', payload: { username, password } }),
  loginRequestSuccess: (authorization: string, expiration?: number | string, issuedAt?: number | string) => 
    ({ type: 'LOGIN_REQUEST_SUCCESS', payload: { authorization, expiration, issuedAt } }),
  logout: () => ({ type: 'LOGOUT' }),
  setAuthorization: (authorization: string) => ({ type: 'SET_AUTHORIZATION', payload: { authorization } }),
  setError: (error: ObjectType) => ({ type: 'SET_ERROR', payload: { error } }),
  setExpiration: (expiration: number | string) => ({ type: 'SET_EXPIRATION', payload: { expiration } }),
  setIssuedAt: (issuedAt: number | string) => ({ type: 'SET_ISSUED_AT', payload: { issuedAt } }),
}

const createdActions: CreatedActions<Types, Actions> = createActions(actionCreators as Record<string, ActionCreator<AnyAction>>)
export const { Types: authTypes, Creators: authActions } = createdActions

//* ------------- Create Reducer ------------- */

export type AuthAction<K extends keyof typeof actionCreators> = ReturnType<typeof actionCreators[K]>

const handlers = {
  LOGIN_REQUEST: (state: AuthState): AuthState => {
    return state
  },
  LOGIN_REQUEST_SUCCESS: (state: AuthState, { payload }: AuthAction<'loginRequestSuccess'>): AuthState => {
    const { authorization, expiration = 0, issuedAt = moment().format('DD.MM.YYYY HH:mm:ss') } = payload
    return state.merge({
      authorization,
      error: INITIAL_STATE.error,
      issuedAt,
      expiration,
    })
  },
  LOGOUT: (state: AuthState): AuthState => {
    return state.merge(INITIAL_STATE)
  },
  SET_AUTHORIZATION: (state: AuthState, { payload }: AuthAction<'setAuthorization'>): AuthState => {
    return state.set('authorization', payload.authorization)
  },
  SET_ERROR: (state: AuthState, { payload }: AuthAction<'setError'>): AuthState => {
    return state.set('error', payload.error)
  },
  SET_EXPIRATION: (state: AuthState, { payload }: AuthAction<'setExpiration'>): AuthState => {
    return state.set('expire', payload.expiration)
  },
  SET_ISSUED_AT: (state: AuthState, { payload }: AuthAction<'setIssuedAt'>): AuthState => {
    return state.set('time', payload.issuedAt)
  },
} satisfies Handlers<AuthState>

export const authReducer = createReducer(INITIAL_STATE, handlers)
export default authReducer
