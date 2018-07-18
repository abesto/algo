import React from 'react'
import { css } from 'aphrodite/no-important'

import Blockquote from '../html/Blockquote'
import style from './style'

const BubbleSort = () => (
  <div className={css(style)}>
    <h2>Bubble sort</h2>
    <Blockquote href='https://rosettacode.org/wiki/Sorting_algorithms/Bubble_sort' title='Bubble sort - Rosetta Code'>
      <p>
        The bubble sort is generally considered to be the simplest sorting algorithm.
      </p>
      <p>
        Because of its simplicity and ease of visualization, it is often taught in introductory computer science courses.
      </p>
      <p>
        Because of its abysmal O(n2) performance, it is not used often for large (or even medium-sized) datasets.
      </p>
      <p>
        The bubble sort works by passing sequentially over a list, comparing each value to the one immediately after it.
        If the first value is greater than the second, their positions are switched.   Over a number of passes, at most
        equal to the number of elements in the list, all of the values drift into their correct positions (large values
        "bubble" rapidly toward the end, pushing others down around them). Because each pass finds the maximum item and
        puts it at the end, the portion of the list to be sorted can be reduced at each pass.   A boolean variable is
        used to track whether any changes have been made in the current pass; when a pass completes without changing
        anything, the algorithm exits.
      </p>
    </Blockquote>
  </div>
)

export default BubbleSort
