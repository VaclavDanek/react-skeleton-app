import { applyMiddleware, legacy_createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from '@redux-devtools/extension'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import thunk from 'redux-thunk'
import Immutable from 'seamless-immutable'
import createRootReducer from './reducers'
import rootEpic from '../epics'
import fetchingMiddleware from '../services/fetchingMiddleware'
import errorMiddleware from '../services/errorMiddleware'

// types
import type { AnyAction, Store, Middleware } from 'redux'
import type { Epic, StateObservable } from 'redux-observable'
import type { Observable } from 'rxjs'
import type { ReducersType, ReducerType } from './reducers'

export interface IStore extends Store { 
  asyncReducers: ReducersType;
  injectReducer: (key: string, reducer: ReducerType) => void;
  injectReducers: (reducers: ReducersType) => void;
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
  const store: IStore = {
    ...legacy_createStore(
      createRootReducer(),
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares))
    ),
    asyncReducers: {},
    injectReducer: (key: string, reducer: ReducerType): void => {
      store.asyncReducers[key] = reducer
      store.replaceReducer(createRootReducer(store.asyncReducers))
    },
    injectReducers: (reducers: ReducersType): void => {
      store.asyncReducers = {
        ...store.asyncReducers,
        ...reducers,
      }
      store.replaceReducer(createRootReducer(store.asyncReducers))
    },
  }

  const epic$ = new BehaviorSubject(rootEpic)
  const hotReloadingEpic = (action$: Observable<AnyAction>, state$: StateObservable<void>, dependencies: any) => (
    epic$.pipe(switchMap((epic: Epic<AnyAction, AnyAction, void, any>) => epic(action$, state$, dependencies)))
  )
  epicMiddleware.run(hotReloadingEpic)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(store.asyncReducers))
    })

    module.hot.accept('../epics', () => {
      const nextRootEpic: Epic<AnyAction, AnyAction, void, any> = require('../epics').default
      epic$.next(nextRootEpic)
    })
  }

  return store
}

export default createStore
