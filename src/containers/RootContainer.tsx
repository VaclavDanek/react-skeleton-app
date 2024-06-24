import I18n from 'i18n-react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import * as config from '../config'

// pages
import { HomePage } from '../pages'

// components
import { Loader, Modals } from '../components'

// redux
import { generalActions } from '../redux/generalRedux'

// types
import type { State } from '../store/reducers'
import type { CustomErrorEvent } from '../types/errorTypes'
import type { ModalKey } from '../components/Modals'

// styles
import 'bootstrap/scss/bootstrap.scss'
import '../styles/main.scss'
import '../styles/mobile.scss'

type RootContainerProps = Readonly<ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

interface RootContainerState {
  hasError?: boolean;
}

class RootContainer extends Component<RootContainerProps, RootContainerState> {
  state: RootContainerState = {}

  constructor(props: RootContainerProps) {
    super(props)
    window.addEventListener('error', this.handleOnError)
  }

  static getDerivedStateFromProps(
    nextProps: RootContainerProps, 
    prevState: RootContainerState, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Partial<RootContainerState> | null {
    const { redirectUrl, setRedirectUrl } = nextProps
    if (redirectUrl) { // reset after every redirect
      setRedirectUrl('')
    }
    return null
  }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): Partial<RootContainerState> {
    return { hasError: true }
  }

  componentDidMount(): void {}

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const errorEvent: CustomErrorEvent = {
      message: error.message,
      stack: errorInfo.componentStack,
    }
    this.handleOnError(errorEvent)
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.handleOnError)
  }

  handleOnError = (errorEvent?: ErrorEvent | CustomErrorEvent): void => {
    const { addAlert, onActionFailure, onStopFetching } = this.props
    
    onStopFetching() // just for sure...
    if (errorEvent && !config.ignoredErrorEventMessages.includes(errorEvent.message)) {
      onActionFailure(errorEvent)
      if (process.env.NODE_ENV === 'production' && config.showErrorAlert) {
        addAlert({ message: I18n.translate('alerts.onGlobalError') as string, type: 'warning' })
      }
    }
  }

  handleOnRedirect = (path: string): void => {
    this.props.setRedirectUrl(path)
  }

  handleOnReload = (): void => {
    window.location.reload()
  }

  handleOnCloseAlert = (index: number): void => {
    this.props.removeAlert(index)
  }

  handleToggleModal = (key: ModalKey, show?: boolean): void => {
    this.props.toggleModal(key, show)
  }

  render(): JSX.Element {
    const { handleOnCloseAlert, handleToggleModal } = this
    const { alerts, fetching, modals, redirectUrl } = this.props

    return <>
      <BrowserRouter basename={config.basename}>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route 
            path='*' 
            element={
              <h1 className='text-center text-primary mt-5'>
                404 <FontAwesomeIcon icon={faExclamationTriangle} color='orange' />
              </h1>
            } 
          />
        </Routes>
        {redirectUrl && <Navigate to={redirectUrl} />}
      </BrowserRouter>
      <Modals
        alerts={alerts}
        modals={modals}
        onCloseAlert={handleOnCloseAlert}
        onToggleModal={handleToggleModal}
      />
      <Loader active={fetching > 0} />
    </>
  }
}

const mapStateToProps = (state: State) => ({
  ...state.general,
  authorization: state.auth.authorization,
})

const mapDispatchToProps = {
  addAlert: generalActions.addAlert,
  onActionFailure: generalActions.onActionFailure,
  onStopFetching: generalActions.onStopFetching,
  removeAlert: generalActions.removeAlert,
  setRedirectUrl: generalActions.setRedirectUrl,
  toggleModal: generalActions.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
