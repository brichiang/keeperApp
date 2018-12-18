import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';

import { connect } from 'react-redux';
import { ChangePage } from '../../redux/action';


class UserPage extends React.Component {
  
  state={
    budget:0,
    remain:10,
    spent:0,
    currency:"",
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
        fetch("http://keeperandroid.herokuapp.com/show_receipt.php", {
          method:"POST",
          body:fd
        }).then((resp)=>{
          return resp.json();
        }).then((json)=>{
          console.log(json)
          if(json){
            var total = 0;
            for(var i = 0; i<json.length; i++){
              var obj = json[i].price
              total = total + parseFloat(obj)
            }
            this.setState({
              spent:total
            })
            fetch("http://keeperandroid.herokuapp.com/show_user.php", {
                method:"POST",
                body:fd
              }).then((resp)=>{
                return resp.json();
              }).then((json)=>{
                console.log(json)
                if(json){
                  this.setState({
                    budget:json[0].budget,
                    currency:json[0].currency,
                    remain:json[0].budget-total
                  })
                }
            });
          }
        });
        
      }
    });
    
    console.log(this.series);
  }
  
  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

// componentWillMount=()=>{
//   this.setState({
//     remain:this.state.budget-this.props.showSpent,
//   })
//   if(this.state.remain>0){
//     this.setState({
//       pie_remain:this.state.remain
//     })
//   }
  //console.log(this.props.showSpent, this.state.pie_remain)
// }

  render() {
    const chart_wh = 250
    const series = [this.state.spent, this.state.remain]
    const sliceColor = ['#E39774','#2EAA9B']
    // console.log(series);
    return (
      <View style={styles.container}>

        <View style={styles.pieBox}>
          <Text style={{color:'#326273', fontSize:20, marginBottom:'5%',marginTop: '10%', fontWeight:'bold'}}>Budget Insight</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
          />
        </View>
        <View style={styles.showBox}>
          <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{color:'#326273', fontSize:15,}}>
          Budget: {this.state.currency}{this.state.budget}
          </Text>

          <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{color:'#E39774', fontSize:15,}}>
          Spent: {this.state.currency}{this.state.spent.toFixed(2)}
          </Text>

          <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{color:'#2EAA9B', fontSize:15, margin:'1%'}}>
          Remaining: {this.state.currency}{this.state.remain.toFixed(2)}
          </Text>
          
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pieBox:{
    width:'80%',
    height:'50%',
    justifyContent: 'center',
    alignItems: 'center',
    flex:0.6,
  },

  showBox: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#326273',
    borderRadius:10,
    width:'70%',
    paddingTop:'3%',
    paddingBottom:'2%',
    marginTop:50,
    flex:0.3,
    flexDirection:'column',
    justifyContent:'space-around'
  }
	
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    showCurrency:state.Page.currency,
    showBudget:state.Page.budget,
    showPrice:state.Page.price,
    user_id:state.Page.user_id,

  }
}

export default connect(mapStateToProps)(UserPage);