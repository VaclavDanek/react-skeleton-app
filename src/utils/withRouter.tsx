import { useLocation, useParams, useSearchParams } from 'react-router-dom'

// types
import type { ComponentType, FunctionComponent } from 'react'
import type { NavigateOptions, URLSearchParamsInit } from 'react-router-dom'
import type { Location } from '@remix-run/router'

interface Router {
  location: Location;
  pathParams: Record<string, string | undefined>;
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit), 
    navigateOpts?: NavigateOptions,
  ) => void;
}

export interface RouterProps {
  router: Router;
}

type WithoutRouterProps<P> = Omit<P, keyof RouterProps>

// eslint-disable-next-line @typescript-eslint/naming-convention
const withRouter = <P extends RouterProps>(Component: ComponentType<P>): FunctionComponent<WithoutRouterProps<P>> => (
  (props: WithoutRouterProps<P>): JSX.Element => {
    const location = useLocation()
    const pathParams = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const router: Router = { location, pathParams, searchParams, setSearchParams }
    return <Component {...props as P} router={router} />
  }
)

export default withRouter