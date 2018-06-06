import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import './index.css'
import reducer from './reducers'
import LinearSearch from './algorithms/LinearSearch'
import BinarySearch from './algorithms/BinarySearch'

const store = createStore(reducer, applyMiddleware(logger))
LinearSearch.register(store)
BinarySearch.register(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
