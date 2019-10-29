import { BUY_CURRENCY, EXCHANGE_CURRENCY, SELL_CURRENCY, CHANGE_QUANTITY } from "../constants/currency";

export const buyCurrency = currency => {
	return {
		type: BUY_CURRENCY,
		currency
	}
}

export const sellCurrency = currency => {
	return {
		type: SELL_CURRENCY,
		currency
	}
}

export const exchangeCurrency = currency => {
	return {
		type: EXCHANGE_CURRENCY,
		currency
	}
}

export const changeCurrencyQuantity = (code, quantity) => {
	return {
		type: CHANGE_QUANTITY,
		code,
		quantity
	}
}
