import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	colorGray: {
		color: '#868a8c'
	}
});


export const responsiveFontSize = f => (Math.sqrt((height * height) + (width * width)) * (f / 100))
export const isSmallScreen = height < 600;
