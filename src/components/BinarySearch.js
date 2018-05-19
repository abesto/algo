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

const BinarySearch = ({ algoState, startAlgorithm, stepAlgorithm }) => {
  const s = algoState.value
  const low = s.low
  const mid = s.mid
  const high = s.high
  const step = s.step
  const numbers = s.a
  const target = s.value

  const Step = MkStep(step)
  const Low = <Var name='low' />
  const Mid = <Var name='mid' />
  const High = <Var name='high' />
  const N = <Var name='n' />
  const Value = <Var name='value' />
  const A = <Var name='a' />
  return (
    <div className='BinarySearch'>
      <div className='description'>
        <h2>Binary search</h2>
        <blockquote cite='https://rosettacode.org/wiki/Binary_search'>
          <p>A binary search divides a range of values into halves, and continues to narrow down the field of search until the unknown value is found. It is the classic example of a "divide and conquer" algorithm.</p>
          <p>As an analogy, consider the children's game "guess a number." The scorer has a secret number, and will only tell the player if their guessed number is higher than, lower than, or equal to the secret number. The player then uses this information to guess a new number.</p>
          <p>As the player, an optimal strategy for the general case is to start by choosing the range's midpoint as the guess, and then asking whether the guess was higher, lower, or equal to the secret number. If the guess was too high, one would select the point exactly between the range midpoint and the beginning of the range. If the original guess was too low, one would ask about the point exactly between the range midpoint and the end of the range. This process repeats until one has reached the secret number.</p>
          <footer className='blockquote-footer'><cite title='Binary Search - Rosetta Code'>– <a href='https://rosettacode.org/wiki/Binary_search'>Binary Search - Rosetta Code</a></cite></footer>
        </blockquote>
        <p>This algorithm can be implemented both recursively and iteratively. This page showcases the iterative approach.</p>
      </div>
      <div className='controls'>
        <h3>Controls</h3>
        <div className='controls-grid'>
          <label className='target-label'>Search for:</label>
          <input className='target' name='target' value={target} onChange={(e) => startAlgorithm(binarySearch(numbers, parseInt(e.target.value, 10)))} />
          <button className='start' onClick={() => startAlgorithm(binarySearch(numbers, target))}>Start</button>
          <button className='step' onClick={() => stepAlgorithm()}>Step</button>
        </div>
      </div>
      <div className='numbers'>
        {numbers.map((n, i) =>
          <div className={classNames('number', {low: low === i, high: high === i, mid: mid === i})} key={i}>{n}</div>)
        }
      </div>
      <Pseudocode>
        {/*                       */}BinarySearch({A}[0..{N}-1], {Value}) {'{'}                                  {'\n'}
        {<Step name='init'>{/*    */}    {Low} = 0                                                               </Step>}
        {<Step name='init'>{/*    */}    {High} = {N} - 1                                                        </Step>}
        {<Step name='loop'>{/*    */}    while ({Low} &lt;= {High}) {'{'}                                        </Step>}
        {<Comment>{/*             */}        // invariants: {Value} &gt; {A}[i] for all i &lt; {Low}             </Comment>}
        {<Comment>{/*             */}                       {Value} &lt; {A}[i] for all i &gt; {High}            </Comment>}
        {<Step name='mid'>{/*     */}        {Mid} = ({Low} + {High}) / 2                                        </Step>}
        {<Step name='branch'>{/*  */}        if ({A}[{Mid}] &gt; {Value})                                        </Step>}
        {<Step name='branch-0'>{/**/}            {High} = {Mid} - 1                                              </Step>}
        {<Step name='branch'>{/*  */}        else if ({A}[{Mid}] &lt; {Value})                                   </Step>}
        {<Step name='branch-1'>{/**/}            {Low} = {Mid} + 1                                               </Step>}
        {<Step name='branch'>{/*  */}        else                                                                </Step>}
        {<Step name='done'>{/*    */}            return {Mid}                                                    </Step>}
        {<Step name='loop'>{/*    */}    {'}'}                                                                   </Step>}
        {/*                       */}    return not_found {<Comment>// {Value} would be inserted at index "{Low}"</Comment>}
        {/*                       */}{'}'}
      </Pseudocode>
      <Inspector vars={{a: numbers, value: target, low, mid, high}} />
    </div>
  )
}

BinarySearch.propTypes = {
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}

export default BinarySearch
