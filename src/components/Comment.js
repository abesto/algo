import React from 'react'

import '../styles/Comment.css'

const Comment = ({ children }) => (
  <span className='Comment'>{children}{'\n'}</span>
)

export default Comment
