import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createAppContainer } from 'react-navigation';
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import { default as reducer } from './reducers/index';
import AppNavigator from './navigators/rootNavigation';
import { default as rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
const store = createStore(
	reducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

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
