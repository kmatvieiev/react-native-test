import { BUY_CURRENCY, currencyCodes, EXCHANGE_CURRENCY, CHANGE_QUANTITY, SELL_CURRENCY } from "../constants/currency";
// import { loadCurrency } from "../actions/currency";

const initialState = {
	data: [
		{
			"currencyCodeA": 840,
			"currencyCodeB": 980,
			"date": 1572338406,
			"rateBuy": 24.811,
			"rateSell": 25.1781
		},
		{
			"currencyCodeA": 978,
			"currencyCodeB": 980,
			"date": 1572338406,
			"rateBuy": 27.461,
			"rateSell": 27.922
		},
		{
			"currencyCodeA": 643,
			"currencyCodeB": 980,
			"date": 1572320406,
			"rateBuy": 0.357,
			"rateSell": 0.394
		},
		{
			"currencyCodeA": 978,
			"currencyCodeB": 840,
			"date": 1572320406,
			"rateBuy": 1.1026,
			"rateSell": 1.1177
		},
		{
			"currencyCodeA": 826,
			"currencyCodeB": 980,
			"date": 1572340301,
			"rateCross": 32.2991
		},
		{
			"currencyCodeA": 756,
			"currencyCodeB": 980,
			"date": 1572340263,
			"rateCross": 25.305
		},
		{
			"currencyCodeA": 933,
			"currencyCodeB": 980,
			"date": 1572340206,
			"rateCross": 12.3043
		},
		{
			"currencyCodeA": 124,
			"currencyCodeB": 980,
			"date": 1572340114,
			"rateCross": 19.2686
		},
		{
			"currencyCodeA": 203,
			"currencyCodeB": 980,
			"date": 1572340333,
			"rateCross": 1.0914
		},
		{
			"currencyCodeA": 208,
			"currencyCodeB": 980,
			"date": 1572340045,
			"rateCross": 3.7416
		},
		{
			"currencyCodeA": 348,
			"currencyCodeB": 980,
			"date": 1572340312,
			"rateCross": 0.0849
		},
		{
			"currencyCodeA": 985,
			"currencyCodeB": 980,
			"date": 1572340350,
			"rateCross": 6.5508
		},
		{
			"currencyCodeA": 949,
			"currencyCodeB": 980,
			"date": 1572340303,
			"rateCross": 4.3608
		}
	],
	myCurrency: {
		UAH: 1000000000
	},
	quantityToTrade: {}
}

export default function currency(state = initialState, action) {
	switch (action.type) {
		case BUY_CURRENCY:
			const { quantityToTrade, myCurrency } = state
			const { rateBuy, currencyCodeA } = action.currency
			const currencyA = currencyCodes[currencyCodeA]

			const targetCurCount = quantityToTrade[currencyA.code]
			const totalCost = rateBuy * targetCurCount
			const newCurrency = state.myCurrency[currencyA.code] + targetCurCount || targetCurCount
			const newState = {
				...state,
				quantityToTrade: {
					...quantityToTrade,
					[currencyA.code]: 0
				},
				myCurrency: {
					...myCurrency,
					UAH: myCurrency.UAH - totalCost,
					[currencyA.code]: newCurrency
				}
			}
			return newState
		case CHANGE_QUANTITY:
			const { code, quantity } = action
			return {
				...state,
				quantityToTrade: {
					...state.quantityToTrade,
					[code]: quantity
				}
			}
		case SELL_CURRENCY:
			return state
		case EXCHANGE_CURRENCY:
			return state
		default:
			return state
	}
}
//
// const func = async (state) => {
// 	const data = await loadCurrency()
// 	if (data.length > 0) {
// 		return await {
// 			...state,
// 			data: data
// 		}
// 	}
// }
