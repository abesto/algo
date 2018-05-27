import React from 'react'
import { Link } from 'react-router-dom'

import * as Routes from '../constants/Routes'
import '../styles/Sidebar.css'

const Sidebar = () =>
  <nav className="Sidebar">
    <ul>
      <li className="logo"><Link to={Routes.LANDING}>algo.abesto.net</Link></li>
      <li><Link to={Routes.LINEAR_SEARCH}>Linear search</Link></li>
      <li><Link to={Routes.BINARY_SEARCH}>Binary search</Link></li>
    </ul>
  </nav>

export default Sidebar