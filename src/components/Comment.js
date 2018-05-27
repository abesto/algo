import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Comment.css'

const Comment = ({ children }) => (
  <span className='Comment'>{children}</span>
)

Comment.propTypes = {
  children: PropTypes.array.isRequired
}

export default Comment
