// @flow
import React from 'react'
import { Provider } from 'react-redux'

// types
import type { GlobalState } from '../store/reducers'

// containers
import RootContainer from './RootContainer'

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
