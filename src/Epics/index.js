// external libs
import { combineEpics } from 'redux-observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'

// epics
import GeneralEpic from './GeneralEpic'
import AuthEpic from './AuthEpic'

const epics = [
  ...GeneralEpic,
  ...AuthEpic,
]

const rootEpic = (action$, { getState }) =>
  combineEpics(...epics)(action$, { getState })

export default rootEpic
