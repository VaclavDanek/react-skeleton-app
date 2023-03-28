import { useEffect } from 'react'
import { useStore } from 'react-redux'

// types
import type { ComponentClass } from 'react'
import type { IStore } from '../store/createStore'
import type { ReducersType } from '../store/reducers'
import type { ObjectType } from '../types'

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-module-boundary-types
const withReducers = (reducers: ReducersType) => (Component: ComponentClass<any, any>) => {
  const WrapperComponent = (props: ObjectType): JSX.Element => {
    const store = useStore() as IStore

    useEffect(() => {
      store.injectReducers(reducers)
    }, [store])

    return (
      <Component {...props} />
    )
  }
  return WrapperComponent
}

export const ComponentWithReducers = (props: { reducers: ReducersType; children: JSX.Element }): JSX.Element => {
  const store = useStore() as IStore
  store.injectReducers(props.reducers)
  return props.children
}

export default withReducers