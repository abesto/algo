import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'

import Pseudocode from './pseudocode/Pseudocode'
import Inspector from '../containers/Inspector'
import VarStylesContext from '../VarStylesContext'

export default function Algorithm
({algoState, Description, Controls, Dataviz, code, startAlgorithm, stepAlgorithm, changeGlobals,
  varStyles
}) {
  const variables = algoState.get('variables')
  const controlsProps = {variables, startAlgorithm, stepAlgorithm, changeGlobals}
  const datavizProps = {variables, changeGlobals}
  return (
    <div className={css(styles.algorithm)}>
      <VarStylesContext.Provider value={varStyles}>
        <div className={css(styles.description)}>
          {Description}
        </div>

        <div className={css(styles.controls)}>
          <Controls {...controlsProps} />
        </div>

        <Dataviz {...datavizProps} />
        <Pseudocode algoState={algoState}>{code}</Pseudocode>

        <div className={css(styles.inspector)}>
          <Inspector variables={variables} />
        </div>
      </VarStylesContext.Provider>
    </div>
  )
}

Algorithm.propTypes = {
  algoState: PropTypes.object.isRequired,
  Description: PropTypes.node.isRequired,
  Controls: PropTypes.func.isRequired,
  Dataviz: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired,
  changeGlobals: PropTypes.func.isRequired,
  varStyles: PropTypes.object
}

const styles = StyleSheet.create({
  algorithm: {
    display: 'grid',
    gridTemplate: `
            "desc         desc        desc     " auto
            "controls     dataviz     inspector" auto
            "controls     pseudocode  inspector" auto
            / min-content min-content 1fr`,
    gridGap: '20px'
  },
  description: {
    gridArea: 'desc'
  },
  inspector: {
    gridArea: 'inspector'
  },
  pseudocode: {
    gridArea: 'pseudocode'
  },
  controls: {
    padding: '15px',
    border: '1px solid silver',
    backgroundColor: '#f5f5f5',
    gridArea: 'controls'
  },
  dataviz: {
    gridArea: 'dataviz'
  }
})
