import { Component } from 'react'
import { Provider } from 'react-redux'

// containers
import RootContainer from './RootContainer'

// types
import type { Store } from 'redux'

interface IAppContainerProps {
  store: Store;
}

export default class AppContainer extends Component<Readonly<IAppContainerProps>> {
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
