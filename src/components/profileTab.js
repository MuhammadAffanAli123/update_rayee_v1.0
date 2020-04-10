import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Profile from '../view/Profile'
import About from '../view/profileAbout'
import AffanProfile from '../view/AffanProfile'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(  
    {  
        AffanProfile:{
        screen: AffanProfile, 
    },
        Profile: { 
            screen:Profile, 
        },
        About: {
            screen:About
        }
    },  
    {  
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
        },  
     
)  
export default createAppContainer(AppNavigator);  
