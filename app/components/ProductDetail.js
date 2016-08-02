
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Platform,
	Alert,
} from 'react-native'
import holderImage from '../../localSource/images/tree.png'
import NavigationBar from '../common/NavBarCommon.js'

const {height, width} = Dimensions.get('window');

class ProductDetail extends Component {

	constructor(props) {
		super(props);
		const { navigator,imageUrl } = this.props;
		this.state = {
			navOpacity: 0
		}
	}

	_backToFront() {
		const { navigator } = this.props;
		if(navigator) {
			navigator.pop();
		}
	}

	_scrollViewScroll(event) {
		console.log("scrolling",event.nativeEvent.contentOffset.y);
		const offsetY = event.nativeEvent.contentOffset.y;
		if (offsetY > 5) {
			this.setState({
				navOpacity: (offsetY - 5)/150
			});
		}else{
			this.setState({
				navOpacity: 0
			});
		};
		
	}

	render() {
		const { imageOnLoad } = this.state;

		return (
			<View style={ styles.mainView }>
				<ScrollView onScroll={ this._scrollViewScroll.bind(this) } scrollEventThrottle={15} style={ styles.mainScrollView }>
					<Image style={ styles.image } source={{uri: `https:${this.props.rowData.imagePath.replace(/140x140/, `${2 * width}x${2 * width}`)}` }}/>
					<View style={ [styles.infoView] }>
						<Text style={ styles.textInfo }>{ `Product Name: \n ${this.props.rowData.productName}` }</Text>
					</View>
					<View style={ [styles.infoView] }>
						<Text style={ styles.textInfo }>{ `Company Name: \n ${this.props.rowData.companyName}` }</Text>
					</View>
					<View style={ styles.infoView }>
						<Text style={ styles.textInfo }>{ `mainProducts: \n ${this.props.rowData.mainProducts}` }</Text>
					</View>
					<View style={ styles.infoView }>
						<Text style={ styles.textInfo }>{ `productDetailUrl: \n ${this.props.rowData.productDetailUrl}` }</Text>
					</View>
					<View style={ [styles.infoView,{marginBottom: 10}] }>
						<Text style={ styles.textInfo }>{ `paymentTerms: \n ${this.props.rowData.paymentTerms}` }</Text>
					</View>
				</ScrollView>
				<View style={ [styles.navbarView, {opacity: this.state.navOpacity}] }>
					<View style={{marginTop: Platform.OS === 'ios' ? 20 : 0, height: 44, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{color: 'white', fontWeight:'bold', fontSize: 18}}>
							详情
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: 'yellow'
	},
	mainScrollView: {
		flex: 1,
		position: 'absolute',
		height,
		backgroundColor: '#FFEFDB',
	},
	image: {
		height: width,
		width,
	},
	infoView: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
		marginTop: 8,
		height: 100,
		borderTopWidth: 1,
		borderTopColor: 'lightgray',
		borderBottomWidth:1,
		borderBottomColor: 'lightgray',
	},
	textInfo: {
		// backgroundColor: '#cccccc'
	},
	navbarView: {
		height: Platform.OS === 'ios' ? 64 : 44,
		width,
		top: 0,
		left: 0,
		opacity: 0,
		backgroundColor: '#4ea5ff',
	},
})

export default ProductDetail
