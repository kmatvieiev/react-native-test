import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from '../constants/styles';

class HomeScreen extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>Курс валют</Text>
			</View>
		)
	}
}
const mapStateToProps = state => {
	const {} = state || {}
	return {}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

