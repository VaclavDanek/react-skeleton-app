import { Observable } from 'rxjs/Observable'

import Api from '../Services/Api'
import csLanguage from '../Translations/cs.json'

// redux
import AuthActions, { AuthTypes } from '../Redux/AuthRedux'
import GeneralActions, { GeneralTypes } from '../Redux/GeneralRedux'
import UserDataActions, { UserDataTypes } from '../Redux/UserDataRedux'

// types

/* eslint-disable import/no-named-as-default-member */
const AuthEpic = [
  (action$, { getState }) =>
    action$.ofType(AuthTypes.LOGIN_REQUEST).switchMap((action) =>
      Observable.fromPromise(Api.login(action.username, action.password))
        .switchMap((response) => {
          const { authorization, token } = response.headers
          const actions = [
            AuthActions.loginRequestSuccess(authorization || token || response.config.headers.Authorization),
            UserDataActions.setUserData(response.data),
          ]
          return Observable.from(actions)
        })
        .catch((error) => {
          const status = error.response ? error.response.status : 503
          return Observable.from([
            AuthActions.setError({ status, message: csLanguage.errors.login[status] }),
            GeneralActions.onRequestFailure(error),
          ])
        }),
    ),
]
/* eslint-enable import/no-named-as-default-member */

export default AuthEpic
