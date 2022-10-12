import React from 'react'
import ReactDOM from 'react-dom/client'

import createStore from './store/createStore'
import AppContainer from './Containers/AppContainer'

const __DEV__ = true

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const mountNode = document.getElementById('app')
const root = ReactDOM.createRoot(mountNode)
let render = () => {
  root.render(
    <React.StrictMode>
      <AppContainer store={store} />
    </React.StrictMode>
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    // window.devToolsExtension.open()
  }
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
