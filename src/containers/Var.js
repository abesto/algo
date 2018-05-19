import { connect } from 'react-redux'
import { highlight, clearHighlight } from '../actions/inspector.js'

import VarComponent from '../components/Var.js'

const mapDispatchToProps = {highlight, clearHighlight}

const Var = connect(() => ({}), mapDispatchToProps)(VarComponent)
export default Var
