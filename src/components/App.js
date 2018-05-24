import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../styles/App.css'
import BinarySearch from '../containers/BinarySearch'
import Sidebar from './Sidebar'
import * as routes from '../constants/routes'
import Landing from './Landing'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Sidebar />
        <main>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route path={routes.BINARY_SEARCH} component={BinarySearch} />
        </main>
        <footer>
          Check out the source: <a href='https://github.com/abesto/algo/tree/2018'>https://github.com/abesto/algo/tree/2018</a>
        </footer>
      </div>
    )
  }
}

export default App
