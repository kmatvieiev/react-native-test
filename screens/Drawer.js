import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from "react-native";
import globalStyles from '../constants/styles'

class Drawer extends Component {


	render() {
		const { name } = this.props
		return (
			<View key="drawer" style={styles.container}>
				<Text>{name}</Text>
				<Text>Drawer</Text>
			</View>
		);
	}

}

const mapStateToProps = state => {
	const {
		auth: { name }
	} = state || {}

	return {
		name
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

const styles = StyleSheet.create({
	container: {
		...globalStyles.container,
		justifyContent: 'flex-start',
	},
})
