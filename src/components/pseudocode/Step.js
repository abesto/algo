import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

const Step = ({ name, currentStepName, children }) => (
  <div className={css(name === currentStepName && styles.current)}>
    <div className={css(styles.placeholder)}>{children}</div>{children}{'\n'}</div>
)

const styles = StyleSheet.create({
  current: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'lightyellow'
  },
  placeholder: {
    // Reserve enough space so that the width doesn't change when a step is hovered
    display: 'block',
    fontWeight: 'bold',
    height: 0,
    overflow: 'hidden',
    visibility: 'hidden'
  }
})

export default Step
