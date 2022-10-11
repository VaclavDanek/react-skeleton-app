// external libs
import { combineEpics } from 'redux-observable'

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
