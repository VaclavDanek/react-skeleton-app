import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { withReducers, withRouter } from '../utils'

// redux
import { userRedux } from '../redux'

// types
import type { RefObject, ElementType } from 'react'
import type { ScrollIntoViewOptions } from '../types'
import type { RouterProps } from '../utils/withRouter'
import type { StaticState, AsyncReducers, AsyncState } from '../store/reducers'

type HomePageProps = Readonly<ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouterProps & {
  scrollToElement: (element: RefObject<any> | string, options?: ScrollIntoViewOptions) => void;
}>

interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
  state: HomePageState = {}

  render(): JSX.Element {
    return (
      <div className='mt-5'>
        <h1 className='text-center text-primary'><FontAwesomeIcon icon={faDoorOpen} /> Hello World!</h1>
      </div>
    )
  }
}

const asyncReducers = { 
  user: userRedux.userReducer,
} satisfies Partial<AsyncReducers>

const mapStateToProps = (state: StaticState & AsyncState<typeof asyncReducers>) => ({
  user: state.user,
})

const mapDispatchToProps = {
  setUserDataValue: userRedux.userActions.setUserDataValue,
  setUserData: userRedux.userActions.setUserData,
}

export default compose<ElementType>(
  withRouter,
  withReducers(asyncReducers),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage)
