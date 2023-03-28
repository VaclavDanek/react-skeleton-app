/* eslint-disable @typescript-eslint/no-unused-vars */

import { Observable, from } from 'rxjs'
import { catchError, switchMap, map, finalize } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import I18n from 'i18n-react'

import api from '../services/api'

// redux
import { AuthTypes, AuthActions } from '../redux/authRedux'
import { GeneralTypes, GeneralActions } from '../redux/generalRedux'
import { UserDataTypes, UserDataActions } from '../redux/userDataRedux'

// types
import type { AnyAction } from 'redux'
import type { OperatorFunction} from 'rxjs'
import type { AxiosResponse } from 'axios'
import type { StateObservable } from 'redux-observable'
import type { IState } from '../store/reducers'
import type { IAxiosError } from '../types/errorTypes'

interface ILoginRequestParams { username: string; password: string }
interface ILoginRequestResponse { token: string; expire: number }

export default [
  (
    action$: { 
      pipe: (
        arg0: OperatorFunction<AnyAction, AnyAction>, 
        arg1: OperatorFunction<ILoginRequestParams, AnyAction>,
      ) => any; 
    }, 
    state$: StateObservable<void> | { getState: () => IState }
  ): any => (
    action$.pipe(
      ofType(AuthTypes.LOGIN_REQUEST),
      switchMap((action: ILoginRequestParams) =>
        from(api.login(action.username, action.password)).pipe(
          switchMap((response: AxiosResponse) => {
            const { token, expire }: ILoginRequestResponse = response.data
            return [
              AuthActions.loginRequestSuccess(token, expire),
            ]
          }),
          catchError((error: IAxiosError) => {
            const status: number = error.response?.status ?? 503
            return [
              AuthActions.setError({ status, message: I18n.translate(`errors.login.${status}`) }),
              GeneralActions.onRequestFailure(error),
            ]
          }),
        )
      )
    )
  )
]
