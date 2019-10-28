import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import globalStyles from '../constants/styles';
import { addMarket } from "../actions/data";

class Event extends Component {

	renderParticipants = () => {
		const  { event } = this.props
		const participants = event.split(' vs ')
		return (
			<View style={styles.event} key={participants}>
				<Text>{participants[0]}</Text>
				<Text>vs</Text>
				<Text>{participants[1]}</Text>
			</View>
		)
	}

	handlePress = id => () => {
		this.props.addMarket(id)
		this.props.navigation.openDrawer()
	}

	isSelected = id => {
		return !!this.props.selectedMarkets.find(selectedId => selectedId === id)
	}

	renderMarkets = () => {
		const { markets } = this.props
		return markets.map(market => {
			return (
				<View key={market.id} style={styles.markets}>
					<Text style={styles.marketHeader}>{market.name}</Text>
					<View style={styles.selectionWrapper}>
						{market.selections.map(item => {
							const isSelected = this.isSelected(item.id)
							const selectionStyles = [styles.selection]
							const textStyles = []
							if (isSelected) {
								selectionStyles.push(styles.selected)
								textStyles.push(styles.selectedName)
							}
							return (
								<TouchableHighlight
									key={item.id}
									underlayColor="white"
									onPress={this.handlePress(item.id)}
								>
									<View style={selectionStyles}>
										<Text style={textStyles}>{item.name}</Text>
										<Text style={textStyles}>{item.price}</Text>
									</View>
								</TouchableHighlight>
							)
						})}
					</View>
				</View>
			)
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					{this.renderParticipants()}
					{this.renderMarkets()}
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	const {
		data: {
			selectedMarkets
		}
	} = state || {}

	return {
		selectedMarkets
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		addMarket
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)

const styles = StyleSheet.create({
	container: {
		...globalStyles.container,
		marginTop: 10,
	},
	event: {
		flex: 0.2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderColor: 'gray',
		borderWidth: 1,
		width: 350,
	},
	markets: {
		flex: 0.4,
		justifyContent: 'space-between',
		borderColor: 'gray',
		borderWidth: 1,
	},
	marketHeader: {
		flex: 1,
		margin: 5,
		justifyContent: 'flex-start',
		alignSelf: 'flex-start',
		color: '#868a8c',
	},
	selectionWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 5
	},
	selectionName: {
		...globalStyles.colorGray,
		fontSize: 20
	},
	selection: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		minWidth: 100,
		minHeight: 30
	},
	selected: {
		backgroundColor: '#39ff4d',
	},
	selectedName: {
		color: '#3221ff'
	}
})
