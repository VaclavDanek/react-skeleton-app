/* eslint-disable @typescript-eslint/no-unused-vars */

import { from } from 'rxjs'
import { catchError, switchMap, map, finalize } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import I18n from 'i18n-react'
import api from '../services/api'

// redux
import { authTypes, authActions } from '../redux/authRedux'
import { generalActions } from '../redux/generalRedux'

// types
import type { AnyAction } from 'redux'
import type { OperatorFunction, Observable } from 'rxjs'
import type { AxiosResponse } from 'axios'
import type { StateObservable } from 'redux-observable'
import type { AxiosError } from '../types/errorTypes'
import type { State } from '../store/reducers'

interface LoginRequestParams { username: string; password: string }
interface LoginRequestResponse { token: string; expire: number }

export default [
  (
    action$: { 
      pipe: (
        arg0: OperatorFunction<AnyAction, AnyAction>, 
        arg1: OperatorFunction<LoginRequestParams, AnyAction>,
      ) => Observable<AnyAction>; 
    }, 
    state$: StateObservable<State>,
  ): Observable<AnyAction> => (
    action$.pipe(
      ofType(authTypes.LOGIN_REQUEST),
      switchMap((action: LoginRequestParams) =>
        from(api.login(action.username, action.password)).pipe(
          switchMap((response: AxiosResponse) => {
            const { token, expire }: LoginRequestResponse = response.data
            return [
              authActions.loginRequestSuccess(token, expire),
            ]
          }),
          catchError((error: AxiosError) => {
            const status: number = error.response?.status ?? 503
            return [
              authActions.setError({ status, message: I18n.translate(`errors.login.${status}`) }),
              generalActions.onRequestFailure(error),
            ]
          }),
        )
      )
    )
  )
]
