// @flow
import React from 'react'
import { connect } from 'react-redux'
import I18n from 'i18n-react'
import classNames from 'classnames'

// utils
import { withRouter } from '../Utils'

// redux

// types
import type { GlobalState } from '../store/reducers'
import type { ValueObject } from '../Types/ValuesType'
import type { Router } from '../Utils/withRouter'

type ParentProps = {
  scrollToElement: (HTMLElement | string) => void,
}

type StateProps = {
  router: Router,
  userData: ValueObject,
}

type DispatchProps = {
}

type HomeProps = ParentProps & StateProps & DispatchProps
type HomeState = {}

class HomeScreen extends React.Component<HomeProps, HomeState> {
  state = {}

  render() {
    return (
      <div className='mt-5'>
        <h1 className='text-center'><i className='fa fa-info' aria-hidden='true'></i> Hello World!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  userData: state.userData,
})

/* eslint-disable import/no-named-as-default-member */
const mapDispatchToProps = {
}
/* eslint-enable import/no-named-as-default-member */

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeScreen))
