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
import type { AuthAction, AuthState } from '../redux/authRedux'

interface LoginRequestResponse extends Partial<AuthState> { token: string }

export default [
  (
    action$: { 
      pipe: (
        arg0: OperatorFunction<AnyAction, AnyAction>, 
        arg1: OperatorFunction<AuthAction<'loginRequest'>, AnyAction>,
      ) => Observable<AnyAction>; 
    }, 
    state$: StateObservable<State>,
  ): Observable<AnyAction> => (
    action$.pipe(
      ofType(authTypes.LOGIN_REQUEST),
      switchMap(({ payload }) =>
        from(api.login(payload.username, payload.password)).pipe(
          switchMap((response: AxiosResponse) => {
            const { token, expiration, issuedAt }: LoginRequestResponse = response.data
            return [
              authActions.loginRequestSuccess(`Bearer ${token}`, expiration, issuedAt),
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
