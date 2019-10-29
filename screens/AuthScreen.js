import React, { Component } from 'react';
import {
	View,
	Button,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../constants/styles'
import { changeScreen, changeField, aproveData, blurField } from "../actions/auth";

class AuthScreen extends Component {
	componentDidUpdate(prevProps) {
		const { errors, loginSuccess, navigation } = this.props
		const isLoggedIn = loginSuccess && prevProps.loginSuccess !== loginSuccess
		const hasErrors = Object.keys(errors).filter(key => {
			const item = errors[key]
			return item.length
		}).length
		if (!hasErrors && isLoggedIn) {
			navigation.navigate({ routeName: 'Home' })
		}
	}

	handleChangeScreen = mode => () => {
		const { changeScreen, navigation } = this.props
		changeScreen(navigation, mode)
	}

	handleChangeTextField = key => text => {
		const { changeField } = this.props
		changeField(key, text)
	}

	handleSubmit = () => {
		this.props.aproveData()
	}

	handleBlur = field => () => {
		this.props.blurField({ [field]: this.props[field] })
	}

	renderSignUp = () => {
		const { name, password, email, errors } = this.props
		return (
			<View style={styles.container}>
				<Icon name="ios-add-circle-outline" size={72} color="#000000"/>
				<View styles={styles.header}>
					<Text style={styles.headerText}>Create account</Text>
					<Text style={styles.headerSubText}>
						Fast hotel booking in a few clicks. We hope you`ll love Routes
					</Text>
				</View>
				<Input
					value={name}
					placeholder="Name"
					handleChange={this.handleChangeTextField('name')}
					handleBlur={this.handleBlur('name')}
					error={errors['name']}
				/>
				<Input
					value={email}
					placeholder="E-mail"
					handleChange={this.handleChangeTextField('email')}
					handleBlur={this.handleBlur('email')}
					error={errors['email']}
				/>
				<Input
					value={password}
					placeholder="Password"
					handleChange={this.handleChangeTextField('password')}
					handleBlur={this.handleBlur('password')}
					error={errors['password']}
					secureTextEntry
				/>
				<Button
					title="Create account"
					onPress={this.handleSubmit}
					style={styles.button}
				/>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Already have an account?</Text>
					<TouchableOpacity onPress={this.handleChangeScreen('Login')}>
						<Text style={styles.link}>Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	renderSignIn = () => {
		const { name, password, errors } = this.props
		return (
			<View style={styles.container}>
				<Icon name="ios-add-circle-outline" size={72} color="#000000"/>
				<View styles={styles.header}>
					<Text style={styles.headerText}>Sign In to your account</Text>
					<Text style={styles.headerSubText}>
						Fast hotel booking in a few clicks. We hope you`ll love Routes
					</Text>
				</View>
				<Input
					value={name}
					placeholder="Name"
					handleChange={this.handleChangeTextField('name')}
					handleBlur={this.handleBlur('name')}
					error={errors['name']}
				/>
				<Input
					value={password}
					placeholder="Password"
					handleChange={this.handleChangeTextField('password')}
					handleBlur={this.handleBlur('password')}
					error={errors['password']}
					secureTextEntry
				/>
				<Button
					style={styles.button}
					onPress={this.handleSubmit}
					title="Sign In"
				/>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Do not have an account?</Text>
					<TouchableOpacity onPress={this.handleChangeScreen('SignUp')}>
						<Text style={styles.link}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	render() {
		const { navigation } = this.props
		return (
			<KeyboardAvoidingView style={globalStyles.container} behavior="padding" enabled>
				{navigation.state.routeName === 'SignUp' ? this.renderSignUp() : this.renderSignIn()}
			</KeyboardAvoidingView>
		)
	}
}

const mapStateToProps = state => {
	const {
		auth: { mode, name, email, password, errors, loginSuccess }
	} = state

	return {
		mode,
		name,
		email,
		password,
		errors,
		loginSuccess
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changeScreen,
		changeField,
		aproveData,
		blurField
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 20,
		minHeight: '100%'
	},
	footer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row'
	},
	header: {
		textAlign: 'center',
	},
	headerText: {
		fontSize: 32,
		textAlign: 'center'
	},
	headerSubText: {
		fontSize: 18,
		textAlign: 'center'
	},
	footerText: {
		marginRight: 5
	},
	link: {
		color: 'blue'
	},
	button: {
		backgroundColor: "#06bebd"
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		textAlign: 'center',
		minWidth: 400,
	},
	inputWrapper: {
		margin: 10
	},
	error: {
		color: 'red'
	},
	errorInput: {
		borderColor: 'red'
	}
});

function Input(props) {
	const { value, placeholder, handleChange, handleBlur, secureTextEntry, error } = props
	return (
		<View style={styles.inputWrapper}>
			<TextInput
				value={value}
				placeholder={placeholder}
				onChangeText={handleChange}
				onBlur={handleBlur}
				style={[styles.input, error && styles.errorInput]}
				secureTextEntry={secureTextEntry}
			/>
			<Text style={styles.error}>{error}</Text>
		</View>
	)
}
