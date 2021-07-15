// @flow
import React from 'react'
import I18n from 'i18n-react'

// components
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import UpdateAlert from './UpdateAlert.jsx'
import AuthExpireAlert from './AuthExpireAlert.jsx'

// types
import type {
  ValueObject,
  Alert as AlertType
} from '../Types/ValuesType'

// custom variables & functions
import { toggleFullScreen } from '../Utils/Functions'

type ModalsProps = {
  alerts?: Array<AlertType>,
  className?: string,
  data: ValueObject,
  modals?: { [key: string]: boolean },
  onCloseAlert: (number) => void,
  onToggleModal: (string) => void,
}

type ModalsState = {}

export default class Modals extends React.Component<ModalsProps, ModalsState> {
  static defaultProps = {
    alerts: [],
    modals: {},
  }

  handleToggleModal = (modalKey: string): void => {
    this.props.onToggleModal(modalKey)
  }

  handleOnCloseModal = (event: SyntheticEvent<HTMLDivElement>): void => {
    const target = event.currentTarget
    const modal = target.closest('.modal-dialog') || target.firstChild
    const key = modal.getAttribute('data-key').split('-')
    this.handleToggleModal(key[1])
  }

  handleOnCloseAlert = (index: number): void => {
    this.props.onCloseAlert(index)
  }

  render() {
    const { alerts, data, modals } = this.props
    const { updateAlert } = data

    return [
      <Modal key='modal-fullScreen' data-key='modal-fullScreen' isOpen={modals.fullScreen} toggle={this.handleOnCloseModal}>
        <ModalHeader toggle={this.handleOnCloseModal}>
          <i aria-hidden='true' className='fa fa-exclamation-triangle fa-2x' /> {I18n.translate('general.labels.warning')}
        </ModalHeader>
        <ModalBody>
          <div className='row'>
            <div className='col-12'>
              <Alert className='px-1 text-center' color='warning'>{I18n.translate('general.options.fullScreen')}</Alert>
              <div className='row'>
                <div className='col-6 pr-0'>
                  <button
                    className='btn btn-primary btn-lg btn-block'
                    onClick={() => {
                      this.handleToggleModal('fullScreen')
                      toggleFullScreen()
                    }}
                    type='button'
                  >{I18n.translate('general.labels.yes')}</button>
                </div>
                <div className='col-6'>
                  <button
                    className='btn btn-primary btn-lg btn-block'
                    onClick={this.handleOnCloseModal}
                    type='button'
                  >{I18n.translate('general.labels.no')}</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>,
      <UpdateAlert
        key='modal-alert-update'
        className={updateAlert.className}
        onClose={updateAlert.onClose}
        show={modals.updateAlert}
      />,
      <AuthExpireAlert
        key='modal-alert-authExpire'
        onClose={() => { this.handleToggleModal('authExpireAlert') }}
        show={modals.authExpireAlert}
      />,
      alerts.map((alert, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Modal key={`modal-alert-${index}`} isOpen toggle={() => { this.handleOnCloseAlert(index) }}>
          <ModalHeader toggle={() => { this.handleOnCloseAlert(index) }}>
            <i aria-hidden='true' className='fa fa-exclamation-triangle fa-2x' /> {I18n.translate('general.labels.warning')}
          </ModalHeader>
          <ModalBody>
            <div className='row'>
              <div className='col-12'>
                <Alert color={alert.type}>{alert.message}</Alert>
                <button
                  className='btn btn-primary btn-lg btn-block'
                  onClick={() => { this.handleOnCloseAlert(index) }}
                  type='button'
                >{I18n.translate('general.labels.close')}</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )),
    ]
  }
}
