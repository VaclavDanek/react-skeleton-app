// @flow
import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

// types
import type { ValueObject } from '../Types/ValuesType'

export type Router = {|
  location: Location,
  pathParams: PathParams,
  searchParams: SearchParams,
  setSearchParams: (ValueObject, { replace: boolean }) => void,
|}

export type Location = {
  pathname: string,
  state: Data,
  search: string,
  hash: string,
  key: string,
}

export type PathParams = { [name: string]: string }

export type SearchParams = { [name: string]: string | Function }

const withRouter = (Component: React.Component<ValueObject>): React.Node => {
  const ComponentWithRouterProps = (props: ValueObject): React.Node => {
    const location = useLocation();
    const pathParams = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
      <Component
        {...props}
        router={{ location, pathParams, searchParams, setSearchParams }}
      />
    )
  }
  return ComponentWithRouterProps
}

export default withRouter
