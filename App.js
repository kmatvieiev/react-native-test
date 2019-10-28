import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createAppContainer } from 'react-navigation';
import { default as reducer } from './reducers/index';
import AppNavigator from './navigators/rootNavigation';

const store = createStore(reducer)

const Navigation = createAppContainer(AppNavigator);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Navigation />
			</Provider>
		)
	}
}


export default App;
