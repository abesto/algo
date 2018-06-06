import React from 'react'

import Blockquote from '../html/Blockquote'

const BinarySearchDescription = () => (
  <div className='description'>
    <h2>Binary search</h2>
    <Blockquote href='https://rosettacode.org/wiki/Binary_search' title='Binary Search - Rosetta Code'>
      <p>A binary search divides a range of values into halves, and continues to narrow down the field of search
        until the unknown value is found. It is the classic example of a "divide and conquer" algorithm.</p>
      <p>As an analogy, consider the children's game "guess a number." The scorer has a secret number, and will
        only tell the player if their guessed number is higher than, lower than, or equal to the secret number.
        The player then uses this information to guess a new number.</p>
      <p>As the player, an optimal strategy for the general case is to start by choosing the range's midpoint as
        the guess, and then asking whether the guess was higher, lower, or equal to the secret number. If the
        guess was too high, one would select the point exactly between the range midpoint and the beginning of
        the range. If the original guess was too low, one would ask about the point exactly between the range
        midpoint and the end of the range. This process repeats until one has reached the secret number.</p>
    </Blockquote>
    <p>This algorithm can be implemented both recursively and iteratively. This page showcases the iterative approach.</p>
  </div>
)

export default BinarySearchDescription
