// @flow
import React from 'react'
import { Provider } from 'react-redux'

import RootContainer from './RootContainer'

// types
import type { GlobalState } from '../store/reducers'

type AppProps = {
  store: GlobalState,
}

export default class AppContainer extends React.Component<AppProps> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}
