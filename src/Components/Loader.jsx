// @flow
import React from 'react'
import { Loader as LoaderLib } from 'react-loaders'

// styles
import 'loaders.css/src/animations/ball-pulse-sync.scss'
// import 'loaders.css/src/animations/ball-pulse.scss'
// import 'loaders.css/src/animations/ball-scale-multiple.scss'
// import 'loaders.css/src/animations/line-scale.scss'

type LoaderProps = {
  active: boolean,
  className?: string,
  color?: string,
  innerClassName?: string,
  type?: string,
}

const defaultProps = {
  className: 'react-loader position-fixed d-flex align-items-center justify-content-center h-100 w-100',
  color: '#1B5C85',
  type: 'ball-pulse-sync',
}

const Loader = (props: LoaderProps): React.Node => {
  const { active, className, color, innerClassName, type } = {...defaultProps, ...props}
  if (!active) {
    return null
  }

  return (
    <div className={className}>
      <LoaderLib
        active
        color={color}
        innerClassName={innerClassName}
        type={type}
      />
    </div>
  )
}

export default Loader
