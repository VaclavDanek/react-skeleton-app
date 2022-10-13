import { Observable, from } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import Api from '../Services/Api'

// redux
import GeneralActions, { GeneralTypes } from '../Redux/GeneralRedux'

/* eslint-disable import/no-named-as-default-member */
const GeneralEpic = []
/* eslint-enable import/no-named-as-default-member */

export default GeneralEpic
