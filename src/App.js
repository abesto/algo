import React, { Component } from 'react'
import './App.css'
import BinarySearch from './containers/BinarySearch.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        Check out the source: <a href='https://github.com/abesto/algo/tree/2018'>https://github.com/abesto/algo/tree/2018</a>
        <BinarySearch />
      </div>
    )
  }
}

export default App
