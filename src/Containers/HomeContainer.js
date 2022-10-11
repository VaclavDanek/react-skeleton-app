// @flow
import React from 'react'
import { connect } from 'react-redux'
import I18n from 'i18n-react'
import classNames from 'classnames'

// types
import type { GlobalState } from '../store/reducers'
import type { ValueObject } from '../Types/ValuesType'

// components

// redux
import GeneralActions from '../Redux/GeneralRedux'
import AuthActions from '../Redux/AuthRedux'

type ParentProps = {
  isMobile: boolean,
  scrollToElement: (HTMLElement | string) => void,
}

type StateProps = {
  userData: ValueObject,
}

type DispatchProps = {
  addAlert: () => void,
}

type HomeProps = ParentProps & StateProps & DispatchProps
type HomeState = {}

class HomeScreen extends React.Component<HomeProps, HomeState> {
  state = {}

  render() {
    return null
  }
}

const mapStateToProps = (state: GlobalState) => ({
  userData: state.userData,
})

/* eslint-disable import/no-named-as-default-member */
const mapDispatchToProps = {
}
/* eslint-enable import/no-named-as-default-member */

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
