import { Component } from 'react'
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import I18n from 'i18n-react'

// components
import { AuthExpireAlert, UpdateAlert, FullScreenMode } from './Modal'

// types
import type { ImmutableArray } from 'seamless-immutable'
import type { ObjectType, IAlert, ModalsType } from '../types'

export type ModalType = 'authExpireAlert' | 'updateAlert' | 'fullScreenMode'

interface IModalsProps {
  alerts?: ImmutableArray<IAlert>;
  modals?: ModalsType;
  modalProps?: Partial<Record<ModalType, ObjectType>>;
  onCloseAlert?: (index: number) => void;
  onToggleModal?: (modalKey: ModalType) => void;
}

export default class Modals extends Component<Readonly<IModalsProps>> {
  handleToggleModal = (modalKey: ModalType): void => {
    this.props.onToggleModal?.(modalKey)
  }

  handleOnCloseAlert = (index: number): void => {
    this.props.onCloseAlert?.(index)
  }

  render(): JSX.Element {
    const { alerts = [], modals = {}, modalProps = {} } = this.props
    return <>
      <FullScreenMode
        show={!!modals.fullScreenMode}
        onClose={() => { this.handleToggleModal('fullScreenMode') }}
        {...modalProps.fullScreenMode}
      />
      <UpdateAlert
        show={!!modals.updateAlert}
        onClose={() => { window.location.reload() }}
        {...modalProps.updateAlert}
      />
      <AuthExpireAlert
        show={!!modals.authExpireAlert}
        onClose={() => { this.handleToggleModal('authExpireAlert') }}
        {...modalProps.authExpireAlert}
      />
      <>
        {alerts.map((alert: IAlert, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Modal key={`modal-alert-${index}`} isOpen toggle={() => { this.handleOnCloseAlert(index) }}>
            <ModalHeader>
              <FontAwesomeIcon icon={faInfo} /> {I18n.translate('general.labels.warning')}
            </ModalHeader>
            <ModalBody>
              <Alert className='mb-0' color={alert.type}>{alert.message}</Alert>
            </ModalBody>
            <ModalFooter>
              <button
                className='btn btn-primary btn-lg'
                onClick={() => { this.handleOnCloseAlert(index) }}
                type='button'
              >{I18n.translate('general.labels.close')}</button>
            </ModalFooter>
          </Modal>
        ))}
      </>
    </>
  }
}
