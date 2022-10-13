// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

// types
import type { GlobalState } from '../store/reducers'

// containers
import RootContainer from './RootContainer'

// config
import { basename } from '../config'

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
        <BrowserRouter basename={basename}>
          <Route component={RootContainer} path='/' />
        </BrowserRouter>
      </Provider>
    )
  }
}
