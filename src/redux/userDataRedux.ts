import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// types
import type { ImmutableObject } from 'seamless-immutable'
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import type { AnyAction } from 'redux'
import type { ObjectType } from '../types'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUserData: ['data'],
  setUserDataValue: ['key', 'value'],
})

export interface IUserDataTypes extends DefaultActionTypes {
  SET_USER_DATA: 'SET_USER_DATA';
  SET_USER_DATA_VALUE: 'SET_USER_DATA_VALUE';
}

export interface IUserDataActions extends DefaultActionCreators {
  setUserData: (data: ObjectType) => AnyAction;
  setUserDataValue: (key: string, value: any) => AnyAction;
}

export const UserDataTypes = Types as IUserDataTypes
export const UserDataActions = Creators as IUserDataActions

/* ------------- Initial State ------------- */

export type UserDataState = ImmutableObject<{
  data: ObjectType;
}>

export const INITIAL_STATE: UserDataState = Immutable({
	data: {},
})

/* ------------- Reducers ------------- */

export const setUserData = (state: UserDataState, { data }: { data: ObjectType }): UserDataState =>
  state.merge(data)

export const setUserDataValue = (state: UserDataState, { key, value }: { key: string; value: any }): UserDataState =>
  state.setIn(['data', key], value)

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [UserDataTypes.SET_USER_DATA]: setUserData,
  [UserDataTypes.SET_USER_DATA_VALUE]: setUserDataValue,
})
