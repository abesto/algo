import React from 'react'

import Var from '../../containers/Var.js'
import Comment from './Comment.js'
import Step from './Step'

import '../../styles/Pseudocode.css'

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
    <code className='Pseudocode'>
      {lines.map(renderLine)}
    </code>
  )
}

export default Pseudocode