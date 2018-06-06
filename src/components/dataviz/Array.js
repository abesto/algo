import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import classNames from 'classnames'

import '../../styles/Array.css'

const variablesToClassnames = (currentIndex, variables) =>
  variables.map((value) => value === currentIndex).toJS()

const Array = ({ variables, changeGlobals }) => {
  return (
    <div className='Array'>
      {
        variables.get('A').map((item, index) =>
          <div className={classNames('item', variablesToClassnames(index, variables))} key={index}>
            {item}
            <div className='item-delete' onClick={() => changeGlobals({A: variables.get('A').remove(index)})} />
          </div>
        )
      }
    </div>
  )
}

Array.propTypes = {
  variables: PropTypes.instanceOf(Map).isRequired,
  changeGlobals: PropTypes.func.isRequired
}

export default Array
