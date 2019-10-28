import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from "react-native";
import { deleteMarket } from "../actions/data";
import globalStyles from '../constants/styles'
import MarketButton from "./MarketButton";

class Drawer extends Component {
	handleDelete = id => () => {
		const { deleteMarket } = this.props
		deleteMarket(id)
	}

	render() {
		const { selectedMarkets, data, navigation } = this.props
		const markets = data.reduce((acc, item) => {
			item.markets.map(item => {
				item.selections.map(i => {
					acc[i.id] = { ...i, title: item.name }
				})
			})
			return acc
		}, {})
		const isDrawerOpen = this.props.navigation.state.isDrawerOpen

		return (
			<View key="drawer" style={styles.container}>
				{isDrawerOpen && (
					<MarketButton icon="delete" navigation={navigation} />
				)}
				{selectedMarkets.map(marketId => {
					const currentMarket = markets[marketId]
					const isExist = Object.keys(currentMarket).length > 0
					if (isExist) {
						let header = ''
						if (currentMarket.title.indexOf('Team') !== -1) {
							header = currentMarket.title.split("Team ")
						} else {
							header = currentMarket.title.split("Player ")
						}
						header[0] = currentMarket.name
						return (
							<View key={marketId} style={styles.wrapper}>
								<Text style={styles.marketHeader}>{header.join(' ')}</Text>
								<Text style={styles.marketPrice}>{currentMarket.price}</Text>
								<Button title="Delete" color="#120047" onPress={this.handleDelete(marketId)}/>
								<View style={styles.line} />
							</View>
						)
					}
				})}
			</View>
		);
	}

}

const mapStateToProps = state => {
	const {
		data: {
			selectedMarkets,
			eventsData
		}
	} = state || {}

	return {
		data: eventsData,
		selectedMarkets
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		deleteMarket
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

const styles = StyleSheet.create({
	container: {
		...globalStyles.container,
		justifyContent: 'flex-start',
	},
	wrapper: {
		marginTop: 20,
		alignItems: 'center',
		borderBottomColor: '#000000',
		borderBottomWidth: 2,
		paddingBottom: 5
	},
	marketTitle: {
		fontSize: 20
	},
	marketPrice: {
		fontSize: 25
	}
})
