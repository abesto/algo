import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'

const Comment = ({ children }) => (
  <span className={css(styles.comment)}>{children}</span>
)

Comment.propTypes = {
  children: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  comment: { color: 'gray' }
})

export default Comment
