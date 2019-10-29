import React from 'react'
import { Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from "../screens/Drawer";
import HomeScreen from '../screens/HomeScreen'
import AuthScreen from "../screens/AuthScreen";

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	icon: {
		width: 24,
		height: 24,
	},
	menu: {
		marginLeft: 10,
	},
	rightMenu: {
		marginRight: 10
	}
});
const drawerConfig = {
	drawerWidth: WIDTH*0.63,
	drawerType: 'slide',
	drawerPosition: 'left',
	contentComponent: Drawer
}

const renderMenu = (navigation) => (
	<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
		<Icon name="ios-menu" size={32} color="#000000" style={styles.menu} />
	</TouchableWithoutFeedback>
)

const renderRightIcon = (navigation) => (
	<TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
		<Icon name="ios-log-out" size={32} color="#000000" style={styles.rightMenu} />
	</TouchableWithoutFeedback>
)

const Auth = createStackNavigator({
	Login: {
		screen: AuthScreen,
	},
	SignUp: {
		screen: AuthScreen
	}
})

const Home = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({navigation}) => ({
			title: 'Home',
			headerLeft: renderMenu(navigation),
			headerRight: renderRightIcon(navigation)
		}),
	}
})

const DrawerNavigator = createDrawerNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			drawerLabel: 'Home',
		}
	}
}, drawerConfig);

const RootNavigation = createStackNavigator(
	{
		Auth: Auth,
		Home: DrawerNavigator
	},
	{
		initialRouteName: 'Auth',
		headerMode: 'none'
	}
);

export default RootNavigation;

