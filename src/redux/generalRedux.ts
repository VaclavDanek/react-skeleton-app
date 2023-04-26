import Immutable from 'seamless-immutable'
import moment from 'moment'
import { createReducer, createActions } from 'reduxsauce'
import { ErrorTypesEnum } from '../types/errorTypes'

// types
import type { DefaultActionTypes, DefaultActionCreators } from 'reduxsauce'
import type { AnyAction } from 'redux'
import type { Alert } from '../types'
import type { CustomError, CustomErrorEvent, AxiosError } from '../types/errorTypes'
import type { ModalKey } from '../components/Modals'

/* ------------- Types and Action Creators ------------- */

interface GeneralTypes extends DefaultActionTypes {
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

interface GeneralActions extends DefaultActionCreators {
  addAlert: (alert: Alert) => AnyAction;
  clearAlerts: () => AnyAction;
  clearErrors: () => AnyAction;
  onActionFailure: (errorEvent: ErrorEvent | CustomErrorEvent, errorType?: ErrorTypesEnum) => AnyAction;
  onRequestFailure: (error: AxiosError, errorType?: ErrorTypesEnum) => AnyAction;
  onStartFetching: () => AnyAction;
  onStopFetching: () => AnyAction;
  removeAlert: (index: number) => AnyAction;
  setAlertFromRequestSuccess: (alert: Alert) => AnyAction;
  setAlertFromRequestFailure: (alert: Alert) => AnyAction;
  setErrors: (errors: CustomError[]) => AnyAction;
  setFetching: (fetching: number) => AnyAction;
  setRedirectUrl: (redirectUrl: string) => AnyAction;
  toggleModal: (key: ModalKey, show?: boolean) => AnyAction;
}

export const { Types: generalTypes, Creators: generalActions }: { Types: GeneralTypes; Creators: GeneralActions } = (
  createActions({
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
)

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modals: Immutable({} as Partial<Record<ModalKey, boolean>>),
  alerts: Immutable([] as Alert[]),
  errors: Immutable([] as (CustomError | AxiosError)[]),
  fetching: 0,
  redirectUrl: '',
})

export type GeneralState = typeof INITIAL_STATE

/* ------------- Reducers ------------- */

const onActionFailure = (state: GeneralState, { errorEvent, errorType = ErrorTypesEnum.WARNING }:
  { errorEvent: ErrorEvent | CustomErrorEvent; errorType: ErrorTypesEnum }): GeneralState => (
    state.setIn(['errors', String(state.errors.length)], {
      error: { ...errorEvent },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  )

const onRequestFailure = (state: GeneralState, { error, errorType = ErrorTypesEnum.WARNING }:
  { error: AxiosError; errorType: ErrorTypesEnum }): GeneralState => {
    const { message, response, stack } = error
    if (response?.status === 401) { // probably just unsuccessful authentication...
      return state
    }
    return state.setIn(['errors', String(state.errors.length)], {
      error: { ...error, message, response, stack },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }

const setErrors = (state: GeneralState, action: { errors: CustomError[] }): GeneralState =>
  state.set('errors', action.errors)

const clearErrors = (state: GeneralState): GeneralState =>
  state.set('errors', INITIAL_STATE.errors)

const setFetching = (state: GeneralState, action: { fetching: number }): GeneralState =>
  state.set('fetching', action.fetching)

const onStartFetching = (state: GeneralState): GeneralState =>
  setFetching(state, { fetching: state.fetching + 1 })

const onStopFetching = (state: GeneralState): GeneralState => {
  if (state.fetching > 0) {
    return setFetching(state, { fetching: (state.fetching - 1) })
  }
  return state
}

const setRedirectUrl = (state: GeneralState, action: { redirectUrl: string }): GeneralState =>
  state.set('redirectUrl', action.redirectUrl)

const toggleModal = (state: GeneralState, action: { key: ModalKey; show?: boolean }): GeneralState =>
  state.setIn(['modals', action.key], action.show ?? !state.modals[action.key])

const addAlert = (state: GeneralState, action: { alert: Alert }): GeneralState => {
  const sameAlert = state.alerts.find((alert: Alert) => alert.message === action.alert.message)
  return !sameAlert ? state.setIn(['alerts', String(state.alerts.length)], action.alert) : state
}

const removeAlert = (state: GeneralState, action: { index: number }): GeneralState =>
  state.set('alerts', state.alerts.filter((alert: Alert, index: number) => index !== action.index))

const clearAlerts = (state: GeneralState): GeneralState =>
  state.set('alerts', INITIAL_STATE.alerts)

const setAlertFromRequestSuccess = (state: GeneralState, action: { alert: string }): GeneralState =>
  state.setIn(['alerts', String(state.alerts.length)], { message: action.alert, type: 'success' })

const setAlertFromRequestFailure = (state: GeneralState, action: { alert: string }): GeneralState =>
  state.setIn(['alerts', String(state.alerts.length)], { message: action.alert, type: 'danger' })

/* ------------- Hookup Reducers To Types ------------- */

export const generalReducer = createReducer(INITIAL_STATE, {
  [generalTypes.ADD_ALERT]: addAlert,
  [generalTypes.CLEAR_ALERTS]: clearAlerts,
  [generalTypes.CLEAR_ERRORS]: clearErrors,
  [generalTypes.ON_ACTION_FAILURE]: onActionFailure,
  [generalTypes.ON_REQUEST_FAILURE]: onRequestFailure,
  [generalTypes.ON_START_FETCHING]: onStartFetching,
  [generalTypes.ON_STOP_FETCHING]: onStopFetching,
  [generalTypes.REMOVE_ALERT]: removeAlert,
  [generalTypes.SET_ALERT_FROM_REQUEST_SUCCESS]: setAlertFromRequestSuccess,
  [generalTypes.SET_ALERT_FROM_REQUEST_FAILURE]: setAlertFromRequestFailure,
  [generalTypes.SET_ERRORS]: setErrors,
  [generalTypes.SET_FETCHING]: setFetching,
  [generalTypes.SET_REDIRECT_URL]: setRedirectUrl,
  [generalTypes.TOGGLE_MODAL]: toggleModal,
})

export default generalReducer
