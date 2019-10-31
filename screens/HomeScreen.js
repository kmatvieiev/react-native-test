import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../constants/styles';
import { currencyCodes } from "../constants/currency";
import { buyCurrency, changeCurrencyQuantity } from "../actions/currency";
import MyIcon from '../src/config';

class HomeScreen extends Component {
	state = {
		quantity: {},
		myCurrencies: {
			UAH: 10000000000
		}
	}

	handlePress = (mode, currency) => () => {
		const { buyCurrency } = this.props
		if (mode === 'buy') buyCurrency(currency)
	}

	changeQuantity = code => text => {
		this.props.changeCurrencyQuantity(code, +text)
	}
	renderCards = () => {
		const { data, quantityToTrade } = this.props
		return data.map(item => {
			const { rateBuy, rateSell, rateCross, currencyCodeB, currencyCodeA } = item
			const currencyA = currencyCodes[currencyCodeA]
			const currencyB = currencyCodes[currencyCodeB]
			const key = `${currencyA.code}-${currencyB.code}`
			const currencyQuantity = quantityToTrade[currencyA.code] || ''
			return (
				<View style={styles.card} key={key}>
					<View style={styles.cardRow}>
						<Text>{currencyA.code}</Text>
						<Icon name="ios-add-circle-outline" size={32} color="#000000"/>
						<Text>{currencyB.code}</Text>
					</View>
					{rateBuy && rateSell && (
						<View style={styles.currencies}>
							<View style={styles.cardColumn}>
								<Text>Покупка</Text>
								<Text>{rateBuy} UAH</Text>
							</View>
							<View style={styles.cardColumn}>
								<Text>Продажа</Text>
								<Text>{rateSell} UAH</Text>
							</View>
						</View>
					)}
					{rateCross && <View style={styles.cardColumn}>
						<Text>Обмен</Text>
						<Text>{rateCross} UAH</Text>
					</View>}
					<TextInput
						style={styles.textInput}
						type="number"
						value={currencyQuantity.toString()}
						placeholder="Enter number"
						onChangeText={this.changeQuantity(currencyA.code)}
						keyboardType="numeric"
					/>
					{rateBuy && rateSell && (
						<View style={styles.cardRow}>
							<Button onPress={this.handlePress('buy', item)} style={styles.button} title="Купить"/>
							<Button style={styles.button} title="Продать"/>
						</View>
					)}
					{rateCross && (
						<View style={styles.cardRow}>
							<Button style={styles.button} title="Обменять"/>
						</View>)}
				</View>
			)
		})
	}

	render() {
		const { myCurrency } = this.props
		return (
			<View style={globalStyles.container}>
				<Text>{myCurrency.UAH} Гривен на счету</Text>
				<MyIcon name="ic_checkbox" size={20} color="#333333" />
				<ScrollView horizontal styles={styles.container}>
					{this.renderCards()}
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = state => {
	const { currency: { data, myCurrency, quantityToTrade } } = state || {}
	return {
		data,
		quantityToTrade,
		myCurrency
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		buyCurrency,
		changeCurrencyQuantity
	}, dispatch)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		height: '50%',
		borderWidth: 1,
		margin: 10,
		padding: 10,
		minWidth: 200
	},
	cardColumn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	currencies: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		marginRight: 20
	},
	textInput: {
		textAlign: 'center',
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#009688',
		marginBottom: 10
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

