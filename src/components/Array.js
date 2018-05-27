import React from 'react'
import PropTypes from 'prop-types'
import { List, Map } from 'immutable'
import classNames from 'classnames'

import '../styles/Array.css'


const variablesToClassnames = (currentIndex, variables) =>
  variables.map((value) => value === currentIndex).toJS()

const Array = ({ items, variables, onRemove }) => {
  return (
    <div className='Array'>
      {
        items.map((item, index) =>
          <div className={classNames('item', variablesToClassnames(index, variables))} key={index}>
            {item}
            <div className='item-delete' onClick={() => onRemove(index)} />
          </div>
        )
      }
    </div>
  )}

Array.propTypes = {
  items: PropTypes.instanceOf(List).isRequired,
  variables: PropTypes.instanceOf(Map).isRequired,
  onRemove: PropTypes.func
}

export default Array
