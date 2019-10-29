import { APPROVE_DATA, CHANGE_FIELD, CHANGE_SCREEN, BLUR_FIELD, CHECK_USER } from '../constants/auth'
import { validateAuthFields } from "../helpers/validation";
import { checkUser } from '../actions/auth'

const initialState = {
	name: '',
	email: '',
	password: '',
	mode: 'Login',
	errors: {},
	loginSuccess: false
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case CHANGE_FIELD: {
			const { name, value } = action
			return {
				...state,
				[name]: value
			}
		}
		case CHANGE_SCREEN: {
			const { navigation, screen } = action
			navigation.navigate({ routeName: screen })
			return {
				...initialState,
				mode: screen
			}
		}
		case BLUR_FIELD: {
			const { fields } = action
			const errors = validateAuthFields(fields)
			return {
				...state,
				errors: {
					...state.errors,
					...errors
				},
				loginSuccess: false
			}
		}
		case APPROVE_DATA: {
			const { name, email, password, mode } = state
			const fields = { name, password }
			if (mode === 'SignUp') fields.email = email
			const errors = validateAuthFields(fields)
			const hasErrors = Object.keys(errors).filter(key => {
				const item = errors[key]
				return item.length
			}).length
			const newState = { ...state }
			if (!hasErrors) {
				setTimeout(() => console.log(1), 1000)
				newState.errors = {}
				newState.loginSuccess = true
			}
			return newState
		}
		default:
			return state
	}
}
