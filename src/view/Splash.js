import React,{ useEffect, useState} from 'react'
import { StatusBar, Animated, View,  Text, Image, Alert , ImageBackground  } from 'react-native';
import { Container, Content, Grid, Row, Column } from 'native-base'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import { FadeInAnim } from '../components/Animate';
import { isSignedIn, getUserData } from '../function/Function'
import { UIActivityIndicator, BallIndicator } from 'react-native-indicators';
import Api from '../utils/Api'

export default (props) => {

    useEffect(() => {

        NetInfo.fetch().then(statee => {
            if(statee.type === 'none'){ 
                setTimeout(() => {
                props.navigation.navigate('NoInternet')
                },2500)
            }
            else{
                if(statee.isConnected === true){
                    setTimeout(() => {

                        AsyncStorage.getItem('token')
                        .then(res => {
                            if(res !== null){
                                Api.get('/check-status/'+res)
                                .then(re => {
                                        if(re.data.msg === 'success'){
                                            props.navigation.navigate('Home')
                                        }
                                        else if(re.data.msg === 'error'){
                                        alert("You'r account has been deactivated. Please contact support for details")
                                        }
                                    })
                                .catch(err => alert('Something went wrong please try again.'))
                            }
                            else{
                                props.navigation.navigate('Login')  
                            }
                        })
                        .catch(err => console.log(err))
                        
                    },3000) 
                }
                else{
                    setTimeout(() => {
                    props.navigation.navigate('NoInternet')
                    },2500)
                }
            }
          });

    },[])

    
    
    return(
        // <View style={{flex:1, backgroundColor:'#03dbfc', justifyContent:'center'}}>
        //     <FadeInAnim >
        //         <View style={{alignItems:'center'}}>
          
        //     <Text style={{marginTop:200}}></Text>
        //       <Image source={require('../assets/img/icon1.png')} style={{width:270, height:120}} />
        //     <BallIndicator color='white' style={{ marginTop:40 }}/>
        //     </View>
        //     {/* <View style={{  marginTop:"45%"    }} >
        //     <Image source={require('../assets/img/bg.png')}  />
        //     </View> */}
        //     </FadeInAnim>
        // </View>

        <View style={{flex:1, backgroundColor:'#18e6d1', justifyContent:'center'}}>
             <StatusBar backgroundColor="#18e6d1" barStyle="default" />
             <ImageBackground source={require('../assets/img/bg1.png')} style={{ flex: 1,
      resizeMode: "cover",
      justifyContent: "center"}}>
             <FadeInAnim >
            <View style={{alignItems:'center'}}>
      
        <Text style={{marginBottom:"5%"}}></Text>
          <Image  style={{width:260, height:100}} />
        <BallIndicator color='white' style={{ marginTop:20 }}/>
        </View>
        {/* <View style={{  marginTop:"45%"    }} >
        <Image source={require('../assets/img/bg.png')}  />
        </View> */}
        </FadeInAnim>
    </ImageBackground>
       
    </View>
    );
}


