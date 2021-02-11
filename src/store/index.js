import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import state from './state'


const store = createStore(reducer, state, applyMiddleware(thunk))

export default store