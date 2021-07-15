// @flow
import React from 'react'
import classNames from 'classnames'
import { Loader as LoaderLib } from 'react-loaders'

// styles
// import 'loaders.css/src/animations/line-scale.scss'
import 'loaders.css/src/animations/ball-pulse.scss'

type LoaderProps = {
  active: boolean,
  cover?: boolean,
  fullScreen?: boolean,
  small?: boolean,
  type: string,
}

export default class Loader extends React.Component<LoaderProps> {
  static defaultProps = {
    cover: false,
    fullScreen: false,
    small: false,
    type: 'ball-pulse',
    // type: 'line-scale',
    // type: 'ball-clip-rotate',
  }

  render() {
    const { active, cover, fullScreen, small, type } = this.props
    if (!active) {
      return null
    }

    return (
      <div className='react-loader position-fixed d-flex align-items-center justify-content-center h-100 w-100' style={{ top: 0 }}>
        <div className='loader'>
          <LoaderLib
            active
            color='#1B5C85'
            type={type}
          />
        </div>
      </div>
    )
  }
}
