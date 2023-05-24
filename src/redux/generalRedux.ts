/* eslint-disable @typescript-eslint/naming-convention */

import Immutable from 'seamless-immutable'
import moment from 'moment'
import { createReducer, createActions } from 'reduxsauce'
import { ErrorTypesEnum } from '../types/errorTypes'

// types
import type { ActionCreator, AnyAction } from 'redux'
import type { CreatedActions, Handlers } from 'reduxsauce'
import type { Alert } from '../types'
import type { CustomError, CustomErrorEvent, AxiosError } from '../types/errorTypes'
import type { ModalKey } from '../components/Modals'

/* ------------- Initial State ------------- */

export type GeneralState = typeof INITIAL_STATE

export const INITIAL_STATE = Immutable({
  modals: Immutable({} as Partial<Record<ModalKey, boolean>>),
  alerts: Immutable([] as Alert[]),
  errors: Immutable([] as (CustomError | AxiosError)[]),
  fetching: 0,
  redirectUrl: '',
})

/* ------------- Types and Action Creators ------------- */

type Types = { [K in keyof typeof handlers]: K }
type Actions = { [K in keyof typeof actionCreators]: typeof actionCreators[K] }

const actionCreators = {
  addAlert: (alert: Alert) => ({ type: 'ADD_ALERT', payload: { alert } }),
  clearAlerts: () => ({ type: 'CLEAR_ALERTS' }),
  clearErrors: () => ({ type: 'CLEAR_ERRORS' }),
  onActionFailure: (errorEvent: ErrorEvent | CustomErrorEvent, errorType?: ErrorTypesEnum) => 
    ({ type: 'ON_ACTION_FAILURE', payload: { errorEvent, errorType } }),
  onRequestFailure: (error: AxiosError, errorType?: ErrorTypesEnum) => 
    ({ type: 'ON_REQUEST_FAILURE', payload: { error, errorType } }),
  onStartFetching: () => ({ type: 'ON_START_FETCHING' }),
  onStopFetching: () => ({ type: 'ON_STOP_FETCHING' }),
  removeAlert: (index: number) => ({ type: 'REMOVE_ALERT', payload: { index } }),
  setAlertFromRequestSuccess: (message: string) => ({ type: 'SET_ALERT_FROM_REQUEST_SUCCESS', payload: { message } }),
  setAlertFromRequestFailure: (message: string) => ({ type: 'SET_ALERT_FROM_REQUEST_FAILURE', payload: { message } }),
  setErrors: (errors: CustomError[]) => ({ type: 'SET_ERRORS', payload: { errors } }),
  setFetching: (fetching: number) => ({ type: 'SET_FETCHING', payload: { fetching } }),
  setRedirectUrl: (redirectUrl: string) => ({ type: 'SET_REDIRECT_URL', payload: { redirectUrl } }),
  toggleModal: (key: ModalKey, show?: boolean) => ({ type: 'TOGGLE_MODAL', payload: { key, show } }),
} satisfies Record<string, ActionCreator<AnyAction>>

const createdActions: CreatedActions<Types, Actions> = createActions(actionCreators as Record<string, ActionCreator<AnyAction>>)
export const { Types: generalTypes, Creators: generalActions } = createdActions

/* ------------- Reducers ------------- */

export type GeneralAction<K extends keyof typeof actionCreators> = ReturnType<typeof actionCreators[K]>

const handlers = {
  ON_ACTION_FAILURE: (state: GeneralState, { payload }: GeneralAction<'onActionFailure'>): GeneralState => {
    const { errorEvent, errorType = ErrorTypesEnum.WARNING } = payload
    return state.setIn(['errors', String(state.errors.length)], {
      error: { ...errorEvent },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  },
  ON_REQUEST_FAILURE: (state: GeneralState, { payload }: GeneralAction<'onRequestFailure'>): GeneralState => {
    const { error, errorType = ErrorTypesEnum.WARNING } = payload
    const { message, response, stack } = error
    if (response?.status !== 401) { // ignore probably just unsuccessful authentication...
      return state.setIn(['errors', String(state.errors.length)], {
        error: { ...error, message, response, stack },
        type: errorType,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }
    return state
  },
  SET_ERRORS: (state: GeneralState, { payload }: GeneralAction<'setErrors'>): GeneralState => {
    return state.set('errors', payload.errors)
  },
  CLEAR_ERRORS: (state: GeneralState): GeneralState => {
    return state.set('errors', INITIAL_STATE.errors)
  },
  SET_FETCHING: (state: GeneralState, { payload }: GeneralAction<'setFetching'>): GeneralState => {
    return state.set('fetching', payload.fetching)
  },
  ON_START_FETCHING: (state: GeneralState): GeneralState => {
    return state.set('fetching', state.fetching + 1)
  },
  ON_STOP_FETCHING: (state: GeneralState): GeneralState => {
    return state.fetching > 0 ? state.set('fetching', state.fetching - 1) : state
  },
  SET_REDIRECT_URL: (state: GeneralState, { payload }: GeneralAction<'setRedirectUrl'>): GeneralState => {
    return state.set('redirectUrl', payload.redirectUrl)
  },
  TOGGLE_MODAL: (state: GeneralState, { payload }: GeneralAction<'toggleModal'>): GeneralState => {
    return state.setIn(['modals', payload.key], payload.show ?? !state.modals[payload.key])
  },
  ADD_ALERT: (state: GeneralState, { payload }: GeneralAction<'addAlert'>): GeneralState => {
    const alreadyExists = !!state.alerts.find((alert: Alert) => alert.message === payload.alert.message)
    return !alreadyExists ? state.setIn(['alerts', String(state.alerts.length)], payload.alert) : state
  },
  REMOVE_ALERT: (state: GeneralState, { payload }: GeneralAction<'removeAlert'>): GeneralState => {
    return state.set('alerts', state.alerts.filter((alert: Alert, index: number) => index !== payload.index))
  },
  CLEAR_ALERTS: (state: GeneralState): GeneralState => {
    return state.set('alerts', INITIAL_STATE.alerts)
  },
  SET_ALERT_FROM_REQUEST_SUCCESS: (state: GeneralState, { payload }: GeneralAction<'setAlertFromRequestSuccess'>): GeneralState => {
    return state.setIn(['alerts', String(state.alerts.length)], { message: payload.message, type: 'success' })
  },
  SET_ALERT_FROM_REQUEST_FAILURE: (state: GeneralState, { payload }: GeneralAction<'setAlertFromRequestFailure'>): GeneralState => {
    return state.setIn(['alerts', String(state.alerts.length)], { message: payload.message, type: 'danger' })
  },
} satisfies Handlers<GeneralState>

export const generalReducer = createReducer(INITIAL_STATE, handlers)
export default generalReducer
