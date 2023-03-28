import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

import { ErrorTypesEnum } from '../types/errorTypes'

// types
import type { ImmutableObject } from 'seamless-immutable'
import type { DefaultActionTypes, DefaultActionCreators } from 'reduxsauce'
import type { AnyAction } from 'redux'
import type { IAlert, ModalsType } from '../types'
import type { IError, ICustomErrorEvent, IAxiosError } from '../types/errorTypes'
import type { ModalType } from '../components/Modals'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addAlert: ['alert'],
  clearAlerts: null,
  clearErrors: null,
  onActionFailure: ['errorEvent', 'errorType'],
  onRequestFailure: ['error', 'errorType'],
  onStartFetching: null,
  onStopFetching: null,
  removeAlert: ['index'],
  setAlertFromRequestSuccess: ['alert'],
  setAlertFromRequestFailure: ['alert'],
  setErrors: ['errors'],
  setFetching: ['fetching'],
  setRedirectUrl: ['redirectUrl'],
  toggleModal: ['key', 'show'],
})

export interface IGeneralTypes extends DefaultActionTypes {
  ADD_ALERT: 'ADD_ALERT';
  CLEAR_ALERTS: 'CLEAR_ALERTS';
  CLEAR_ERRORS: 'CLEAR_ERRORS';
  ON_ACTION_FAILURE: 'ON_ACTION_FAILURE';
  ON_REQUEST_FAILURE: 'ON_REQUEST_FAILURE';
  ON_START_FETCHING: 'ON_START_FETCHING';
  ON_STOP_FETCHING: 'ON_STOP_FETCHING';
  REMOVE_ALERT: 'REMOVE_ALERT';
  SET_ALERT_FROM_REQUEST_SUCCESS: 'SET_ALERT_FROM_REQUEST_SUCCESS';
  SET_ALERT_FROM_REQUEST_FAILURE: 'SET_ALERT_FROM_REQUEST_FAILURE';
  SET_ERRORS: 'SET_ERRORS';
  SET_FETCHING: 'SET_FETCHING';
  SET_REDIRECT_URL: 'SET_REDIRECT_URL';
  TOGGLE_MODAL: 'TOGGLE_MODAL';
}

export interface IGeneralActions extends DefaultActionCreators {
  addAlert: (alert: IAlert) => AnyAction;
  clearAlerts: () => AnyAction;
  clearErrors: () => AnyAction;
  onActionFailure: (errorEvent: ErrorEvent | ICustomErrorEvent, errorType?: ErrorTypesEnum) => AnyAction;
  onRequestFailure: (error: IAxiosError, errorType?: ErrorTypesEnum) => AnyAction;
  onStartFetching: () => AnyAction;
  onStopFetching: () => AnyAction;
  removeAlert: (index: number) => AnyAction;
  setAlertFromRequestSuccess: (alert: IAlert) => AnyAction;
  setAlertFromRequestFailure: (alert: IAlert) => AnyAction;
  setErrors: (errors: IError[]) => AnyAction;
  setFetching: (fetching: number) => AnyAction;
  setRedirectUrl: (redirectUrl: string) => AnyAction;
  toggleModal: (key: ModalType, show?: boolean) => AnyAction;
}

export const GeneralTypes = Types as IGeneralTypes
export const GeneralActions = Creators as IGeneralActions

/* ------------- Initial State ------------- */

export type GeneralState = ImmutableObject<{
  modals: ModalsType;
  alerts: IAlert[];
  errors: (IError | IAxiosError)[];
  fetching: number;
  redirectUrl: string;
}>

export const INITIAL_STATE: GeneralState = Immutable({
  modals: {},
  alerts: [],
  errors: [],
  fetching: 0,
  redirectUrl: '',
})

/* ------------- Reducers ------------- */

export const onActionFailure = (state: GeneralState, { errorEvent, errorType = ErrorTypesEnum.WARNING }:
  { errorEvent: ErrorEvent | ICustomErrorEvent; errorType?: ErrorTypesEnum }): GeneralState => (
    state.setIn(['errors', state.errors.length.toString()], {
      error: { ...errorEvent },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  )

export const onRequestFailure = (state: GeneralState, { error, errorType = ErrorTypesEnum.WARNING }:
  { error: IAxiosError; errorType?: ErrorTypesEnum }): GeneralState => {
    const { message, response, stack } = error
    if (response?.status === 401) { // probably just unsuccessful authentication...
      return state
    }
    return state.setIn(['errors', state.errors.length.toString()], {
      error: { ...error, message, response, stack },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }

export const setErrors = (state: GeneralState, action: { errors: IError[] }): GeneralState =>
  state.set('errors', action.errors)

export const clearErrors = (state: GeneralState): GeneralState =>
  state.set('errors', INITIAL_STATE.errors)

export const setFetching = (state: GeneralState, action: { fetching: number }): GeneralState =>
  state.set('fetching', action.fetching)

export const startFetching = (state: GeneralState): GeneralState =>
  setFetching(state, { fetching: state.fetching + 1 })

export const stopFetching = (state: GeneralState): GeneralState =>
  setFetching(state, { fetching: state.fetching > 0 ? (state.fetching - 1) : 0 })

export const setRedirectUrl = (state: GeneralState, action: { redirectUrl: string }): GeneralState =>
  state.set('redirectUrl', action.redirectUrl)

export const toggleModal = (state: GeneralState, action: { key: ModalType; show?: boolean }): GeneralState =>
  state.setIn(['modals', action.key], action.show ?? !state.modals[action.key])

export const addAlert = (state: GeneralState, action: { alert: IAlert }): GeneralState =>
  state.setIn(['alerts', state.alerts.length], action.alert)

export const removeAlert = (state: GeneralState, action: { index: number }): GeneralState =>
  state.set('alerts', state.alerts.filter((alert: IAlert, index: number) => index !== action.index))

export const clearAlerts = (state: GeneralState): GeneralState =>
  state.set('alerts', INITIAL_STATE.alerts)

export const setAlertFromRequestSuccess = (state: GeneralState, action: { alert: string }): GeneralState =>
  state.setIn(['alerts', state.alerts.length], { message: action.alert, type: 'success' })

export const setAlertFromRequestFailure = (state: GeneralState, action: { alert: string }): GeneralState =>
  state.setIn(['alerts', state.alerts.length], { message: action.alert, type: 'danger' })

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [GeneralTypes.ADD_ALERT]: addAlert,
  [GeneralTypes.CLEAR_ALERTS]: clearAlerts,
  [GeneralTypes.CLEAR_ERRORS]: clearErrors,
  [GeneralTypes.ON_ACTION_FAILURE]: onActionFailure,
  [GeneralTypes.ON_REQUEST_FAILURE]: onRequestFailure,
  [GeneralTypes.ON_START_FETCHING]: startFetching,
  [GeneralTypes.ON_STOP_FETCHING]: stopFetching,
  [GeneralTypes.REMOVE_ALERT]: removeAlert,
  [GeneralTypes.SET_ALERT_FROM_REQUEST_SUCCESS]: setAlertFromRequestSuccess,
  [GeneralTypes.SET_ALERT_FROM_REQUEST_FAILURE]: setAlertFromRequestFailure,
  [GeneralTypes.SET_ERRORS]: setErrors,
  [GeneralTypes.SET_FETCHING]: setFetching,
  [GeneralTypes.SET_REDIRECT_URL]: setRedirectUrl,
  [GeneralTypes.TOGGLE_MODAL]: toggleModal,
})
