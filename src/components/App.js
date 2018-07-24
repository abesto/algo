import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'

import Sidebar from './html/Sidebar'
import Landing from './html/Landing'
import AlgorithmRoute from './AlgorithmRoute'
import algorithms from '../algorithms'
import LinkedList from './dataviz/LinkedList'

class App extends Component {
  render () {
    return (
      <div className={css(styles.app)}>
        <Sidebar />
        <main className={css(styles.main)}>
          <Route exact path='/' component={Landing} />
          {Object.values(algorithms).map((spec, id) => <AlgorithmRoute spec={spec} key={id} />)}
          <Route exact path='/playground' render={() => <LinkedList items={[10, 15, 1, 42, 3000, 90]} />} />
        </main>
        <footer className={css(styles.footer)}>
          Check out the source: <a href='https://github.com/abesto/algo/tree/2018'>https://github.com/abesto/algo/tree/2018</a>
        </footer>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    display: 'grid',
    gridTemplate:
      `"nav   main" 1fr
       "nav footer" min-content
       / min-content 1fr`,
    height: '100vh'
  },
  main: {
    gridArea: 'main',
    padding: '25px'
  },
  footer: {
    gridArea: 'footer',
    padding: '15px',
    textAlign: 'right'
  }
})

export default App
