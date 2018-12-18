import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Picker } from 'react-native';

import { connect } from 'react-redux';
import { ChangePage, SetBudget } from '../../redux/action';

class UserSetting extends React.Component {
  
  state = {
    currency:"",
    budget:0,
    showBudget:0,
    displayBudget:0
  }

  updateCurr =(curr)=>{
    this.setState({ 
      currency: curr 
    })
  }

  handleText=(text)=>{
    if(text === ''){
      this.setState({
        showBudget:0
      })
    }else{
      this.setState({
        budget:parseFloat(text),
        showBudget:parseFloat(text)
      })
    }
  }

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  componentWillMount=()=>{
    var fd= new FormData();
    fd.append("user_id", this.props.user_id);
    fetch("http://keeperandroid.herokuapp.com/show_budget.php", {
     method:"POST",
     body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      console.log(json)
      if(json){
        var fd= new FormData();
        fd.append("user_id", this.props.user_id);
        fetch("http://keeperandroid.herokuapp.com/show_user.php", {
          method:"POST",
          body:fd
        }).then((resp)=>{
          return resp.json();
        }).then((json)=>{
          console.log(json)
          if(json){
            this.setState({
              displayBudget:json[0].budget,
              currency:json[0].currency,
            })
          }
       });
      }
    });
  }

  handleUpdate=()=>{
    //this.props.dispatch(SetBudget(this.state.curr, this.state.budget))
    var fd = new FormData();
        fd.append("budget", this.state.budget);
        fd.append("currency", this.state.currency);
        fd.append("user_id", this.props.user_id)
      console.log(fd);
      fetch("http://keeperandroid.herokuapp.com/update_budget.php",{
        method:"POST",
        body:fd
      }).then((resp)=>{
        //console.log(resp)
        return resp.json();
      }).then((json)=>{
        console.log(json)
        if(json.status){
          var fd = new FormData();
              fd.append("budget", this.state.budget);
              fd.append("currency", this.state.currency);
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
                this.props.dispatch(SetBudget(this.state.currency,this.state.budget))
                alert("Your budget has been updated!")
              } 
            });
          }
        });
      }




  render() {

    return (
      <View style={styles.container}>

        <View style={styles.allset}>

            <View style={styles.showBudget}>
              <Text style={{fontSize:25, color:'#326273'}}>Current Budget</Text>
              <Text style={{color:'#E39774', fontSize:25}}>{this.state.currency}{this.state.displayBudget}</Text>
            </View>
            
            <View style={styles.currencyBox}>
              <Text style={{fontSize:25, color:'#326273', marginRight:100}}>Set Currency</Text>
              <View style={styles.PickBox}>
                <Picker 
                  selectedValue = {this.state.currency} 
                  onValueChange = {this.updateCurr}
                >
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

            <View style={styles.BudgetBox}>
              <Text style={{fontSize:25, color:'#326273', marginRight:50}}>Set Budget</Text>
            <View style={styles.BudgetInp}>
              <Text style={{fontSize:25, color:'#339E8A', marginRight:20, marginTop:5}}>{this.state.currency}</Text>
              <TextInput 
                placeholder='0'
                onChangeText={this.handleText}
                keyboardType = 'numeric'
                style={{width:'100%', fontSize:20}}
                maxLength={7}
              />
            </View>
            </View>
        </View>

        <View style={styles.butBox}>
          <TouchableOpacity
            onPress={this.handleUpdate}
            style={styles.UpdateView}
          >
            <Text style={styles.UpdateBut}>Save</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            onPress={this.handlePage.bind(this, 1)}
          >
            <Text style={styles.logoutBut}>Logout</Text>
         </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
  },
  
  currencyBox: {
    flexDirection:'row',
    display:'flex',
    margin: 20,
    marginRight: 0,
    marginTop: 30,
    position:'relative',
  },

  BudgetBox: {
    flexDirection:'column',
    display:'flex',
    margin: 20,
    position:'relative',
    width: '85%',
  },

  showBudget: {
    margin: 10,
    alignItems:'center',
    justifyContent:'center',
  },
  
  BudgetInp: {
    flexDirection:'row',
    display:'flex',
    position:'relative',
  },

  settingIcon: {
    position:'absolute',
    top: 20,
    left: 30,
  },

  PickBox:{
    width: 130,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 5,
    position:'absolute',
    right:0,
  },

  allset: {
    flex:0.6,
  },

  butBox:{
    width:'100%',
    flexDirection:'column',
    display:'flex',
    flex:0.4,
    alignItems:'center',
    justifyContent:'center',
  },
  
  UpdateView:{
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'rgba(196,196,196,0.2)',
    paddingBottom: '7%',
    width:'80%',
    alignItems: "center",
  },

  UpdateBut: {
    color: '#2EAA9B',
    fontSize: 25,
    fontWeight: 'bold',
  },
  
  logoutBut: {
    color: '#E39774',
    fontSize: 20,
    marginTop:'8%',
  },
	
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    showCurrency:state.Page.currency,
    showBudget:state.Page.budget,
    user_id:state.Page.user_id,
  }
}

export default connect(mapStateToProps)(UserSetting);