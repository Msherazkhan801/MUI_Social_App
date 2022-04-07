import currentUser from './UserReducer'
import {combineReducers} from 'redux'
const rootReducer = combineReducers({
   currentUser,

})

export default rootReducer