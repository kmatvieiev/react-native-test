import { combineReducers } from 'redux'
import auth from './authReducer'
import currency from './currencyReducer'


export default combineReducers({
	auth,
	currency
})
