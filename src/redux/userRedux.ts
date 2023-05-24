/* eslint-disable @typescript-eslint/naming-convention */

import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

// types
import type { ActionCreator, AnyAction } from 'redux'
import type { CreatedActions, Handlers } from 'reduxsauce'
import type { ObjectType } from '../types'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	data: Immutable({} as ObjectType),
})

export type UserState = typeof INITIAL_STATE

/* ------------- Types and Action Creators ------------- */

type Types = { [K in keyof typeof handlers]: K }
type Actions = { [K in keyof typeof actionCreators]: typeof actionCreators[K] }

const actionCreators = {
  setUserData: (data: ObjectType) => ({ type: 'SET_USER_DATA', payload: { data } }),
  setUserDataValue: (key: string, value: any) => ({ type: 'SET_USER_DATA_VALUE', payload: { key, value } }),
}

const createdActions: CreatedActions<Types, Actions> = createActions(actionCreators as Record<string, ActionCreator<AnyAction>>)
export const { Types: userTypes, Creators: userActions } = createdActions

//* ------------- Reducers ------------- */

export type UserAction<K extends keyof typeof actionCreators> = ReturnType<typeof actionCreators[K]>

const handlers = {
  SET_USER_DATA: (state: UserState, { payload }: UserAction<'setUserData'>): UserState => {
    return state.set('data', payload.data)
  },
  SET_USER_DATA_VALUE: (state: UserState, { payload }: UserAction<'setUserDataValue'>): UserState => {
    return state.setIn(['data', payload.key], payload.value)
  },
} satisfies Handlers<UserState>

export const userReducer = createReducer(INITIAL_STATE, handlers)
export default userReducer
