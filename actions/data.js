import { GET_DATA_SUCCESS, SELECT_MARKET, DELETE_MARKET } from "../constants/data";

export const getEvents = () => {
	return {
		type: GET_DATA_SUCCESS,
		payload: result
	}
}

export const addMarket = id => {
	return {
		type: SELECT_MARKET,
		id
	}
}

export const deleteMarket = id => {
	return {
		type: DELETE_MARKET,
		id
	}
}
