export function validateAuthFields(values) {
	const errors = {}
	Object.keys(values).forEach(key => {
			const field = values[key]
			if (key === 'email' && !validateEmail(field)) {
				errors[key] = 'Enter correct e-mail address'
			} else if (key === 'name' && validateName(field)) {
				errors[key] = 'Name should be at least 4 symbols'
			} else if (key === 'password' && validatePassword(field)) {
				errors[key] = 'Password should be at least 8 symbols'
			} else {
				errors[key] = ''
			}
		}
	)
	return errors
}

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function validateName(field) {
	return field.length < 4
}

function validatePassword(pass) {
	return pass.length < 8
}
