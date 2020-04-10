import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Image , Row } from 'react-native'
import { Root, Container, Content, Header, Body, Text, Icon } from "native-base";
import { customDrawerContent } from './src/components/CustomDrawerContent'
import Logout from './src/components/Logout'
import Splash from './src/view/Splash'
import Login from './src/view/Login';
import Signup from './src/view/Signup';
import Try1 from './src/view/try'
import Verify from './src/view/Verify';
import Phone from './src/view/PhoneVerify';
//import AffanProfile from './src/view/affanProfile'
import Home from './src/view/Home'
import About from './src/view/profileAbout1'
import Profile from './src/view/profile1'
import AffanProfile from './src/components/profileTab'
import NoInternet from './src/view/NoInternet';
import Category from './src/view/subCategory'
import Survey from './src/view/Survey'
import StartSurvey from './src/view/SurveyStart'
import SurveyDetails from './src/view/SurveyDetails'
import Password from './src/view/forgotPassword'
import Referal from './src/view/Referal'
import Tab from './src/components/Tab'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import OneSignal from 'react-native-onesignal'
import { View } from "react-native-animatable";


const App = () => {


  useEffect(() => {

    OneSignal.init("3735f343-f827-4a98-8de6-8852dc1cc832", {kOSSettingsKeyAutoPrompt : true});

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);


  })

  const onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  const onIds = (device) => {
    console.log('Device info: ', device);
  }


  return (
    <Root>
      <StatusBar backgroundColor="#39ccd4" barStyle="default" />
      <AppContainer />
      {/* <Verify/> */}
      </Root>

    // <View>
    //   <Try1/>
    // </View>
  );
};


const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });


 const Verification = createStackNavigator({
  
  Verify: {
    screen: Verify,
  },
  Profile:{
    screen:Profile
  },
  About:{
    screen:About
  },
  Phone:{
    screen: Phone
  }

},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

 const forgotPassword = createStackNavigator({
  Password: {
    screen: Password,
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

 const Internet = createStackNavigator({
  NoInternet: {
    screen: NoInternet
  }
},

{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });


 const Sur = createStackNavigator({
  Home:{
    screen: Home
  },
  SurveyDetails:{
    screen: SurveyDetails
  },
  startSurvey:{
    screen: StartSurvey
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  backgroundColor:"#03fcf8"
  
 });


 const HomeStack = createStackNavigator({
  AffanProfile:AffanProfile,
  Phone: Phone,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
  
 });
 

//  const drawerNavigator = createDrawerNavigator({
//    Home:{
//      screen: Sur,
//      navigationOptions:{
//        drawerIcon:(
//         <Icon style={{ color:'#333333', fontSize:20}} name='home'/>
//        )
//      }
//    },
//    Profile:{
//     screen: HomeStack,
//     navigationOptions:{
//       drawerIcon:(
//        <Icon style={{ color:'#333333', fontSize:20}} name='contact'/>
//       )
//     }
//   },
//   Referral:{
//     screen: Referal,
//     navigationOptions: {
//       drawerIcon:(
//         <Icon style={{ color:'#333333', fontSize:20}} name='send' />
//       )
//     }
//   },
//    Logout:{
//     screen: Logout,
//     navigationOptions:{
//       drawerIcon:(
//        <Icon style={{ color:'#333333', fontSize:20}} name='home'/>
//       )
//     }
//   }
//  },
// {
//   initialRouteName: 'Home',
//   drawerPosition:'left',
//   contentComponent: customDrawerContent,
//   drawerOpenRoute: 'DrawerOpen',
//   drawerCloseRoute: 'DrawerClose',
//   drawerToggleRoute: 'DrawerToggle'
// })

const drawerNavigator = createBottomTabNavigator({
  //createDrawerNavigator({
    Home:{
      screen: Sur,
      navigationOptions: {
       tabBarLabel:"Home Page",
 
       tabBarIcon: ({ tintColor }) => (
         <Icon style={{color:"black"}}  name="home" size={75}/>
       )
     },
    },
    Profile:{
     screen: HomeStack,
     navigationOptions: {
      tabBarLabel:"profile",

      tabBarIcon: ({ tintColor }) => (
        <Icon style={{color:"black"}} name="person" size={75}/>
      )
    },
   },
   Referral:{
     screen: Referal,
     navigationOptions: {
      tabBarLabel:"Referral",

      tabBarIcon: ({ tintColor }) => (
        <Icon  style={{color:"black"}} name="send" size={75}/>
      )
    },
   },
    Logout:{
     screen: Logout,
     navigationOptions: {
      tabBarLabel:"LOGOUT",
      fontSize:120,

      tabBarIcon: ({ tintColor }) => (
        <Icon  style={{color:"black"}} name="md-log-out" size={75}/>
      )
    },
   }
  },
 // 
 {
   
   tabBarOptions: {
     activeTintColor: 'black',
     inactiveTintColor: 'black',
     activeBackgroundColor:"#03fcf8",
     activeFontSize:70,
     activeIconColor:"blue",
     showIcon: true ,
     style: {
       backgroundColor: 'white',
       borderWidth:2,
       
       
     }
   },
  // tabBarOptions: { activeTintColor:'blue', },
 },
 )

 const switchNavigator = createSwitchNavigator({
   Splash:{
     screen:Splash,
     
   },
   Auth: AppNavigator,
  //  sur:Sur,
   Con: Internet,
   Ver: Verification,
   pass:forgotPassword,
   App: drawerNavigator,
  
 },
 {
   initialRouteName:'Splash'
 }
 )


 //const AppContainer = createAppContainer( Verification)
 const AppContainer = createAppContainer(switchNavigator)

export default App;

const styles = StyleSheet.create({
  image:{
    width:150,
    height:150
  }
})




















