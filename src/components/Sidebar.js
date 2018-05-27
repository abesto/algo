import React from 'react'
import { Link } from 'react-router-dom'

import * as routes from '../constants/Routes'
import '../styles/Sidebar.css'

const Sidebar = () =>
  <nav className="Sidebar">
    <ul>
      <li className="logo"><Link to={routes.LANDING}>algo.abesto.net</Link></li>
      <li><Link to={routes.LINEAR_SEARCH}>Linear search</Link></li>
      <li><Link to={routes.BINARY_SEARCH}>Binary search</Link></li>
    </ul>
  </nav>

export default Sidebar