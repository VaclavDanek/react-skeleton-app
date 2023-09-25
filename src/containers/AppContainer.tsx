import I18n from 'i18n-react'
import { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'

// translations
import { csLanguage, enLanguage } from '../translations'

// types
import type { Store } from '../store/createStore'

type AppContainerProps = Readonly<{
  store: Store;
}>

export default class AppContainer extends Component<AppContainerProps> {
  constructor(props: AppContainerProps) {
    super(props)
    
    switch (navigator.language) {
      case 'cs':
      case 'cs-CZ':
        I18n.setTexts(csLanguage)
        break
      case 'en':
      default:
        I18n.setTexts(enLanguage)
        break
    }
  }

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
