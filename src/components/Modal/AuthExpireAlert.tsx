import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import I18n from 'i18n-react'

interface AuthExpireAlertProps {
  className?: string;
  show: boolean;
  onClose: () => void;
}

const AuthExpireAlert = (props: Readonly<AuthExpireAlertProps>): JSX.Element => {
  const handleOnClose = (): void => {
    props.onClose()
  }

  const { className, show } = props
  return (
    <Modal className={className} isOpen={show} toggle={handleOnClose}>
      <ModalHeader>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {I18n.translate('general.labels.warning')}
      </ModalHeader>
      <ModalBody>
        <Alert className='mb-0' color='info'>{I18n.translate('alerts.authExpire')}</Alert>
      </ModalBody>
      <ModalFooter>
        <button 
          className='btn btn-primary btn-lg' 
          onClick={handleOnClose} 
          type='button'
        >{I18n.translate('general.labels.close')}</button>
      </ModalFooter>
    </Modal>
  )
}

export default AuthExpireAlert
