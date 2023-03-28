import { Component } from 'react'
import { connect } from 'react-redux'
import { ReducersEnum } from '../store/reducers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from 'react-device-detect'
import classNames from 'classnames'

// redux
import type { UserDataState } from '../redux/userDataRedux'

// utils
import { withRouter } from '../utils'

// types
import type { RefObject } from 'react'
import type { IGlobalState } from '../store/reducers'
import type { IScrollIntoViewOptions, ObjectType } from '../types'
import type { IRouter } from '../utils/withRouter'

interface IStateProps {
  userData: ObjectType;
}

interface IDispatchProps {}

interface IHomePageProps extends IStateProps, IDispatchProps {
  router: IRouter;
  scrollToElement: (element: RefObject<any> | string, options?: IScrollIntoViewOptions) => void;
}
interface IHomePageState {}

class HomePage extends Component<Readonly<IHomePageProps>, IHomePageState> {
  state: IHomePageState = {}

  render(): JSX.Element {
    return (
      <div className='mt-5'>
        <h1 className='text-center text-primary'><FontAwesomeIcon icon={faDoorOpen} /> Hello World!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state: IGlobalState & {
  [ReducersEnum.userData]: UserDataState;
}): IStateProps => ({
  userData: state[ReducersEnum.userData].data,
})

const mapDispatchToProps: IDispatchProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage))
