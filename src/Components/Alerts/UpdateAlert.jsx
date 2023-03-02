// @flow
import React from 'react'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import I18n from 'i18n-react'

type UpdateAlertProps = {|
  className?: string,
  show: boolean,
  onClose: () => void,
|}

const UpdateAlert = (props: UpdateAlertProps): React.Node => {
  const handleOnClose = (): void => {
    props.onClose()
  }

  const { className, show } = props
  return (
    <Modal className={className} isOpen={show} toggle={handleOnClose}>
      <ModalHeader>
        <i aria-hidden='true' className='fa fa-exclamation-triangle fa-2x' /> {I18n.translate('general.labels.warning')}
      </ModalHeader>
      <ModalBody>
        <div className='row'>
          <div className='col-12'>
            <Alert color='info'>{I18n.translate('alerts.update')}</Alert>
            <button className='btn btn-primary btn-lg btn-block' onClick={handleOnClose} type='button'>
              {I18n.translate('general.labels.reloadNewVersion')}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default UpdateAlert
