import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity, Image, KeyboardAvoidingView, } from 'react-native';

import { ChangePage, SetBudget } from '../redux/action';
import { connect } from 'react-redux';

class Setup extends React.Component {
  
  state = {
    curr: '',
    budget:0,
    startBut:''
  }

  updateCurr =(curr)=>{
    this.setState({ curr: curr })
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {text: ''};
  // }

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  handleBudget=(text)=>{
    this.setState({
      budget:text
    })
    if(text === ''){
      this.setState({
        startBut:''
      })
    }else{
      this.setState({
        startBut:'Start >'
      })
    }

  }

  handleStart=()=>{
    var fd = new FormData();
        fd.append("budget", this.state.budget);
        fd.append("currency", this.state.curr);
        fd.append("user_id", this.props.user_id)
      //console.log(fd);
      fetch("http://keeperandroid.herokuapp.com/update_user.php",{
        method:"POST",
        body:fd
      }).then((resp)=>{
        return resp.json();
      }).then((json)=>{
        //console.log(json)
        if(json.status){
          var fd = new FormData();
          fd.append("budget", this.state.budget);
          fd.append("currency", this.state.curr );
          fd.append("user_id", this.props.user_id)
          //console.log(fd);
          fetch("http://keeperandroid.herokuapp.com/insert_budget.php",{
          method:"POST",
          body:fd
        }).then((resp)=>{
          //console.log(resp)
          return resp.json();
        }).then((json)=>{
          //console.log(json)
          if(json.status){
            this.props.dispatch(SetBudget(this.state.curr, this.state.budget))
            this.handlePage(5)
            }
          });
         }
      });
    }


  render() {

    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding' enabled
        >
        
        <View style={styles.title}>
          <Text style={{color:'#E39774', fontSize:30,}}>Set Up Your Budget Plan!</Text>
        </View>

        <View style={styles.selectionBox}>
          <View style={styles.subTitle}>
            <Text style={{color:'#FFF', fontSize:15,}}>Pick Currency Type</Text>
          </View>
          <View style={styles.PickBox}>
          <Picker selectedValue = {this.state.curr} onValueChange = {this.updateCurr}>
            <Picker.Item label = " " value = " " />
            <Picker.Item label = "$ Dollar" value = "$" />
            <Picker.Item label = "¥ Yen" value = "¥" />
            <Picker.Item label = "₩ Won" value = "₩" />
            <Picker.Item label = "€ Euro" value = "€" />
            <Picker.Item label = "₼ Manat" value = "₼" />
            <Picker.Item label = "₡ Colon" value = "₡" />
            <Picker.Item label = "₱ Peso" value = "₱" />
          </Picker>
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style = {styles.showText}>{this.state.curr}</Text>
          <View style={styles.inp}>
            <TextInput 
                keyboardType = 'numeric'
                placeholder="Monthly Spending Budget"
                underlineColorAndroid='transparent'
                style={{color:'#fff', marginLeft:10,}}
                onChangeText={this.handleBudget}
            />
          </View>
        </View>

        <Text style={{color:'#ffffff80', fontSize:12,}}>*You can change this later in User Profile Setting</Text>

        <TouchableOpacity 
          style={styles.startBut}
          onPress={this.handleStart}
					>
          <Text style={{color:'#fff', fontSize: 30}}>
            {this.state.startBut}
          </Text>
				</TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#339E8A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  title: {
    width: 170,
    marginBottom: 20,
  },

  selectionBox: {
    display: 'flex',
    flexDirection : 'row',
    margin: 20,
  },

  subTitle: {
    height: 50,
    padding: 15,
    marginRight: 20,
  },

  PickBox:{
    width: 130,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginLeft: 20,
  },

  inputBox:{
    display: 'flex',
    flexDirection : 'row',
    margin: 10,
    zIndex: -1,
  },

  showText:{
    color: '#FFF',
    fontSize: 25,
  },

  inp: {
    width: 280,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff70',
  },

  startBut: {
    marginTop: 40,
  }
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    user_id:state.Page.user_id,
  }
}

export default connect(mapStateToProps)(Setup);