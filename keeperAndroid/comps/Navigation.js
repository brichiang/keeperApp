import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

//import { createSwitchNavigator } from 'react-navigation';
import Starting from './Starting';
import Login from './Login';
import Signup from './Signup';
import Setup from './Setup';
import MainPage from './MainPage';
import Photo from './Pages/Photo';
import Picture from './Pages/ReceiptCreate/Picture';

import { connect } from 'react-redux';
import { ChangePage } from '../redux/action';


class Navigation extends React.Component {

  handlePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  render() {

    var curpage = <Starting />

    switch (this.props.page){
			case 1:
				curpage = <Starting />
				break;
			
			case 2:
				curpage = <Login />
				break;
			
			case 3:
				curpage = <Signup />
        break;
        
      case 4:
				curpage = <Setup />
        break;
      
      case 5:
				curpage = <MainPage />
        break;
      
      case 6:
        curpage = <Photo />
        break;

      case 7:
        curpage = <Picture />
        break;
		}

    return (
      <View style={styles.container}>
        {curpage}
      </View>


      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#326273',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  function mapStateToProps(state){
    return {
      page:state.Page.page
    }
  }
  
  export default connect(mapStateToProps)(Navigation);

// export default createSwitchNavigator({
//   Starting: Starting,
//   Login: Login,
//   Signup: Signup,
//   Setup: Setup,
//   MainPage: MainPage,
// });