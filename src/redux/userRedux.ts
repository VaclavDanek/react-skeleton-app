import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

// types
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import type { AnyAction } from 'redux'
import type { ObjectType } from '../types'

/* ------------- Types and Action Creators ------------- */

interface UserTypes extends DefaultActionTypes {
  SET_USER_DATA: 'SET_USER_DATA';
  SET_USER_DATA_VALUE: 'SET_USER_DATA_VALUE';
}

interface UserActions extends DefaultActionCreators {
  setUserData: (data: ObjectType) => AnyAction;
  setUserDataValue: (key: string, value: any) => AnyAction;
}

export const { Types: userTypes, Creators: userActions }: { Types: UserTypes; Creators: UserActions } = (
  createActions({
    setUserData: ['data'],
    setUserDataValue: ['key', 'value'],
  })
)

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	data: Immutable({} as ObjectType),
})

export type UserState = typeof INITIAL_STATE

/* ------------- Reducers ------------- */

const setUserData = (state: UserState, { data }: { data: ObjectType }): UserState =>
  state.merge(data)

const setUserDataValue = (state: UserState, { key, value }: { key: string; value: any }): UserState =>
  state.setIn(['data', key], value)

/* ------------- Hookup Reducers To Types ------------- */

export const userReducer = createReducer(INITIAL_STATE, {
  [userTypes.SET_USER_DATA]: setUserData,
  [userTypes.SET_USER_DATA_VALUE]: setUserDataValue,
})

export default userReducer
