import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../styles/App.css'
import Sidebar from './html/Sidebar'
import * as routes from '../constants/Routes'
import Landing from './html/Landing'
import { BINARY_SEARCH, LINEAR_SEARCH } from '../constants/AlgorithmNames'
import AlgorithmRoute from './AlgorithmRoute'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Sidebar />
        <main>
          <Route exact path={routes.LANDING} component={Landing} />
          <AlgorithmRoute name={LINEAR_SEARCH} />
          <AlgorithmRoute name={BINARY_SEARCH} />
        </main>
        <footer>
          Check out the source: <a href='https://github.com/abesto/algo/tree/2018'>https://github.com/abesto/algo/tree/2018</a>
        </footer>
      </div>
    )
  }
}

export default App
