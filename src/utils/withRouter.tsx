import { useLocation, useParams, useSearchParams } from 'react-router-dom'

// types
import type { ComponentClass } from 'react'
import type { NavigateOptions, URLSearchParamsInit } from 'react-router-dom'
import type { ObjectType } from '../types'

export interface IRouter {
  location: ILocation;
  pathParams: Record<string, string | undefined>;
  searchParams: URLSearchParams;
  setSearchParams: (nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit), navigateOpts?: NavigateOptions) => void;
}

export interface ILocation {
  pathname: string;
  state: any;
  search: string;
  hash: string;
  key: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-module-boundary-types
const withRouter = (Component: ComponentClass<any, any>) => {
  const ComponentWithRouterProps = (props: ObjectType): JSX.Element => {
    const location = useLocation()
    const pathParams = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const router: IRouter = { location, pathParams, searchParams, setSearchParams }
    return (
      <Component
        {...props}
        router={router}
      />
    )
  }
  return ComponentWithRouterProps
}

export default withRouter
