import React from 'react'
import { Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import Drawer from "../screens/Drawer";
import HomeScreen from '../screens/HomeScreen'
import Icon from 'react-native-vector-icons/Ionicons';

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
		marginRight: 8,
	}
});
const drawerConfig = {
	drawerWidth: WIDTH*0.63,
	drawerType: 'slide',
	drawerPosition: 'right',
	contentComponent: Drawer
}

const renderMenu = (navigation) => (
	<TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
		<Icon name="ios-menu" size={32} color="#000000" style={styles.menu} />
	</TouchableWithoutFeedback>
)

const Home = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({navigation}) => ({
			title: 'Home',
			headerRight: renderMenu(navigation)
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
		Home: DrawerNavigator
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none'
	}
);

export default RootNavigation;

