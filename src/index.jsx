import ReactDOM from 'react-dom/client'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

const __DEV__ = true

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const mountNode = document.getElementById('app')
const root = ReactDOM.createRoot(mountNode)
let render = () => {
  root.render(
    // temporarily without the strict mode because otherwise, reactstrap package causes "findDOMNode" warning
    // <React.StrictMode>
      <AppContainer store={store} />
    // </React.StrictMode>
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  // Development render functions
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default
    root.render(<RedBox error={error} />)
  }

  // Wrap render in try/catch
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
}

// ========================================================
// Go!
// ========================================================
render()
