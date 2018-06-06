import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import BinarySearch from '../algorithms/BinarySearch'
import LinearSearch from '../algorithms/LinearSearch'

import '../styles/App.css'
import Sidebar from './html/Sidebar'
import * as routes from '../constants/Routes'
import Landing from './html/Landing'
import Algorithm from '../containers/Algorithm'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Sidebar />
        <main>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route path={routes.LINEAR_SEARCH} render={() => <Algorithm algorithm={LinearSearch} />} />
          <Route path={routes.BINARY_SEARCH} render={() => <Algorithm algorithm={BinarySearch} />} />
        </main>
        <footer>
          Check out the source: <a href='https://github.com/abesto/algo/tree/2018'>https://github.com/abesto/algo/tree/2018</a>
        </footer>
      </div>
    )
  }
}

export default App
