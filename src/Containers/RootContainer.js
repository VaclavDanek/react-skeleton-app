// @flow
import React from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Switch, Route, Redirect } from 'react-router-dom'
import I18n from 'i18n-react'

// types
import type { GlobalState } from '../store/reducers'
import type { Alert, ValueObject, Values } from '../Types/ValuesType'
import type {
  Error as CustomError,
  ErrorEvent as CustomErrorEvent,
} from '../Types/ErrorTypes'

// containers
import HomeContainer from './HomeContainer'

// components
import { Loader, Modals } from '../Components'

// redux
import GeneralActions from '../Redux/GeneralRedux'

// translations
import csLanguage from '../Translations/cs.json'
// import enLanguage from '../Translations/en.json'

// styles
import 'font-awesome/css/font-awesome.min.css'
import '../static/styles/bootstrap.min.css'
import '../static/styles/root.scss'
import '../static/styles/mobile.scss'

import { setAuth, setHeader } from '../Services/Api'
import * as config from '../config'

type ParentProps = {}

type StateProps = {
  alerts: Array<Alert>,
  errors: Array<CustomError>,
  fetching: number,
  redirectUrl: string,
}

type DispatchProps = {
  addAlert: () => void,
  onActionFailure: () => void,
  onChangeRedirectUrl: () => void,
  onStopFetching: () => void,
  removeAlert: () => void,
}

type RootProps = ParentProps & StateProps & DispatchProps
type RootState = {
  modals: { [key: string]: boolean },
}

class RootScreen extends React.Component<RootProps, RootState> {

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onChangeRedirectUrl, redirectUrl } = nextProps
    if (redirectUrl) { // reset after every redirect
      onChangeRedirectUrl('')
    }
    return null
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      modals: {
        updateAlert: false,
      },
    }

    switch (navigator.language) {
      /* case 'en':
        I18n.setTexts(enLanguage)
        break */
      case 'cs':
      default:
        I18n.setTexts(csLanguage)
        break
    }
    window.addEventListener('error', this.handleOnError)
  }

  componentDidMount() {}

  componentDidCatch(error, info) {
    const errorEvent: CustomErrorEvent = {
      message: error,
      stack: info.componentStack,
    }
    this.handleOnError(errorEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleOnError)
  }

  handleOnError = (errorEvent: ErrorEvent | CustomErrorEvent): void => {
    const { addAlert, onActionFailure, onStopFetching } = this.props
    if (errorEvent) {
      if (!config.ignoredErrorEventMessages.includes(errorEvent.message)) {
        onStopFetching()
        onActionFailure(errorEvent)
        if (process.env.NODE_ENV === 'production' && config.showErrorAlert) {
          addAlert({ message: I18n.translate('alerts.onGlobalError'), type: 'danger' })
        }
      }
    }
    else {
      onStopFetching() // just for sure...
    }
  }

  handleOnRedirect = (path: string): void => {
    this.props.onChangeRedirectUrl(path)
  }

  // eslint-disable-next-line class-methods-use-this
  handleOnReload = (): void => {
    window.location.reload()
  }

  handleOnCloseAlert = (index: number): void => {
    this.props.removeAlert(index)
  }

  handleToggleModal = (key: string, show?: boolean = null): void => {
    this.setState((prevState) => {
      prevState.modals[key] = show !== null ? show : !prevState.modals[key]
      return ({ modals: prevState.modals })
    })
  }

  handleScrollToElement = (component: HTMLElement | string, options?: Values = {
    behavior: 'smooth',
    block: 'start',
    inline: 'start',
  }): void => {
    if (typeof component === 'string') {
      component = this[component] || this.refs[component] // warning: "this.refs" is deprecated!
    }
    if (component) {
      component.scrollIntoView(options)
    }
  }

  render() {
    const { handleOnCloseAlert, handleOnReload, handleScrollToElement, handleToggleModal } = this
    const { addAlert } = this.props

    const { alerts, fetching, redirectUrl } = this.props
    const { modals } = this.state

    return [
      <div key='app-wrapper' id='body'>
        <Switch>
          <Route
            exact
            path=''
            render={(props: RootProps) => (
              <HomeContainer
                {...props}
                isMobile={isMobile}
                scrollToElement={handleScrollToElement}
              />
            )}
          />
          {redirectUrl && <Redirect to={redirectUrl} />}
        </Switch>
      </div>,
      <Modals
        key='modals'
        addAlert={addAlert}
        alerts={alerts}
        data={{
          updateAlert: {
            onClose: handleOnReload,
          },
        }}
        modals={modals}
        onCloseAlert={handleOnCloseAlert}
        onToggleModal={handleToggleModal}
      />,
      <Loader key='loader' active={fetching > 0} />,
    ]
  }
}

const mapStateToProps = (state: GlobalState) => ({
  ...state.general,
})

/* eslint-disable import/no-named-as-default-member */
const mapDispatchToProps = {
  addAlert: GeneralActions.addAlert,
  onActionFailure: GeneralActions.onActionFailure,
  onChangeRedirectUrl: GeneralActions.onChangeRedirectUrl,
  onStopFetching: GeneralActions.onStopFetching,
  removeAlert: GeneralActions.removeAlert,
}
/* eslint-enable import/no-named-as-default-member */

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
