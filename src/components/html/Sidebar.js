import React from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'

import * as Routes from '../../constants/Routes'

const MyLink = ({to, children}) =>
  <Link className={css(styles.a)} to={to}>{children}</Link>

const Sidebar = () =>
  <nav className={css(styles.sidebar)}>
    <ul className={css(styles.ul)}>
      <li className={css(styles.logo)}><MyLink to={Routes.LANDING}>algo.abesto.net</MyLink></li>
      <li><MyLink to={Routes.LINEAR_SEARCH}>Linear search</MyLink></li>
      <li><MyLink to={Routes.BINARY_SEARCH}>Binary search</MyLink></li>
      <li><MyLink to={Routes.BOGO_SORT}>Bogosort</MyLink></li>
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
