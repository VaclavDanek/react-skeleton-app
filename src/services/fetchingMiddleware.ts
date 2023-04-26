import { generalActions } from '../redux/generalRedux'

// types
import type { AnyAction, Dispatch } from 'redux'

const fetchingMiddleware = ({ dispatch }: { dispatch: Dispatch<AnyAction> }) => 
  (next: (arg0: AnyAction) => void) => (action: AnyAction & { type: string }): void => {
    if (action.type.indexOf('REQUEST_SUCCESS') !== -1 || action.type.indexOf('REQUEST_FAILURE') !== -1) {
	    dispatch(generalActions.onStopFetching())
    } else if (action.type.indexOf('REQUEST') !== -1 ) {
	    dispatch(generalActions.onStartFetching())
    }
    next(action)
  }

export default fetchingMiddleware
