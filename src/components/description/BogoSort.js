import React from 'react'

import Blockquote from '../html/Blockquote'

const BogoSort = () => (
  <div className='description'>
    <h2>Bogosort</h2>
    <Blockquote href='https://en.wikipedia.org/wiki/Bogosort' title='Bogosort - Wikipedia'>
      Bogosort is a highly ineffective sorting function based on the generate and test paradigm. The function
      successively generates permutations of its input until it finds one that is sorted. It is not useful for sorting,
      but may be used for educational purposes, to contrast it with more efficient algorithms.
    </Blockquote>
    <p>In other words: bogosort shuffles the array it's sorting, until it's sorted.</p>
  </div>
)

export default BogoSort
