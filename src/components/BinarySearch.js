// libs
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// React components, containers
import Var from '../containers/Var.js'
import Inspector from '../containers/Inspector.js'
import Comment from './Comment.js'
import MkStep from './Step.js'
import Pseudocode from './Pseudocode.js'

// Binary search specifics
import binarySearch from '../algorithms/binarySearch.js'
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
  // TODO get contents from rosetta code dynamically, if possible
  // TODO properly format blockquote. get some lightweight CSS lib?
  return (
    <div className='BinarySearch'>
      <div className='description'>
        <h2>Binary search</h2>
        <blockquote cite='https://rosettacode.org/wiki/Binary_search'>
          <p>A binary search divides a range of values into halves, and continues to narrow down the field of search until the unknown value is found. It is the classic example of a "divide and conquer" algorithm.</p>
          <p>As an analogy, consider the children's game "guess a number." The scorer has a secret number, and will only tell the player if their guessed number is higher than, lower than, or equal to the secret number. The player then uses this information to guess a new number.</p>
          <p>As the player, an optimal strategy for the general case is to start by choosing the range's midpoint as the guess, and then asking whether the guess was higher, lower, or equal to the secret number. If the guess was too high, one would select the point exactly between the range midpoint and the beginning of the range. If the original guess was too low, one would ask about the point exactly between the range midpoint and the end of the range. This process repeats until one has reached the secret number.</p>
        </blockquote>
        <p>This algorithm can be implemented both recursively and iteratively. This page showcases the iterative approach.</p>
      </div>
      <div className='controls'>
        <h3>Controls</h3>
        Looking for: {target}
        <button onClick={() => startAlgorithm(binarySearch(numbers, target))}>Start</button>
        <button onClick={() => stepAlgorithm()}>Step</button>
        <Inspector />
      </div>
      <div className='numbers'>
        {numbers.map((n, i) =>
          <div className={classNames('number', {low: low === i, high: high === i, mid: mid === i})} key={i}>{n}</div>)
        }
      </div>
      <Pseudocode>
        {/*                       */}BinarySearch({A}[0..{N}-1], {Value}) {'{'}                                      {'\n'}
        {<Step name='init'>{/*    */}    {Low} = 0                                                                   {'\n'}
          {/*                     */}    {High} = {N} - 1                                                            {'\n'}</Step>}
        {<Step name='loop'>{/*    */}    while ({Low} &lt;= {High}) {'{'}                                            {'\n'}</Step>}
        {<Comment>{/*             */}        // invariants: {Value} &gt; {A}[i] for all i &lt; {Low}                 {'\n'}</Comment>}
        {<Comment>{/*             */}                       {Value} &lt; {A}[i] for all i &gt; {High}                {'\n'}</Comment>}
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
      </Pseudocode>
    </div>
  )
}

BinarySearch.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  target: PropTypes.number.isRequired,
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}

export default BinarySearch
