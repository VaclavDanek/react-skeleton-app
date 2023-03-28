import { default as LoaderLib } from 'react-loaders'

// styles
import 'loaders.css/src/animations/ball-pulse-sync.scss'
// import 'loaders.css/src/animations/ball-pulse.scss'
// import 'loaders.css/src/animations/ball-scale-multiple.scss'
// import 'loaders.css/src/animations/line-scale.scss'

// types
import type { LoaderType } from 'react-loaders';

interface ILoaderProps {
  className?: string;
  innerClassName?: string;
  active: boolean;
  type?: LoaderType;
  color?: string;
}

const Loader = (props: Readonly<ILoaderProps>): JSX.Element | null => {
  const { 
    className = 'react-loader position-fixed d-flex align-items-center justify-content-center h-100 w-100', 
    type = 'ball-pulse-sync', 
    color = '#1B5C85',
    active, 
    innerClassName,
  } = props

  return !active ? null : (
    <div className={className}>
      <LoaderLib
        active
        innerClassName={innerClassName}
        type={type}
      />
    </div>
  )
}

export default Loader
