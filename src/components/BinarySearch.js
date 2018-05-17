import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import binarySearch from '../algorithms/binarySearch.js'
import Var from '../containers/Var.js'
import Inspector from '../containers/Inspector.js'
import Comment from './Comment.js'
import MkStep from './Step.js'

import '../styles/BinarySearch.css'

const BinarySearch = ({ numbers, target, algoState, startAlgorithm, stepAlgorithm }) => {
  var s
  if (algoState.hasOwnProperty('value')) {
    s = algoState.value
  } else {
    s = {low: null, mid: null, high: null, step: null}
  }
  const low = s.low
  const mid = s.mid
  const high = s.high
  const step = s.step

  const V = (name) => <Var value={s[name]}>{name}</Var>
  const Step = MkStep(step)
  const Low = V('low')
  const Mid = V('mid')
  const High = V('high')
  const N = <Var value={numbers.length}>N</Var>
  const Value = <Var value={target}>value</Var>
  const A = <Var value={numbers}>A</Var>
  return (
    <div className='binary-search'>
      Looking for: {target}
      <div className='numbers'>
        {numbers.map((n, i) =>
          <div className={classNames('number', {low: low === i, high: high === i, mid: mid === i})} key={i}>{n}</div>)
        }
      </div>
      <button onClick={() => startAlgorithm(binarySearch(numbers, target))}>Start</button>
      <button onClick={() => stepAlgorithm()}>Step</button>
      <div className='pseudocode'>
        {/*                       */}BinarySearch({A}[0..{N}-1], {Value}) {'{'}                                      {'\n'}
        {<Step name='init'>{/*    */}    {Low} = 0                                                                   {'\n'}
          {/*                     */}    {High} = {N} - 1                                                            {'\n'}</Step>}
        {<Step name='loop'>{/*    */}    while ({Low} &lt;= {High}) {'{'}                                            {'\n'}</Step>}
        {<Comment>{/*             */}        // invariants: {Value} &gt; {A}[i] for all i &lt; {Low}                 </Comment>} {'\n'}
        {<Comment>{/*             */}                       {Value} &lt; {A}[i] for all i &gt; {High}                </Comment>}{'\n'}
        {<Step name='mid'>{/*     */}        {Mid} = ({Low} + {High}) / 2                                            {'\n'}</Step>}
        {<Step name='branch'>{/*  */}        if ({A}[{Mid}] &gt; {Value})                                            {'\n'}</Step>}
        {<Step name='branch-0'>{/**/}            {High} = {Mid} - 1                                                  {'\n'}</Step>}
        {<Step name='branch'>{/*  */}        else if ({A}[{Mid}] &lt; {Value})                                       {'\n'}</Step>}
        {<Step name='branch-1'>{/**/}            {Low} = {Mid} + 1                                                   {'\n'}</Step>}
        {<Step name='branch'>{/*  */}        else                                                                    {'\n'}</Step>}
        {<Step name='done'>{/*    */}            return {Mid}                                                        {'\n'}</Step>}
        {<Step name='loop'>{/*    */}    {'}'}                                                                       {'\n'}</Step>}
        {/*                       */}    return not_found {<Comment>// {Value} would be inserted at index "{Low}"    {'\n'}</Comment>}
        {/*                       */}{'}'}
      </div>
      <Inspector />
    </div>
  )
  // TODO a component should not include a container; refactor
}

BinarySearch.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  target: PropTypes.number.isRequired,
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}

export default BinarySearch
