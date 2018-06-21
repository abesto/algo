import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import VarStylesContext from '../VarStylesContext'

const Var = ({ name, highlight, clearHighlight }) => (
  <VarStylesContext.Consumer>
    {varStyles => (
      <span
        className={css(varStyles[name], styles.Var)}
        onMouseEnter={() => highlight(name)}
        onMouseLeave={() => clearHighlight(name)}
      >{name}</span>
    )}
  </VarStylesContext.Consumer>
)

const styles = StyleSheet.create({
  Var: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    cursor: 'zoom-in'
  }
})

export default Var
