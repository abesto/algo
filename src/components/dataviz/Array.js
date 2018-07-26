import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { StyleSheet, css } from 'aphrodite/no-important'

import VarStylesContext from '../../VarStylesContext'

const variablesToClassname = (currentIndex, variables) =>
  variables.filter((value) => value === currentIndex).keySeq().sort().join()

const Array = ({ variables, changeGlobals }) => {
  return (
    <VarStylesContext.Consumer>
      {varStyles => (
        <div className={css(styles.array)}>
          {
            variables.get('A').map((item, index) =>
              <div className={css(styles.item, varStyles[variablesToClassname(index, variables)])} key={index}>
                {item}
                <div className={css(styles.itemDelete)} onClick={() => changeGlobals({A: variables.get('A').remove(index)})} />
              </div>
            )
          }
        </div>
      )}
    </VarStylesContext.Consumer>
  )
}

Array.propTypes = {
  variables: PropTypes.instanceOf(Map).isRequired,
  changeGlobals: PropTypes.func.isRequired,
  varStyles: PropTypes.object
}

const styles = StyleSheet.create({
  array: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  item: {
    position: 'relative',
    fontFamily: ['Inconsolata', 'monospace'],
    padding: '5px',
    border: '1px solid black',
    margin: '5px',
    maxHeight: '22px'
  },
  itemDelete: {
    padding: 0,
    backgroundColor: 'red',
    cursor: 'pointer',
    width: '7px',
    height: '7px',
    right: '0',
    top: '0',
    position: 'absolute'
  }
})

export default Array
