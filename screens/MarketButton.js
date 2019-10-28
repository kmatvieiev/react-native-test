import React, { Component } from 'react';
import { Dimensions, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;

class MarketButton extends Component {

	handlePress = () => {
		const { icon, navigation } = this.props
		if (icon === 'delete') {
			navigation.closeDrawer()
		} else {
			navigation.openDrawer()
		}
	}

	render() {
		const { icon } = this.props
		let iconName = 'ios-menu'
		let style = styles.icon
		switch (icon) {
			case 'delete':
				iconName = 'ios-close'
				style = styles.closeIcon
				break
			default:
				break
		}

		return (
			<Icon name={iconName} size={32} color="#000000" style={styles.menu} onPress={this.handlePress}/>
		);
	}
}

const styles = StyleSheet.create({
	icon: {
		position: 'absolute',
		top: 15,
		left: WIDTH-40
	},
	closeIcon: {
		top: 15,
		left: 220,
		position: 'absolute'
	}
})

export default MarketButton;
