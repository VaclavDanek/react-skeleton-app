import thunk from 'redux-thunk'
import Immutable from 'seamless-immutable'
import { applyMiddleware, legacy_createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from '@redux-devtools/extension'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import createRootReducer from './reducers'
import rootEpic from '../epics'
import fetchingMiddleware from '../services/fetchingMiddleware'
import errorMiddleware from '../services/errorMiddleware'

// types
import type { AnyAction, Store as ReduxStore, Middleware } from 'redux'
import type { Epic, StateObservable } from 'redux-observable'
import type { Observable } from 'rxjs'
import type { AsyncReducers, State } from '../store/reducers'

export interface Store extends ReduxStore { 
  asyncReducers: Partial<AsyncReducers>;
}

const createStore = (initialState = Immutable({})): Store => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const epicMiddleware = createEpicMiddleware()
  const middlewares: Middleware[] = [
    thunk,
    epicMiddleware,
    fetchingMiddleware,
    errorMiddleware,
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store: Store = {
    ...legacy_createStore(
      createRootReducer(),
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares))
    ),
    asyncReducers: {},
  }

  const epic$ = new BehaviorSubject(rootEpic)
  const hotReloadingEpic = (action$: Observable<AnyAction>, state$: StateObservable<State>, dependencies: any) => (
    epic$.pipe(switchMap((epic: Epic<AnyAction, AnyAction, State, any>) => epic(action$, state$, dependencies)))
  )
  epicMiddleware.run(hotReloadingEpic as Epic<AnyAction, AnyAction>) // eslint-disable-line @typescript-eslint/no-unsafe-argument

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../epics', () => {
      const nextRootEpic: Epic<AnyAction, AnyAction, State, any> = require('../epics').default
      epic$.next(nextRootEpic)
    })
  }

  return store
}

export default createStore
