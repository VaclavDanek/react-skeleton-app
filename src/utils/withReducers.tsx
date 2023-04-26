import React from 'react'
import { ReactReduxContext } from 'react-redux'
import createRootReducer from '../store/reducers'

// types
import type { ComponentType, ComponentClass } from 'react'
import type { ReactReduxContextValue } from 'react-redux'
import type { Store } from '../store/createStore'
import type { AsyncReducers } from '../store/reducers'

interface IReactReduxContext extends ReactReduxContextValue {
  store: Store;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const withReducers = (reducers: Partial<AsyncReducers>) => <P extends object>(Component: ComponentType<P>): ComponentClass<P> => (
  class extends React.Component<P> {
    static contextType = ReactReduxContext

    constructor(props: P, { store }: IReactReduxContext) {
      super(props)

      if (process.env.NODE_ENV === 'development' && module.hot) {
        store.asyncReducers = reducers
        store.replaceReducer(createRootReducer(reducers))
      }
      else {
        let replaceReducer = false
        for (const [key, reducer] of Object.entries(reducers)) {
          if (!(key in store.asyncReducers)) {
            store.asyncReducers[key] = reducer
            replaceReducer = true
          }
        }
        if (replaceReducer) {
          store.replaceReducer(createRootReducer(store.asyncReducers))
        }
      }
    }

    render(): JSX.Element {
      return <Component {...this.props} />
    }
  }
)

export default withReducers