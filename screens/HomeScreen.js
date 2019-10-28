import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { View } from 'react-native';
import styles from '../constants/styles';
import EventBlock from './EventBlock';

class HomeScreen extends Component {

	renderEvents = () => {
		const { eventsData, navigation } = this.props
		return eventsData.map(({ id, name, markets }) => {
			if (markets.length) {
				return <EventBlock
					id={id}
					key={id}
					event={name}
					markets={markets}
					navigation={navigation}
				/>
			}
		})
	}
	render() {
		return (
			<View style={styles.container}>
				{this.renderEvents()}
			</View>
		)
	}
}
const mapStateToProps = state => {
	const {
		data: {
			eventsData = {}
		}
	} = state || {}
	return {
		eventsData
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

