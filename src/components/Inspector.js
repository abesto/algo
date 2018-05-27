import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Var from '../containers/Var.js'

import '../styles/Inspector.css'

const Inspector = ({ name, variables }) => (
  <div className='Inspector'>
    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {variables.map((value, key) => (
          <tr className={classNames({highlighted: name === key})} key={key}>
            <td><Var name={key} /></td>
            <td>{JSON.stringify(value, null, 4)}</td>
          </tr>
        )).toArray()}
      </tbody>
    </table>
  </div>
)

Inspector.propTypes = {
  name: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired
}

export default Inspector