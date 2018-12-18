import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { CalendarList } from 'react-native-calendars';


class CalenderPage extends React.Component {
  
  state={
    budget:0,
    remain:10,
    spent:0,
    currency:"",
    date:"",
  }

  componentWillMount=()=>{
    var fd= new FormData();
    fd.append("user_id", this.props.user_id);
    fetch("http://keeperandroid.herokuapp.com/show_receipt.php", {
     method:"POST",
     body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          receipts:json,
          date:json[0].date
        })
      }
    });
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
        // var fd= new FormData();
        // fd.append("user_id", this.props.user_id);
        fetch("http://keeperandroid.herokuapp.com/show_user.php", {
          method:"POST",
          body:fd
        }).then((resp)=>{
          return resp.json();
        }).then((json)=>{
          console.log(json)
          if(json){
            this.setState({
              currency:json[0].currency,
            })
          }
       });
      }
    }); 
  }

  handleDetail=(obj)=>{
    //alert(this.state.modal)
    this.setState({
      modal:true,
      receipt:obj
    })
  }


  render() {
    //var markedDates = {'2018-11-01': {dots: [{key:'refund', color: '#E39774', selectedDotColor: '#E39774'}]}}
    // const refund = {key:'refund', color: '#E39774', selectedDotColor: '#E39774'};
    // const nonrefund = {key:'nonrefund', color: '#326273', selectedDotColor: '#326273'};

    return (
      <View style={styles.container}>
        {/* <Text>{this.state.date}</Text> */}
        <CalendarList
          style={{
            width:'100%',
            height:'100%',
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#2EAA9B',
            todayBackgroundColor: '#2EAA9B',
            todayTextColor: '#ffffff',
            dayTextColor: '#2EAA9B',
            arrowColor: '#32627370',
            textDayFontSize: 18,
            'stylesheet.calendar-list.main': {
              calendar: {
                height:Dimensions.get('window').height,
              }
            },
            'stylesheet.calendar.header': {
              monthText: {
                color: '#E39774',
                fontSize:30,
                fontWeight:'bold',
                marginTop:'6%',
                marginBottom:'6%',
              }, 
              dayHeader: {
                textAlign: 'center',
                fontSize: 16,
                color: '#2EAA9B',
              },
            },
            'stylesheet.day.multiDot': {
              base: {
                marginBottom: '20%',
                paddingBottom:'10%',
                paddingRight:'5%',
                borderRadius:3,
              },
              dot: {
                width:7,
                height:7,
                marginLeft:2,
                borderRadius:5,
              },
            }
          }}
          horizontal={true}
          pagingEnabled={true}
          hideArrows={false}

          markingType={'multi-dot'}
          markedDates={
            {'2018-11-17': {dots: [{key:'refund', color: '#E39774', selectedDotColor: '#E39774'}]},
            '2018-11-27': {dots: [
              {key:'refund', color: '#E39774', selectedDotColor: '#E39774'},
              {key:'nonrefund', color: '#326273', selectedDotColor: '#326273'}]},
            '2018-12-06': {dots: [
              {key:'refund', color: '#E39774', selectedDotColor: '#E39774'},
              {key:'nonrefund', color: '#326273', selectedDotColor: '#326273'}]},
            '2018-12-07': {dots: [{key:'refund', color: '#E39774', selectedDotColor: '#E39774'}]}
            }
          }
        />
        

      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
	
});


function mapStateToProps(state){
  return {
    page:state.Page.page,
    showDate:state.Page.date,
    showImg:state.Page.img,
    showPrice:state.Page.price,
    showName:state.Page.name,
    showLocation:state.Page.location,
    showCurrency:state.Page.currency,
    user_id:state.Page.user_id,
    receipt_id:state.Page.receipt_id
    //receiptItem:state.Page.receiptItem
  }
}

export default connect(mapStateToProps)(CalenderPage);