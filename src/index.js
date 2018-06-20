import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import foreach from 'foreach'

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import reducer from './reducers'
import algorithmSpecs from './algorithmSpecs'

import './index.css'

const store = createStore(reducer, applyMiddleware(logger))
foreach(algorithmSpecs, (spec) => spec.algorithm.register(store))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
