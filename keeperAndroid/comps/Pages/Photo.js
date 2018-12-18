import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
//import {Camera, Permissions} from 'expo';

import {RNCamera as Camera} from 'react-native-camera';
import { connect } from 'react-redux';
import { ChangePage, CreateImage } from '../../redux/action';

class Photo extends React.Component {
  
  state = {
    camType:Camera.Constants.Type.back,
    ImgSrc: null,
    loading:false
  }
  
  //Take Picture
  //async is doing everything in the background
  //if no async the whole application will freeze before it finish loading
  handleShot= async()=>{
    if (this.camera) {

    let photo = await this.camera.takePictureAsync();

      this.setState({
        loading:true
      })

    this.setState({
      ImgSrc:photo.uri,
        loading:false
      })

    this.props.dispatch(CreateImage(this.state.ImgSrc))    
    }
    this.handlePage(7);
  }

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  // async componentWillMount() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  // }

  // cameraFunction(){
  //   this.handleShot();
  //   this.handlePage.bind(this,7);
  // }

  render() {

    if(this.state.loading){
      return (
        <ActivityIndicator 
            animating={true}
            size="large"
            color="#EFEFEF"
            style={styles.loading}
          />
      );
    }

    return (
      <View style={styles.container}>

          

        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.handlePage.bind(this,5)}
            style={styles.exitBut}
          >
            <Image 
              source={require('../imgs/Buttons/Exit_Button.png')}
              style={{resizeMode:'contain', width:30, height:30, marginTop:30, marginLeft:10}}
            />
          </TouchableOpacity>
          <Image 
							source={require('../imgs/NameLogo.png')}
							style={{width:100,height:50,resizeMode:'contain', margin:10}}
						/>
        </View>
        <Camera 
          ref={ref => { this.camera = ref; }}
          style={[styles.camerastyle,{width:Dimensions.get('window').width, height:Dimensions.get('window').height}]} 
          type={this.state.camType}
          ></Camera>
        
        <TouchableOpacity
          onPress={
            //this.handlePage.bind(this,7);
            this.handleShot
          }
          style= {styles.takePicture}
        >
          <Image 
            source={require('../imgs/Buttons/Camera_Button.png')}
            style={styles.buttonStyle}
          />
        </TouchableOpacity>
        
        {/*<Image
          style={{width:300, height:300}}
          resizeMode="cover"
          source={{uri:this.state.ImgSrc}}
          />
        */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:80
  },

  header:{
    width:Dimensions.get('window').width, 
    padding:10, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  exitBut: {
    position: 'absolute',
    left: 10,
    top: 2
  },

  camerastyle: {
    flex: 1,
    justifyContent: 'space-between',
  },

  buttonStyle: {
    width:100,
    height:100,
    resizeMode:'contain',
    margin:20
  }
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Photo);