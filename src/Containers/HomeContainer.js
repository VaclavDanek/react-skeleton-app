// @flow
import React from 'react'
import { connect } from 'react-redux'
import I18n from 'i18n-react'
import classNames from 'classnames'

// components

// redux
import UserDataActions from '../Redux/UserDataRedux'

// types
import type { GlobalState } from '../store/reducers'
import type { ValueObject } from '../Types/ValuesType'

// custom variables & functions

type ParentProps = {
  isMobile: boolean,
  scrollToElement: (HTMLElement | string) => void,
}

type StateProps = {
  userData: ValueObject,
}

type DispatchProps = {}

type HomeProps = ParentProps & StateProps & DispatchProps
type HomeState = {}

class HomeScreen extends React.Component<HomeProps, HomeState> {
  state = {}

  render() {
    return (
      <div id='content'>
        <h1 className='text-center'><i aria-hidden='true' className='fa fa-info' /> React skeleton app</h1>
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalState) => ({
  userData: state.userData,
})

/* eslint-disable import/no-named-as-default-member */
const mapDispatchToProps = {}
/* eslint-enable import/no-named-as-default-member */

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
