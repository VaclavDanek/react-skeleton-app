import { Observable, from } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import Api from '../Services/Api'
import csLanguage from '../Translations/cs.json'

// redux
import AuthActions, { AuthTypes } from '../Redux/AuthRedux'
import GeneralActions, { GeneralTypes } from '../Redux/GeneralRedux'
import UserDataActions, { UserDataTypes } from '../Redux/UserDataRedux'

// types

/* eslint-disable import/no-named-as-default-member */
const AuthEpic = [
  (action$, { getState }) => (
    action$.pipe(
      ofType(AuthTypes.LOGIN_REQUEST),
      switchMap((action) =>
        from(Api.login(action.username, action.password)).pipe(
          switchMap((response) => {
            const { token, expire } = response.data
            return [
              AuthActions.loginRequestSuccess(token, expire)
            ]
          }),
          catchError((error) => {
            const status = error.response ? error.response.status : 503
            return [
              AuthActions.setError({ status, message: csLanguage.errors.login[status] }),
              GeneralActions.onRequestFailure(error),
            ]
          })
        )
      )
    )
  )
]
/* eslint-enable import/no-named-as-default-member */

export default AuthEpic
