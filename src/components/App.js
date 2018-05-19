import React, { Component } from 'react'
import '../styles/App.css'
import BinarySearch from '../containers/BinarySearch.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <BinarySearch />
        Check out the source: <a href='https://github.com/abesto/algo/tree/2018'>https://github.com/abesto/algo/tree/2018</a>
      </div>
    )
  }
}

export default App
