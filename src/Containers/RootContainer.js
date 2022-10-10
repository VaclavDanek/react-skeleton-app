// @flow
import React from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import I18n from 'i18n-react'

// types
import type { GlobalState } from '../store/reducers'
import type { Alert } from '../Types/ValuesType'
import type {
  Error as CustomError,
  ErrorEvent as CustomErrorEvent,
} from '../Types/ErrorTypes'

// containers
import HomeContainer from './HomeContainer'

// components
import Loader from '../Components/Loader.jsx'
import Modals from '../Components/Modals.jsx'

// redux
import GeneralActions from '../Redux/GeneralRedux'
import UserDataActions from '../Redux/UserDataRedux'

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

  static getDerivedStateFromProps = (nextProps: RootProps, prevState: RootState): RootState | null => {
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
        authExpireAlert: false,
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

  componentDidMount = (): void => {}

  componentWillUnmount = (): void => {
    window.removeEventListener('error', this.handleOnError)
  }

  componentDidCatch = (error: Error, info: React.ErrorInfo): void => {
    const errorEvent: CustomErrorEvent = {
      message: error,
      stack: info.componentStack,
    }
    this.handleOnError(errorEvent)
  }

  handleOnError = (errorEvent: ErrorEvent | CustomErrorEvent): void => {
    const { addAlert, onActionFailure, onStopFetching } = this.props
    if (errorEvent) {
      if (!config.ignoredErrorEventMessages.includes(errorEvent.message)) {
        onStopFetching()
        onActionFailure(errorEvent)
        addAlert({ message: I18n.translate('alerts.onGlobalError'), type: 'danger' })
      }
    }
    else {
      onStopFetching() // just for sure...
    }
  }

  handleOnRedirect = (path: string): void => {
    this.props.onChangeRedirectUrl(path)
  }

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

  handleScrollToElement = (component: HTMLElement | string): void => {
    if (typeof component === 'string') {
      component = this[component] || this.refs[component] // warning: "this.refs" is deprecated!
    }
    if (component) {
      component.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }
  }

  render() {
    const { handleOnCloseAlert, handleOnReload, handleScrollToElement, handleToggleModal } = this
    const { addAlert } = this.props

    const { alerts, fetching, redirectUrl } = this.props
    const { modals } = this.state

    return [
      <div key='app-wrapper' id='body' style={{ height: '2500px' }}>
        <BrowserRouter basename={config.basename}>
          <Route
            exact
            path='/'
            render={(props: RootProps) => (
              <HomeContainer
                {...props}
                isMobile={isMobile}
                scrollToElement={handleScrollToElement}
              />
            )}
          />
          {redirectUrl && <Redirect to={redirectUrl} />}
        </BrowserRouter>
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
