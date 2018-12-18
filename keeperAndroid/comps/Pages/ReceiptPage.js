import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView, Picker } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';
import { ChangePage, ChangeSpent } from '../../redux/action';

class ReceiptPage extends React.Component {

  state={
    receipts:[],
    searchedReceipts:[],
    modal:false,
    currency: "",
    receipt:{},
    total:0,
    search:"",
    rev:{flexDirection:'column-reverse'},
    name:'',
    rAmount:0,
  }

  total=0;
  returnText="";
  returnTextColor="";
  daysTextColor="";
  remainDays=0;
  // date = new Date().getDate();
	// month = new Date().getMonth()+1;
	// year = new Date().getFullYear();
  // today = this.year + '-' + this.month + '-' + this.date;
  today = new Date().toISOString().split('T')[0]
  
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
        var total = 0;
          for(var i = 0; i<json.length; i++){
            var obj = json[i].price
            total = total + parseFloat(obj)
          }
        this.setState({
          receipts:json,
          total:total,
          currency:json[0].currency,
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

  handleRemove=(id)=>{
    var fd= new FormData();
    fd.append("id", id);
    fetch("http://keeperandroid.herokuapp.com/delete_receipt.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      //console.log(resp)
      return resp.json();
    }).then((json)=>{
      //console.log(json)
      if(json){
        alert("Receipt Deleted")
        this.setState({
          modal:false
        })
        var fd= new FormData();
        fd.append("user_id", this.props.user_id);
        fetch("http://keeperandroid.herokuapp.com/show_receipt.php", {
          method:"POST",
          body:fd
        }).then((resp)=>{
          return resp.json();
        }).then((json)=>{
          console.log(json)
          if(json){
            this.setState({
              receipts:json
            })
          }
        });
      }
    });
  }
  
  handleAdd=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  handleDetail=(obj)=>{
    //alert(this.state.modal)
    this.setState({
      modal:true,
      receipt:obj
    })
  }

  handleClose=()=>{
    this.setState({
      modal:false
    })
  }

  handleSearch=(text)=>{
    var fd= new FormData();
    fd.append("user_id", this.props.user_id);
    fd.append("title", text);
    fetch("http://keeperandroid.herokuapp.com/search_receipt.php", {
     method:"POST",
     body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          searchedReceipts:json,
        })
      }
    });
  }

  render() {
      let verse = this.state.rev;
      const startDate = this.state.receipt.return_date;
      const endDate = this.today;
      const timeDiff = (new Date(startDate)) - (new Date(endDate));
      const days = timeDiff / (1000 * 60 * 60 * 24);

    if(days<0){
      this.returnText="Non-Returnable ",
      this.returnTextColor="#D3D3D3",
      this.daysTextColor="#D3D3D3",
      this.remainDays= 0
    }else{
      if(this.state.receipt.return_date === ""){
        this.returnText="Non-Refunable",
        this.returnTextColor="#D3D3D3",
        this.daysTextColor="#D3D3D3",
        this.remainDays= 0
      }else{
        this.returnText="Returnable Until ",
        this.returnTextColor="#E39774",
        this.daysTextColor="#2EAA9B",
        this.remainDays= days
      }
    }

    var modal=null;
    
    if(this.state.modal===true ){
      modal = (
      <View style={styles.detailBox}>
        <View style={styles.detailHead}>
        <TouchableOpacity
          onPress={this.handleClose}
        >
          <Image 
            source={require('../imgs/Buttons/Exit_Button.png')}
            style={{resizeMode:'contain', width:25, height:25, margin:20,marginLeft:'5%'}}
          />
        </TouchableOpacity>
        </View>

          <Image 
            style={styles.imgBox}
            source={{uri:this.state.receipt.picture}}
            resizeMode="cover"
          />
        <View style={styles.info}>
          <View>
            <Text style={[styles.title,{fontSize:25, color:'#326273'}]}>{this.state.receipt.title}</Text>
            <Text style={{fontSize:20, color:'#2EAA9B'}}>{this.state.receipt.location}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:15, color:'#326273'}}>Purchased on </Text>
              <Text style={{fontSize:15, color:'#2EAA9B'}}>{this.state.receipt.date}</Text>
            </View>
            {/* <Text style={{fontSize:10}}>{this.state.receipt.return_date}</Text> */}
         </View>
          <Text style={{fontSize:25, color:'#326273',position:'absolute',right:'5%'}}>{this.state.currency}{this.state.receipt.price}</Text>
        </View> 

        <View style={styles.expireinfo}>
          <Text style={{color:this.returnTextColor, fontSize:18}}>{this.returnText}{this.state.receipt.return_date}</Text>
          <Text style={{color:this.daysTextColor, fontSize:25}}>{this.remainDays}</Text>
          <Text style={{color:this.daysTextColor, fontSize:16}}>days left</Text>
          <Text style={{color:this.daysTextColor, fontSize:13}}>till expiry</Text>
        </View>

          <TouchableOpacity style={styles.removeBut} onPress={this.handleRemove.bind(this, this.state.receipt.receipt_id)}>
            <Text style={{color:'red'}}>Remove Receipt</Text>
          </TouchableOpacity>
      </View>
    )
  }
    var recarr = this.state.receipts;
      if (this.state.searchedReceipts.length > 0) {
        recarr = this.state.searchedReceipts
      } else {
        recarr = this.state.receipts
      }

    var item = recarr.map((obj, i)=>{
      
      this.state.rAmount = [i+1];

      return(
        <TouchableOpacity style={styles.rBox} key={i} onPress={(val)=>{
          this.handleDetail(obj)}}>
          <Image 
            style={[styles.picture,{width:120, height:120}]}
						resizeMode="cover"
						source={{uri:obj.picture}}
          />
          <View style={{flexDirection:'column', display:'flex',justifyContent: 'center',margin:10}}>
            <Text style={[styles.title,{fontSize:20,color:'#326273'}]}>{obj.title}</Text>
            <Text style={{fontSize:10,color:'#2EAA9B'}}>{obj.location}</Text>
            <Text style={{fontSize:10, color:'#E39774'}}>{obj.return_date}</Text>
          </View>
          <Text style={{fontSize:25, color:'#326273', right: 20, top:35, position:'absolute'}}>{this.state.currency}{obj.price}</Text>
        </TouchableOpacity> 
      )
    })
    //console.log(this.props);
    return (
      <View style={styles.container}>

      {modal}
        <View style={styles.searchbar}>
        <SearchBar
          onChangeText={(val)=>{
            this.handleSearch(val)}}
          //onClear={someMethod}
          //showLoadingIcon
          placeholder='Search Receipts'
          inputStyle={{backgroundColor:'#FFF', color:'#326273'}}
          containerStyle={{backgroundColor:'#FFF',paddingLeft:10,borderBottomColor:'#32627350',borderTopColor:'#32627350'}}
          placeholderTextColor={'#32627350'}
        /> 
        </View>

        <View style={styles.totalBox}>
          
          <View style={{color:'#ffffff', marginLeft:20, justifyContent: 'center'}}>
            <Text style={{color:'#326273'}}>Total Receipts</Text>
            <Text style={{fontSize:20, color:'#ffffff'}}>{this.state.rAmount}</Text>
          </View>
          
          <View style={{right: 20, top: 5, position:'absolute', justifyContent: 'center'}}>
            <Text style={{color:'#326273'}}>Total</Text>
            <Text style={{fontSize:20, color:'#ffffff'}}>{this.state.currency}{this.state.total.toFixed(2)}</Text>
          </View>

        </View>
        
        <ScrollView>
        <View style={verse}>
          {item}
        </View>

        <View style={styles.emptyBox}>
        </View>
        </ScrollView>
        
        <View style={styles.but}>
        <TouchableOpacity 
          style={styles.AddBut} 
          onPress={this.handleAdd.bind(this,6)}
          >
          <Image 
            source={require('../imgs/Buttons/Add_Button.png')}
            style={{resizeMode:'contain', width:70, height:70}}
          />
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  detailBox: {
    position:'absolute',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    backgroundColor:'#FFF',
    zIndex:2,
    alignItems: 'center',
    //justifyContent: 'center',
    flex: 1,
  },

  detailHead: {
    width:Dimensions.get('window').width,
    top: 0,
    //position: 'absolute'
  },

  imgBox: {
    width:250,
    height:410,
    marginTop:-80,
    transform: [{ rotate: '90deg'}]
  },

  picture:{
    backgroundColor:'#D3D3D3',
    transform: [{ rotate: '90deg'}]
  },

  info:{
    width:'100%',
    flexDirection:'row',
    marginTop:-60,
    paddingLeft:'5%',
  },

  expireinfo:{
    alignItems: 'center',
    marginTop:20,
    marginBottom:20,
    paddingBottom:20,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'rgba(196,196,196,0.2)',
  },

  searchbar: {
    width:Dimensions.get('window').width,
    top: 0,
  },

  totalBox: {
    width:Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#2EAA9B',
    justifyContent: 'center',
  },

  rBox: {
    width:Dimensions.get('window').width,
    flexDirection:'row',
    display:'flex',
    margin: 2
  },

  emptyBox:{
    width:Dimensions.get('window').width,
    height:150
  },
  
  but: {
    position: 'absolute',
    width:Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0
  },

  AddBut: {
    position: 'absolute',
    bottom: 30
  }
	
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
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

export default connect(mapStateToProps)(ReceiptPage);