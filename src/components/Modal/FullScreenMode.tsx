import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { functions as utils } from 'js-utils'
import I18n from 'i18n-react'

interface FullScreenModeProps {
  className?: string;
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const FullScreenMode = (props: Readonly<FullScreenModeProps>): JSX.Element => {
  const handleOnClose = (): void => {
    props.onClose()
  }

  const handleOnConfirmFullScreen = (): void => {
    if (props.onConfirm) {
      props.onConfirm()
    }
    else {
      props.onClose()
      void utils.toggleFullScreen()
    }
  }

  const { className, show } = props
  return (
    <Modal className={className} isOpen={show} toggle={handleOnClose}>
        <ModalHeader>
          <FontAwesomeIcon icon={faExclamationTriangle} /> {I18n.translate('general.labels.warning')}
        </ModalHeader>
        <ModalBody>
          <Alert className='px-1 text-center mb-0' color='warning'>{I18n.translate('general.options.fullScreen')}</Alert>
        </ModalBody>
        <ModalFooter>
          <button
            className='btn btn-success btn-lg'
            type='button'
            onClick={handleOnConfirmFullScreen}
          >{I18n.translate('general.labels.yes')}</button>
          <button
            className='btn btn-danger btn-lg'
            type='button'
            onClick={handleOnClose}
          >{I18n.translate('general.labels.no')}</button>
        </ModalFooter>
      </Modal>
  )
}

export default FullScreenMode
