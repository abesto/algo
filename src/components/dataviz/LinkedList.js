import React, { Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'

const Value = ({ value }) => <span className={css(styles.common, styles.value)}>{value}</span>

const pointerContent = {
  true: '⟶',
  false: 'X'
}
const Pointer = ({ hasNext }) => <span className={css(styles.common, styles.pointer, hasNext && styles.pointerWithArrow)}>
  <span className={css(hasNext && styles.pointerArrowContent)}>
    {pointerContent[hasNext ? 'true' : 'false']}
  </span>
</span>

const Cell = ({ hasNext, children }) => <div className={css(styles.cell)}>
  <Value value={children} />
  <Pointer hasNext={hasNext} />
</div>

function ensureArray (item) {
  if (!(item instanceof Array)) {
    return [item]
  }
  return item
}

const LinkedList = ({ heads }) => <Fragment>
  {ensureArray(heads)
    .map(head => head.iterate())
    .map((list, listIndex) =>
      <Fragment key={listIndex}>
        {[...list].map((item, index) =>
          <Cell key={index} hasNext={item.next !== null}>
            {item.value}
          </Cell>
        )}
      </Fragment>
    )}
</Fragment>

const styles = StyleSheet.create({
  cell: {
    display: 'inline-block',
    marginRight: 15
  },
  common: {
    display: 'inline-block',
    border: '1px solid black',
    padding: 3
  },
  value: {},
  pointer: {
    backgroundColor: 'yellow',
    borderLeftWidth: 0,
    overflow: 'visible',
    width: 10
  },
  pointerArrowContent: {
    display: 'inline-block',
    transform: 'translateX(4px) scaleX(1.2)'
  }
})

export default LinkedList
