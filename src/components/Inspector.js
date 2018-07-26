import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'

import Var from '../containers/Var.js'

const Inspector = ({ name, variables }) => (
  <table className={css(styles.table)}>
    <thead>
      <tr>
        <th className={css(styles.th)}>Variable</th>
        <th className={css(styles.th)}>Value</th>
      </tr>
    </thead>
    <tbody>
      {variables.map((value, key) => (
        <tr className={css(name === key && styles.highlighted)} key={key}>
          <td className={css(styles.td, styles.name)}>
            <Var name={key} />:
          </td>
          <td className={css(styles.td, styles.value)}>
            {JSON.stringify(value, null, 4)}
          </td>
        </tr>
      )).toArray()}
    </tbody>
  </table>
)

Inspector.propTypes = {
  name: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  table: {
    borderCollapse: 'collapse'
  },
  highlighted: {
    backgroundColor: '#eee'
  },
  th: {
    backgroundColor: '#ddd',
    border: '2px solid black',
    padding: '5px'
  },
  td: {
    fontFamily: ['Inconsolata', 'monospace'],
    border: '1px solid silver',
    padding: '3px'
  },
  name: {
    textAlign: 'right',
    borderRight: 'none'
  },
  value: {
    borderLeft: 'none'
  }
})

export default Inspector
