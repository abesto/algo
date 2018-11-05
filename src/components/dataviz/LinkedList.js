import React, { Fragment } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'


class Layout {
  constructor({cellValueWidth, cellPointerWidth, margin, cellHeight}) {
    this.cellValueWidth = cellValueWidth
    this.cellPointerWidth = cellPointerWidth
    this.cellHeight = cellHeight
    this.margin = margin
  }

  get cellWidth() {
    return this.cellValueWidth + this.cellPointerWidth
  }

  cellX(index) {
    return index * (this.cellWidth + this.margin)
  }
}

const layout = new Layout({
  cellValueWidth: 40,
  cellPointerWidth: 20,
  margin: 40,
  cellHeight: 30
})

const Value = ({ value }) => <text>{value}</text>

const pointerContent = {
  true: '⟶',
  false: 'X'
}
const Pointer = ({ hasNext }) => <span className={css(styles.common, styles.pointer, hasNext && styles.pointerWithArrow)}>
  <span className={css(hasNext && styles.pointerArrowContent)}>
    {pointerContent[hasNext ? 'true' : 'false']}
  </span>
</span>

const Cell = ({ index, hasNext, children }) => <rect
  x={layout.cellX(index)}
  width={layout.cellWidth}
  height={layout.cellHeight}
  className={css(styles.cell)}>
  <Value value={children} />
  <Pointer />
</rect>

function ensureArray (item) {
  if (!(item instanceof Array)) {
    return [item]
  }
  return item
}

const LinkedList = ({ heads }) => <svg width="500" height="300">
  {ensureArray(heads)
    .flatMap(head => Array.from(head.iterate()))
    .map((item, index) => {console.log(item, index); return item})
    .map((item, index) => (
      <Cell key={index} index={index} hasNext={item.next !== null}>
        {item.value}
      </Cell>
    )
  )}
</svg>

const styles = StyleSheet.create({
  cell: {
    stroke: 'black',
    fill: 'white'
  },
  common: {
    display: 'inline-block',
    border: '1px solid black',
    padding: 3
  },
  pointer: {
    backgroundColor: 'yellow',
    borderLeftWidth: 0,
    overflow: 'visible',
    width: 10
  },
  pointerArrowContent: {
    display: 'inline-block',
    transform: 'translateX(4px) scaleX(1.2)'
  },
})

export default LinkedList
