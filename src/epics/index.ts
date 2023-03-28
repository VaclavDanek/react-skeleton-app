import { combineEpics } from 'redux-observable'

// epics
import generalEpic from './generalEpic'
import authEpic from './authEpic'

// types
import type { Epic } from 'redux-observable'

const epics: Epic[] = [
  ...generalEpic,
  ...authEpic,
]

export default combineEpics(...epics)
