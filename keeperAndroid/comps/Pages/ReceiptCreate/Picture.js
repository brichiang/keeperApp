import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Picker, Dimensions, CheckBox } from 'react-native';
//import Photo from '../Photo';
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux';
import { ChangePage, CreateReceipt, Id } from '../../../redux/action';


class Picture extends React.Component {

	state={
		selection:0,
		price:0,
		name:"",
		location:"",
		date:"",
		return_date:"",
		currency:""
	}

	date = new Date().getDate();
	month = new Date().getMonth()+1;
	year = new Date().getFullYear();
	today = this.year + '-' + this.month + '-' + this.date;
	myDate = new Date();

	handlePage=(page)=>{
    this.props.dispatch(ChangePage(page))
	}

	handleSelect=(select)=>{
		this.setState({
			selection:select
		})
	}

	componentWillMount=()=>{
		var fd= new FormData();
		fd.append("user_id", this.props.user_id);
		fetch("https://keeperandroid.herokuapp.com/show_budget.php", {
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
				  //budget:json[0].budget,
				  currency:json[0].currency,
				})
			  }
		   });
		  }
		});   
	  }

	handleCreate=async()=>{
		var fd = new FormData();
			fd.append("picture", this.props.showImg);
			fd.append("title", this.state.name);
			fd.append("location", this.state.location);
			fd.append("date", this.state.date);
			fd.append("return_date", this.state.return_date);
			fd.append("price", this.state.price);
			fd.append("user_id", this.props.user_id);
		fetch("http://keeperandroid.herokuapp.com/insert_receipt.php",{
			method:"POST",
			body:fd
		}).then((resp)=>{
			return resp.json();
		}).then((json)=>{
			//console.log(json)
			if(json){
				//this.props.dispatch(Id(json.receipt_id))
				alert("Receipt Added");
				this.handlePage(5)
			}
			//this.handlePage(5)
		});
		this.props.dispatch(CreateReceipt(this.state.price,this.state.name,this.state.location,this.state.date,this.state.return_date))
	}

	handleTextInput=(text, type)=>{
		if(type === "price"){
			this.setState({
				price:parseFloat(text)
			})
		}
		if(type === "location"){
			this.setState({
				location:text
			})
		}
	}

	updateItem =(item)=>{
    this.setState({ 
      name: item
    })
  }

	handleDate=(val, type)=>{
		if(type === "date"){
			this.setState({
				date:val
			})
		}
		if(type === "return_date"){
			this.setState({
				return_date:val
			})
		}
	}

  render() {
		var comp = 1;

		switch(this.state.selection){
			case 1:
				comp = 
				<View 
					style={styles.inputBox}
					behavior='padding' enabled
					>

					<TouchableOpacity
            onPress={this.handleSelect.bind()}
            style={styles.exitBut}
          >
            <Image 
              source={require('../../imgs/Buttons/Exit_Button.png')}
              style={{resizeMode:'contain', width:30, height:30}}
            />
          </TouchableOpacity>

					<TouchableOpacity onPress={this.handleCreate} style={styles.saveBut}>
						<Text style={{fontSize:25, color:'#2EAA9B'}}>Save</Text>
					</TouchableOpacity>
					<TextInput 
						placeholder={this.state.currency}
						underlineColorAndroid='transparent'
						style={[styles.inp,{fontSize:35}]}
						onChangeText={(text)=>this.handleTextInput(text, "price")}
						keyboardType = 'numeric'
					/>
					{/* <TextInput 
						placeholder='Title'
						underlineColorAndroid='transparent'
						style={styles.inp}
						onChangeText={(text)=>this.handleTextInput(text, "name")}
					/> */}

					<View style={styles.PickBox}>
          <Picker selectedValue = {this.state.name} onValueChange = {this.updateItem}>
            <Picker.Item label = "Choose Category" value = "" />
						<Picker.Item label = "Accessories" value = "Accessories" />
						<Picker.Item label = "Baby" value = "Baby" />
						<Picker.Item label = "Beauty" value = "Beauty" />
						<Picker.Item label = "Books" value = "Books" />
            <Picker.Item label = "Clothes" value = "Clothes" />
            <Picker.Item label = "Collectibles" value = "Collectibles" />
            <Picker.Item label = "Entertainment" value = "Entertainment" />
            <Picker.Item label = "Electronic" value = "Electronic" />
            <Picker.Item label = "Foods" value = "Foods" />
            <Picker.Item label = "Supplies" value = "Supplies" />
						<Picker.Item label = "Services" value = "Services" />
          </Picker>
          </View>

					<TextInput 
						placeholder='Place of Purchase'
						underlineColorAndroid='transparent'
						style={styles.inp}
						onChangeText={(text)=>this.handleTextInput(text, "location")}
					/>



					<View style={{flexDirection:"row", marginRight:-20}}>
						<Image 
							source={require('../../imgs/Buttons/Calendar_Option.png')}
							style={{resizeMode:'contain', width:35, height:35, marginRight:40}}
						/>
						<DatePicker 
							onDateChange={(val)=>{
								this.handleDate(val, "date")
							}}
							date={this.state.date}
							customStyles={{dateInput:{borderLeftWidth: 0,borderRightWidth: 0,borderTopWidth: 0,}}}
							confirmBtnText="Save"
							cancelBtnText="Cancel"
							format="YYYY-MM-DD"
							placeholder="YYYY-MM-DD"
							showIcon={false}
							maxDate={this.today}
						/>
					</View>



					<View style={{flexDirection:"row", marginRight:0}}>
						<Text style={{color:'#326273', fontSize:15, paddingTop:20, marginRight:20}}>Returnable?</Text>
						<DatePicker 
							onDateChange={(val)=>{
								this.handleDate(val, "return_date")
							}}
							date={this.state.return_date}
							style={styles.date}
							customStyles={{dateInput:{borderLeftWidth: 0,borderRightWidth: 0,borderTopWidth: 0,}}}
							confirmBtnText="Save"
							cancelBtnText="Cancel"
							format="YYYY-MM-DD"
							placeholder="Return By Date"
							showIcon={false}
							minDate={this.state.date}
						/>
					</View>
				</View>	
				break;

			default:
				comp =
				<View style={styles.choiceBox}>
					<Text style={{color:'#326273', fontSize:20}}>Keep it?</Text>
					<View style={styles.choice}>
						<TouchableOpacity
							onPress={this.handlePage.bind(this,6)}
						>
							<Image 
								source={require('../../imgs/Buttons/No_Button.png')}
								style={styles.but}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.handleSelect.bind(this,1)}
						>
							<Image 
								source={require('../../imgs/Buttons/Yes_Button.png')}
								style={styles.but}
							/>
						</TouchableOpacity>
					</View>
				</View>
				break;
		}

    return (
      <View style={styles.container}>

				<View style={styles.header}>
        <View style={styles.logo}>
          <Image 
						source={require('../../imgs/NameLogo.png')}
						style={{width:100,height:50,resizeMode:'contain', margin:10}}
					/>
        </View>
				</View>

				<View>
					<Image 
						style={{width:500,height:Dimensions.get('window').height, resizeMode:'cover', transform: [{ rotate: '90deg'}]}}
						resizeMode="cover"
						source={{uri:this.props.showImg}}
					/>
				</View>
					
					{comp}

			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
	},

	header: {
		backgroundColor: '#fff',
		justifyContent: 'center', 
		alignItems: 'center',
		position:'absolute',
		width: Dimensions.get('window').width,
		top:0,
		zIndex:20
	},

	logo: {
		//width:Dimensions.get('window').width, 
		paddingTop:20,
	},

	choiceBox:{
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: 200,
		backgroundColor:'#FFF',
		bottom: 0
	},

	choice: {
		flexDirection: 'row',
	},
	
	but: {
		width: 100,
		resizeMode:'contain',
		marginLeft:40,
		marginRight:40
	},

	inputBox:{
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: 450,
		backgroundColor:'#FFF',
		bottom: 0
	},

	exitBut:{
		position:'absolute',
		top:20,
		left:25
	},

	saveBut:{
		position:'absolute',
		top: 15,
		right: 25,
	},

	inp: {
    width: 240,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#326273',
    margin: 10,
	},

	PickBox:{
		width: 240,
		borderBottomWidth: 2,
    borderBottomColor: '#326273',
	},
	
});

function mapStateToProps(state){
  return {
		showImg:state.Page.img,
		showCurrency:state.Page.currency,
		showPrice:state.Page.price,
    	showName:state.Page.name,
		showLocation:state.Page.location,
		showDate:state.Page.date,
		showRDate:state.Page.return_date,
		user_id:state.Page.user_id,
		receipt_id:state.Page.receipt_id
  }
}

export default connect(mapStateToProps)(Picture);