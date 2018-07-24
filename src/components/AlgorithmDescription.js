import React from 'react'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite/no-important'

const styles = StyleSheet.create({
  description: {
    padding: '20px',
    backgroundColor: '#eaeaea',
    boxShadow: '2px 2px 5px 2px darkgray',
    marginBottom: '25px'
  }
})
const descriptionStyle = styles.description

const AlgorithmDescription = ({title, children}) => (
  <div className={css(descriptionStyle)}>
    <h2>{title}</h2>
    {children}
  </div>
)

AlgorithmDescription.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default AlgorithmDescription
