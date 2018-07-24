import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import reducer from './reducers'
import algorithms from './algorithms'

import './index.css'

const store = createStore(reducer, applyMiddleware(logger))
for (const spec of Object.values(algorithms)) {
  spec.implementation.register(store)
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
