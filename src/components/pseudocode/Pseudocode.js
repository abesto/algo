import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import Var from '../../containers/Var.js'
import Comment from './Comment.js'
import Step from './Step'

const variableRegex = /{([^}]+)}/

const Pseudocode = ({ children, algoState }) => {
  const injectVars = (input) => (
    input.split(variableRegex).map((part, index) =>
      (
        index % 2 === 0
          ? part
          : <Var name={part} key={index} />
      )
    )
  )

  const currentStepName = algoState.get('step')

  const renderLine = (line, lineNo) => {
    const lineParts = line.split(':')
    const stepName = lineParts.shift().trim()
    const algoLine = lineParts.join(':')

    const commentParts = algoLine.split('//')
    let stepContents
    if (commentParts.length === 1) {
      stepContents = injectVars(algoLine)
    } else {
      stepContents = injectVars(commentParts.shift()).concat(
        <Comment key='comment'>{'//'}{injectVars(commentParts.join('//'))}</Comment>
      )
    }

    return <Step name={stepName} currentStepName={currentStepName} key={lineNo}>{stepContents}</Step>
  }

  const input = React.Children.toArray(children)[0]
  const lines = input.trim().split('\n')
  return (
    <code className={css(styles.pseudocode)}>
      {lines.map(renderLine)}
    </code>
  )
}

const styles = StyleSheet.create({
  pseudocode: {
    display: 'block',
    whiteSpace: 'pre',
    fontFamily: ['Inconsolata', 'monospace'],
    color: '#222',
    backgroundColor: '#f3f3f3',
    padding: '15px',
    border: '1px dashed #f88',
    borderRadius: '5px'
  }
})

export default Pseudocode
