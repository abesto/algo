import { connect } from 'react-redux'
import { inspect, clearInspector } from '../actions/inspector.js'

import VarComponent from '../components/Var.js'

const mapDispatchToProps = {inspect, clearInspector}

const Var = connect(() => ({}), mapDispatchToProps)(VarComponent)
export default Var
