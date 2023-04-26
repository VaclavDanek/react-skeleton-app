import { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'

// types
import type { Store } from '../store/createStore'

interface AppContainerProps {
  store: Store;
}

export default class AppContainer extends Component<Readonly<AppContainerProps>> {
  shouldComponentUpdate(): boolean {
    return false
  }

  render(): JSX.Element {
    const { store } = this.props
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}
