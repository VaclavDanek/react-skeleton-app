// @flow
// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// types
import type { ValueObject } from '../Types/ValuesType'
import type { ImmutableType } from '../Types/ImmutableTypes'

/* ------------- Types and Action Creators ------------- */

export type UserDataState = ImmutableType & {
  +data: ValueObject,
}

const { Types, Creators } = createActions({
  setUserData: ['data'],
  setUserDataValue: ['key', 'value'],
})

export const UserDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({ // eslint-disable-line
	data: {},
})

/* ------------- Reducers ------------- */

export const setUserData = (state: UserDataState, { data }: { data: ValueObject }): UserDataState =>
  state.merge(data)

export const setUserDataValue = (state: UserDataState, { key, value }: { key: string, value: any }): UserDataState =>
  state.setIn(['data', key], value)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_DATA]: setUserData,
  [Types.SET_USER_DATA_VALUE]: setUserDataValue,
})
