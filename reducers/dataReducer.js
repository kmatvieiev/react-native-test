import { GET_DATA_SUCCESS, GET_DATA_REQUEST, SELECT_MARKET, DELETE_MARKET } from '../constants/data'

const events = require('../constants/data.json')

const initialState = {
	eventsData: events,
	loading: false,
	selectedMarkets: []
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case GET_DATA_SUCCESS:
			return { ...state, data: action.payload, loading: false }
		case GET_DATA_REQUEST:
			return { ...state, loading: true }
		case SELECT_MARKET:
			const selectedMarkets = [...state.selectedMarkets]
			const isSelected = selectedMarkets.find(id => id === action.id)
			if (!isSelected) {
				selectedMarkets.push(action.id)
			}
			return { ...state, selectedMarkets }
		case DELETE_MARKET: {
			let selectedMarkets = [...state.selectedMarkets]
			const isSelected = selectedMarkets.find(id => id === action.id)
			if (isSelected) {
				selectedMarkets = selectedMarkets.filter(id => id !== action.id)
			}
			return { ...state, selectedMarkets }
		}
		default:
			return state
	}
}
