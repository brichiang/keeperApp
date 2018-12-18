import React from 'react';
import Signup from './Signup.js';

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';

import { ChangePage, Id, SetBudget } from '../redux/action';
import { connect } from 'react-redux';


class Login extends React.Component {

  state={
    email:"",
    password:"",
    isChecked:false,
  }

  
  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  handleLogin=async()=>{
    var fd= new FormData();
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);
    console.log(fd);
		fetch("http://keeperandroid.herokuapp.com/select_user.php",{
			method:"POST",
			body:fd
		}).then((resp)=>{
			return resp.json();
		}).then((json)=>{
      if(json.status){
        console.log(json.status)
        this.props.dispatch(Id(json.id))
        //this.props.dispatch(SetBudget(json.budget))
				this.handlePage(5);
			} else{
        alert("Wrong email or password!")
      }
    });
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
						style={{width:30,height:30,marginTop:10,resizeMode:'contain'}}
					/>
				</TouchableOpacity>
        
        <View style={styles.logo}>
          <Image 
            source={require('./imgs/NewLogo.png')}
            style={{width:'100%',height:'100%',resizeMode:'contain'}}
          />
        </View>

				<View style={styles.func}>
        <View style={styles.inp}>
            <TextInput 
				placeholder="username or email"
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

    		<TouchableOpacity 
          style={styles.Login}
          onPress={this.handleLogin}
					//onPress={this.handlePage.bind(this, 5)}
          //onPress={()=> this.loginUser(this.state.email,this.state.password)}
              //ill figure out how the page button works soon but so far this functions!
            >
      		<Text style={{color:'#fff'}}>Login </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  logo: {
    width:'50%',
    height:'30%',
    alignItems: 'center',
    //backgroundColor: '#fff',
    marginTop:30,
		marginBottom: 40,
	},
	
	backBut: {
    position: 'absolute',
    top: 30,
    left: 20,
    flex: 1,
	},

	func: {
		alignItems: 'center',
	},

  inp: {
    width: 280,
    paddingBottom: 5,
    //backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff70',
		margin: 10,
  },

  Login: {
    width: 280,
    height: 60,
    backgroundColor: '#2eaa9b',
    borderRadius: 30,
    marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center'
  },
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Login);