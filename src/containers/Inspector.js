import { connect } from 'react-redux'
import InspectorComponent from '../components/Inspector.js'

const mapStateToProps = (state, ownProps) => state.inspector

const Inspector = connect(mapStateToProps, {})(InspectorComponent)
export default Inspector
