import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions} from 'react-native';
import ReceiptPage from './Pages/ReceiptPage';
import CalenderPage from './Pages/CalenderPage';
import UserPage from './Pages/UserPage';
import SettingPage from './Pages/SettingPage';

import { connect } from 'react-redux';
import { ChangeTab } from '../redux/action';

class MainPage extends React.Component {
	
	calenderIcon=require('./imgs/Buttons/CalenderSelect.png');
	mainIcon=require('./imgs/Buttons/MainSelect.png');
	userIcon=require('./imgs/Buttons/UserSelect.png');
	settingIcon=require('./imgs/Buttons/Settings_1.png');
	
	handleTab=(tab)=>{
    this.props.dispatch(ChangeTab(tab));
	}

  render() {

		var curtab = <ReceiptPage />;
		    
	
		switch (this.props.tab){
			case 1:
				curtab = <ReceiptPage />
				break;
			
			case 2:
				curtab = <CalenderPage />
				break;
			
			case 3:
				curtab = <UserPage />
				break;
			
			case 4:
				curtab = <SettingPage />
				break;
		}

    return (
      <View style={styles.container}>
				<View style={styles.naviBox}>
				
					<View style={styles.Logo}>
						<Image 
							source={require('./imgs/NameLogo.png')}
							style={{width:100,height:45,resizeMode:'contain', marginBottom:'2%',}}
						/>
					</View>

					<View style={styles.navigate}>
						<TouchableOpacity
							onPress={this.handleTab.bind(this,2)}
						>
							<Image 
								source={this.calenderIcon}
								// "?" is if, ":" is do the stuff
								style={[styles.icon, {opacity:(this.props.tab===2)?1:0.5}]}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={this.handleTab.bind(this,1)}
						>
							<Image 
								source={this.mainIcon}
								style={[styles.icon, {opacity:(this.props.tab===1)?1:0.5}]}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={this.handleTab.bind(this,3)}
						>
							<Image 
								source={this.userIcon}
								style={[styles.icon, {opacity:(this.props.tab===3)?1:0.5}]}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={this.handleTab.bind(this,4)}
						>
							<Image 
								source={this.settingIcon}
								style={[styles.icon, {opacity:(this.props.tab===4)?1:0.5}]}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{curtab}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
    backgroundColor: '#326273',
		width: Dimensions.get('window').width,
		alignItems: 'center',
    justifyContent: 'center',
	},

	naviBox: {
		width:'100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: '2%',
	},

	navigate: {
		width: "100%",
		display: 'flex',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'space-around',
		paddingBottom: '5%',
	},

	icon: {
		width: 80,
		height: 35,
		resizeMode:'contain',
	},
	
});

function mapStateToProps(state){
	return {
		tab:state.Page.tab,
		userid:state.Page.user_id
	}
}

export default connect(mapStateToProps)(MainPage);