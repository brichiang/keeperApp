import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { ChangePage, Id } from '../redux/action';
import { connect } from 'react-redux';

class Signup extends React.Component {
  
  state={
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  }
  
handleSignup=()=>{
  if(this.state.password!==this.state.confirmPassword){
    alert('Your Password Does Not Match!')
  }else{
  var fd = new FormData();
			fd.append("name", this.state.name);
			fd.append("email", this.state.email);
			fd.append("password", this.state.password);
		console.log(fd);
		fetch("http://keeperandroid.herokuapp.com/insert_user.php",{
			method:"POST",
			body:fd
		}).then((resp)=>{
			return resp.json();
		}).then((json)=>{
			console.log(json)
			if(json.status){
        this.props.dispatch(Id(json.id))
        this.handlePage(4)
			}
    });
  }
}
  

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding' enabled
        >
        
      <TouchableOpacity
		 		style={styles.backBut} 
         onPress={this.handlePage.bind(this, 1)}
			>
			<Image
				source={require('./imgs/Buttons/Backbutton.png')}
				style={{width:40,height:40,resizeMode:'contain'}}
			/>
			</TouchableOpacity>

			<View style={styles.logo}>
          <Image 
            source={require('./imgs/LogoOnly.png')}
            style={{width:'100%',height:'100%',resizeMode:'contain'}}
          />
      </View>
        
      <View style={styles.func}>
        <View style={styles.inp}>
            <TextInput 
                placeholder="username"
                underlineColorAndroid='transparent'
                style={{color:'#fff'}}
                onChangeText={(name) => this.setState({name})}
            />
        </View>
        <View style={styles.inp}>
            <TextInput 
                placeholder="email"
                underlineColorAndroid='transparent'
                style={{color:'#fff'}}
                onChangeText={(email) => this.setState({email})}
            />
        </View>
        <View style={styles.inp}>
            <TextInput 
                secureTextEntry={true}
                placeholder="password"
                underlineColorAndroid='transparent'
                style={{color:'#fff'}}
                onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.inp}>
            <TextInput 
                secureTextEntry={true}
                placeholder="confirm password"
                underlineColorAndroid='transparent'
                style={{color:'#fff'}}
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
        </View>
        <TouchableOpacity 
        style={styles.signBut}
          onPress={this.handleSignup}
					>
          
        <Text style={{color:'#fff'}}>Signup with Email </Text>
		</TouchableOpacity>
		</View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b7381',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
	},
	
	backBut: {
		position: 'absolute',
		left: 20,
		top: 30,
	},

	logo: {
    width:'50%',
    height:'20%',
    alignItems: 'center',
    //backgroundColor: '#fff',
    marginTop: 20,
	},

	func: {
    alignItems: 'center',
    width:'70%'
	},

  inp: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff70',
    margin: 10,
  },

  signBut: {
    width: '100%',
    height: 60,
    backgroundColor: '#2eaa9b',
    borderRadius: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Signup);