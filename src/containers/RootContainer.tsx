import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import I18n from 'i18n-react'

import { ReducersEnum } from '../store/reducers'
import { ComponentWithReducers } from '../utils'
import * as config from '../config'

// redux
import { GeneralActions } from '../redux/generalRedux'
import UserDataReduxReducer from '../redux/userDataRedux'

// pages
import { HomePage } from '../pages'

// components
import { Loader, Modals } from '../components'

// translations
import csLanguage from '../translations/cs.json'

// styles
import 'bootstrap/scss/bootstrap.scss'
import '../styles/root.scss'
import '../styles/mobile.scss'

// types
import type { RefObject } from 'react'
import type { ImmutableArray } from 'seamless-immutable'
import type { IGlobalState } from '../store/reducers'
import type { IAlert, IScrollIntoViewOptions, ModalsType } from '../types'
import type { IError, ICustomErrorEvent, ErrorTypesEnum, IAxiosError } from '../types/errorTypes'
import type { ModalType } from '../components/Modals'

interface IStateProps {
  modals: ModalsType;
  alerts: ImmutableArray<IAlert>;
  errors: ImmutableArray<IError | IAxiosError>;
  fetching: number;
  redirectUrl: string;
}

interface IDispatchProps {
  addAlert: (alert: IAlert) => void;
  onActionFailure: (errorEvent: ErrorEvent | ICustomErrorEvent, errorType?: ErrorTypesEnum) => void;
  onStopFetching: () => void;
  removeAlert: (index: number) => void;
  setRedirectUrl: (url: string) => void;
  toggleModal: (key: ModalType, show?: boolean) => void;
}

interface IRootContainerProps extends IStateProps, IDispatchProps {}
interface IRootContainerState {
  hasError?: boolean;
}

class RootContainer extends Component<Readonly<IRootContainerProps>, IRootContainerState> {
  constructor(props: Readonly<IRootContainerProps>) {
    super(props)
    this.state = {}

    switch (navigator.language) {
      case 'cs':
      default:
        I18n.setTexts(csLanguage)
        break
    }

    window.addEventListener('error', this.handleOnError)
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<IRootContainerProps>, 
    prevState: IRootContainerState,
  ): Partial<IRootContainerState> | null {
    const { redirectUrl, setRedirectUrl } = nextProps
    if (redirectUrl) { // reset after every redirect
      setRedirectUrl('')
    }
    return null
  }

  static getDerivedStateFromError(error: Error): Partial<IRootContainerState> {
    return { hasError: true }
  }

  componentDidMount(): void {}

  componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void {
    const errorEvent: ICustomErrorEvent = {
      message: error.message,
      stack: errorInfo.componentStack,
    }
    this.handleOnError(errorEvent)
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.handleOnError)
  }

  handleOnError = (errorEvent?: ErrorEvent | ICustomErrorEvent): void => {
    const { addAlert, onActionFailure, onStopFetching } = this.props
    if (errorEvent) {
      if (!config.ignoredErrorEventMessages.includes(errorEvent.message)) {
        onStopFetching()
        onActionFailure(errorEvent)
        if (process.env.NODE_ENV === 'production' && config.showErrorAlert) {
          addAlert({ message: I18n.translate('alerts.onGlobalError') as string, type: 'warning' })
        }
      }
    }
    else {
      onStopFetching() // just for sure...
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

  handleToggleModal = (key: ModalType, show?: boolean): void => {
    this.props.toggleModal(key, show)
  }

  handleScrollToElement = (element: RefObject<any> | string, options: IScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'start',
  }): void => {
    if (typeof element === 'string') { // take ref from this class
      if (!this[element]) {
        return
      }
      element = this[element] as RefObject<any>
    }
    element.current.scrollIntoView(options)
  }

  render(): JSX.Element {
    const { handleOnCloseAlert, handleScrollToElement, handleToggleModal } = this
    const { alerts, fetching, modals, redirectUrl } = this.props
    
    return <>
      <div>
        <BrowserRouter basename={config.basename}>
          <Routes>
            <Route
              path='/'
              element={
                <ComponentWithReducers reducers={{ [ReducersEnum.userData]: UserDataReduxReducer }}>
                  <HomePage scrollToElement={handleScrollToElement} />
                </ComponentWithReducers>
              }
            />
          </Routes>
          {redirectUrl && <Navigate to={redirectUrl} />}
        </BrowserRouter>
      </div>
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

const mapStateToProps = (state: IGlobalState): IStateProps => ({
  ...state[ReducersEnum.general],
})

const mapDispatchToProps: IDispatchProps = {
  addAlert: GeneralActions.addAlert,
  onActionFailure: GeneralActions.onActionFailure,
  onStopFetching: GeneralActions.onStopFetching,
  removeAlert: GeneralActions.removeAlert,
  setRedirectUrl: GeneralActions.setRedirectUrl,
  toggleModal: GeneralActions.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
