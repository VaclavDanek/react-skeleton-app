import GeneralActions from '../Redux/GeneralRedux'

const FetchingMiddleware = ({ dispatch }) => next => (action) => {
	if (action.type.indexOf('REQUEST_SUCCESS') !== -1 || action.type.indexOf('REQUEST_FAILURE') !== -1) {
		dispatch(GeneralActions.onStopFetching())
	} else if (action.type.indexOf('REQUEST') !== -1 ) {
		dispatch(GeneralActions.onStartFetching())
	}
	next(action)
}

export default FetchingMiddleware
