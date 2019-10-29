import { CHANGE_FIELD, CHANGE_SCREEN, APPROVE_DATA, BLUR_FIELD } from "../constants/auth";

export const changeField = (name, value) => {
	return {
		type: CHANGE_FIELD,
		name,
		value
	}
}

export const changeScreen = (navigation, screen) => {
	return {
		type: CHANGE_SCREEN,
		navigation,
		screen
	}
}

export const aproveData = () => {
	return {
		type: APPROVE_DATA
	}
}

export const blurField = fields => {
	return {
		type: BLUR_FIELD,
		fields
	}
}

