import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';

import { ChangePage } from '../redux/action';
import { connect } from 'react-redux';


class Starting extends React.Component {
  
  handleFB =()=>{
    alert(
      'FacebookClicked',
    )
  }

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.logo}>
					<Image 
						source={require('./imgs/NewLogo.png')}
						style={{width:'100%',resizeMode:'contain'}}
          />
        </View>
        
        <View style={styles.butBox}>
					<View style={styles.buts}>
              {/* <TouchableOpacity 
                style={styles.but1}  
                onPress={this.handleFB}
              >
                <Text style={{color:'#fff',}}>Signup with Facebook </Text>
              </TouchableOpacity> */}
              
              <TouchableOpacity 
                style={styles.but2}
                onPress={this.handlePage.bind(this,3)}
              >
                <Text style={{color:'#fff', fontSize:16}}>Signup with Email </Text>
              </TouchableOpacity>

              
              <TouchableOpacity 
                style={styles.but3}
                onPress={this.handlePage.bind(this,2)}
              >
                <Text style={{color:'#2eaa9b', fontSize:16}}>Login</Text>
              </TouchableOpacity>
          </View>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:Dimensions.get('window').width,
    backgroundColor: '#326273',
    alignItems: 'center',
  },

  logo: {
    width:'60%',
    marginTop: '5%',
    marginBottom:'5%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent:'center',
    flex:0.6
  },

  butBox: {
    backgroundColor: '#fff',
    width: '90%',
    height:'40%',
    flex: 0.7,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: '2%',
    alignItems: 'center',

  },
  
  buts: {
    width:'90%',
    height:'90%',
    position:'absolute',
    bottom: '5%',
    alignItems: 'center',
  },

  but1: {
    width: '100%',
    height: 60,
		backgroundColor: '#3b5998',
		borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: '10%',
		justifyContent: 'center',
		alignItems: 'center',
  },

  but2: {
    width: '100%',
    height: 70,
    backgroundColor: '#2eaa9b',
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: '10%',
		justifyContent: 'center',
		alignItems: 'center',
  },

  but3: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderColor: '#2eaa9b',
    borderWidth: 1,
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: '10%',
		justifyContent: 'center',
		alignItems: 'center',
  },

});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Starting);