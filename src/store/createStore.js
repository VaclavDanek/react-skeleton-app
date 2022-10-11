import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import rootEpic from '../Epics'
import Immutable from 'seamless-immutable'
import FetchingMiddleware from '../Services/FetchingMiddleware'
import ErrorMiddleware from '../Services/ErrorMiddleware'

import { devTools } from '../config'

const __DEV__ = true

export default (initialState = new Immutable({})) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const epicMiddleware = createEpicMiddleware()
  const middlewares = [
    thunk,
    epicMiddleware,
    FetchingMiddleware,
    ErrorMiddleware,
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__ && devTools) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer(),
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  )
  store.asyncReducers = {}

  epicMiddleware.run(rootEpic)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer(store.asyncReducers))
    })
  }

  return store
}
