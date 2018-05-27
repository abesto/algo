import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Blockquote.css'

const Blockquote = ({ href, title, children }) => (
  <blockquote className='Blockquote' cite={href}>
    {children}
    <footer><cite title={title}>
      &mdash; <a href={href}>{title}</a>
    </cite></footer>
  </blockquote>
)

Blockquote.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default Blockquote