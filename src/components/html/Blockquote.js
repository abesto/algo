import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'

const Blockquote = ({ href, title, children }) => (
  <blockquote className={css(styles.blockquote)} cite={href}>
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

const styles = StyleSheet.create({
  blockquote: {
    borderLeft: '5px solid lightgray',
    paddingLeft: '25px'
  }
})

export default Blockquote
