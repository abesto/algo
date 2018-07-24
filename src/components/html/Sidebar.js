import React from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'

import algorithms from '../../algorithms'

const MyLink = ({to, children}) =>
  <Link className={css(styles.a)} to={to}>{children}</Link>

const Sidebar = () =>
  <nav className={css(styles.sidebar)}>
    <ul className={css(styles.ul)}>
      <li className={css(styles.logo)}><MyLink to='/'>algo.abesto.net</MyLink></li>
      {Object.values(algorithms).map(spec =>
        <li key={spec.name}><MyLink to={spec.route}>{spec.title}</MyLink></li>
      )}
    </ul>
  </nav>

const styles = StyleSheet.create({
  sidebar: {
    gridArea: 'nav',
    padding: '20px 30px 20px 20px',
    whiteSpace: 'nowrap',
    backgroundColor: '#fafafa',
    border: '1px solid #eaeaea'
  },
  ul: {
    listStyle: 'none',
    padding: 0
  },
  a: {
    textDecoration: 'none',
    color: 'black',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  logo: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontFamily: ['Inconsolata', 'monospace'],
    fontSize: '1.5em'
  }
})

export default Sidebar
