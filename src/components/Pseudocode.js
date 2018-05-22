import React from 'react'
import Var from '../containers/Var.js'
import Comment from './Comment.js'

import '../styles/Pseudocode.css'

const variableRegex = /{([a-zA-Z]+)}/

const Pseudocode = ({ children, Step }) => {
  const injectVars = (input) => (
    input.split(variableRegex).map((part, index) =>
      (
        index % 2 === 0
          ? part
          : <Var name={part} key={index} />
      )
    )
  )

  const renderLine = (line) => {
    const lineParts = line.split(':')
    const stepName = lineParts.shift().trim()
    const algoLine = lineParts.join(':')

    const commentParts = algoLine.split('//')
    let stepContents
    if (commentParts.length === 1) {
      stepContents = injectVars(algoLine)
    } else {
      stepContents = injectVars(commentParts.shift()).concat(
        <Comment>//{injectVars(commentParts.join('//'))}</Comment>
      )
    }

    return <Step name={stepName}>{stepContents}</Step>
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
