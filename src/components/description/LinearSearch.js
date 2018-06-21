import React from 'react'
import { css } from 'aphrodite/no-important'

import Blockquote from '../html/Blockquote'
import style from './style'

const LinearSearch = () => (
  <div className={css(style)}>
    <h2>Linear search</h2>
    <Blockquote href='https://en.wikipedia.org/wiki/Brute-force_search' title='Linear search - Wikipedia'>
      <p>Linear search or sequential search is a method for finding a target value within a list. It sequentially
        checks each element of the list for the target value until a match is found or until all the elements have
        been searched.</p>
    </Blockquote>
  </div>
)

export default LinearSearch
