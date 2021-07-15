// @flow
// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

// types
import type { ImmutableType } from '../Types/ImmutableTypes'
import type { Alert } from '../Types/ValuesType'
import type {
  Error as CustomError,
  ErrorEvent as CustomErrorEvent,
  ErrorType as CustomErrorType,
} from '../Types/ErrorTypes'

/* ------------- Types and Action Creators ------------- */

export type GeneralState = ImmutableType & {
  +alerts: Array<Alert>,
  +errors: Array<CustomError>,
  +fetching: number,
  +redirectUrl: string,
}

const { Types, Creators } = createActions({
  addAlert: ['alert'],
  clearAlerts: null,
  clearErrors: null,
  onActionFailure: ['errorEvent', 'errorType'],
  onChangeRedirectUrl: ['redirectUrl'],
  onRequestFailure: ['error', 'errorType'],
  onStartFetching: null,
  onStopFetching: null,
  removeAlert: ['index'],
  setAlertFromRequestSuccess: ['alert'],
  setAlertFromRequestFailure: ['alert'],
  setErrors: ['errors'],
  setFetching: ['fetching'],
})

export const GeneralTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const ERROR_TYPES = {
  INFO: 0,
  WARNING: 1,
  CRITICAL: 2,
}

export const INITIAL_STATE = Immutable({ // eslint-disable-line
  alerts: [],
  errors: [],
  fetching: 0,
  redirectUrl: '',
})

/* ------------- Reducers ------------- */

// eslint-disable-next-line flowtype/space-after-type-colon
export const onActionFailure = (state: GeneralState, { errorEvent, errorType = ERROR_TYPES.WARNING }:
  { errorEvent: ErrorEvent | CustomErrorEvent, errorType?: CustomErrorType }): GeneralState => {
    const { message, stack } = errorEvent
    return state.setIn(['errors', state.errors.length], {
      error: { ...errorEvent, message, stack },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }

// eslint-disable-next-line flowtype/space-after-type-colon
export const onRequestFailure = (state: GeneralState, { error, errorType = ERROR_TYPES.WARNING }:
  { error: Error, errorType?: CustomErrorType }): GeneralState => {
    const { message, response, stack } = error
    if (!response || response.status === 401) { // probably network error or bad authentication -> throw away...
      return state
    }
    return state.setIn(['errors', state.errors.length], {
      error: { ...error, message, response, stack },
      type: errorType,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }

export const setErrors = (state: GeneralState, action: { errors: Array<CustomError> }): GeneralState =>
  state.set('errors', action.errors)

export const clearErrors = (state: GeneralState): GeneralState =>
  state.set('errors', INITIAL_STATE.errors)

export const setFetching = (state: GeneralState, action: { fetching: number }): GeneralState =>
  state.set('fetching', action.fetching)

export const startFetching = (state: GeneralState): GeneralState =>
  setFetching(state, { fetching: state.fetching + 1 })

export const stopFetching = (state: GeneralState): GeneralState =>
  setFetching(state, { fetching: state.fetching > 0 ? (state.fetching - 1) : 0 })

export const onChangeRedirectUrl = (state: GeneralState, action: { redirectUrl: string }): GeneralState =>
  state.set('redirectUrl', action.redirectUrl)

export const addAlert = (state: GeneralState, action: { alert: Alert }): GeneralState =>
  state.setIn(['alerts', state.alerts.length], action.alert)

export const removeAlert = (state: GeneralState, action: { index: number }): GeneralState =>
  state.set('alerts', state.alerts.filter((alert, index) => index !== action.index))

export const clearAlerts = (state: GeneralState): GeneralState =>
  state.set('alerts', INITIAL_STATE.alerts)

export const setAlertFromRequestSuccess = (state: GeneralState, action: { alert: string }): GeneralState =>
  state.setIn(['alerts', state.alerts.length], { message: action.alert, type: 'success' })

export const setAlertFromRequestFailure = (state: GeneralState, action: { alert: string }): GeneralState =>
  state.setIn(['alerts', state.alerts.length], { message: action.alert, type: 'danger' })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ALERT]: addAlert,
  [Types.CLEAR_ALERTS]: clearAlerts,
  [Types.CLEAR_ERRORS]: clearErrors,
  [Types.ON_ACTION_FAILURE]: onActionFailure,
  [Types.ON_CHANGE_REDIRECT_URL]: onChangeRedirectUrl,
  [Types.ON_REQUEST_FAILURE]: onRequestFailure,
  [Types.ON_START_FETCHING]: startFetching,
  [Types.ON_STOP_FETCHING]: stopFetching,
  [Types.REMOVE_ALERT]: removeAlert,
  [Types.SET_ALERT_FROM_REQUEST_SUCCESS]: setAlertFromRequestSuccess,
  [Types.SET_ALERT_FROM_REQUEST_FAILURE]: setAlertFromRequestFailure,
  [Types.SET_ERRORS]: setErrors,
  [Types.SET_FETCHING]: setFetching,
})
