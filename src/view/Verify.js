import React, { useState, useEffect } from 'react'
import Api from '../utils/Api'
import { Container, Content, Grid, Col, Row, Icon,Item, Input, Text,Button } from 'native-base';
import { Image, StatusBar, Keyboard , StyleSheet, View,  } from 'react-native';
import { toast } from '../function/Function'
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper'
import Profile from './profile1'
import Dialog from "react-native-dialog";


export default (props) => {
        const [ verify, setVerify ] = useState({
            code:'',
            error:false
        })

    const {  code, error } = verify

     const verifyCode = () => {
          if(code === ''){
              toast('Verification Code Required', 'red')
              setVerify({...verify, error:false})
          }
          else{
            setVerify({...verify, error:true})
              Keyboard.dismiss()
              const token = props.navigation.getParam('token');
              verifyUser( code, token )
            .then((res) => {
              if(res.data.msg === 'success'){
                  setVerify({ ...verify, error:true})
                  storeToken (res.data.res)
                  setTimeout(() => {
                    props.navigation.navigate('Profile')
                  }, 1000);
              }
              else{
                  setVerify({ ...verify, error:false})
                  toast(res.data.msg, 'red')
              }
            })
            .catch(err => alert(err))
          }
      }
    return(

        <Container style={{ flex:1, backgroundColor:'#18e6d1'}}>
      <StatusBar backgroundColor="#18e6d1" barStyle="default" />
      
    <Content>
    <Grid style={{ justifyContent:'center', alignItems:'center' }}>
    
    <Row>
    <Col style={{alignItems: 'center', marginTop:100}}>
    <Image source={require('../assets/img/icon1.png')} style={{ width:180, height:53 }} />
    </Col>
    </Row>

    <Row style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
        <Col style={{width:'80%'}}>
        <Text style={{textAlign:'center', color:'#ffffff', fontSize:16}}>
            An email has been sent to your email.
        </Text>
        </Col>
    </Row>

      {/* <Row style={{marginTop:30, paddingRight:25, paddingLeft:25}}>
      <Col style={{ alignItems:'center'}}>
        <Item rounded style={{ borderStyle:'solid', borderColor:'#ffffff', alignItems:'center'}}>
        <Input placeholder='Code' style={{ color:'#ffffff', textAlign:'center' }} placeholderTextColor="#ffffff"
        value={code} onChangeText={val => setVerify({...verify, code:val})}
       />
        </Item>
        </Col>
        </Row> */}

<View style={styles.SectionStyle}>

<Image source={require('./icons/color/email1.png')} style={styles.ImageStyle} />

<TextInput
  style={{ flex: 1, borderColor: "black", backgroundColor: "transparent" }}
  label="Code"
  value={code}
   onChangeText={val => setVerify({...verify, code:val})}
/>


</View>

      <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {error === false ? 
        // <Button rounded bordered style={{width:'50%', justifyContent:'center', borderColor:'#ffffff'}} disabled={error} onPress={verifyCode}>
        //   <Text style={{ color:'#ffffff'}}>Verify</Text>
        // </Button>
        <Button rounded bordered style={{ width: '80%', justifyContent: 'center',backgroundColor:"black", alignItems: 'center', borderColor: '#ffffff' }} disabled={error} onPress={verifyCode}>
        <Icon name='' style={{ color: 'white' }}
    
        />
        <Text style={{ marginLeft: '-10%',borderBottomWidth: 4,borderBottomColor:"black", color: 'white',fontWeight:"bold" }}>Verify</Text>

      </Button>
          :
        <UIActivityIndicator color='white'/>
          }
        </Col>
      </Row>

    </Grid>
    
</Content>

<Text style={{height:105,bottom:0,justifyContent:"flex-end",width:"100%",fontWeight:"bold",color:"white", justifyContent:"center" , alignItems:"center", marginLeft:"2%", marginRight:"2%"}}>
  Thanks for creating your Raaye Account. To Continue, please verify your email address from your inbox (of check your Junk/Spam mail folder)
  </Text>

    </Container>

    )

    function verifyUser(code, id) {
        return new Promise(async ( resolve, reject ) => {
          await Api.post('/verify', { code, id })
          .then(res => resolve(res))
          .catch(err => reject(err))
        })
      }

      async function storeToken (userData){
        await AsyncStorage.setItem('token', userData.token)
        await AsyncStorage.setItem('fname', userData.fname)
        await AsyncStorage.setItem('lname', userData.lname)
        await AsyncStorage.setItem('email', userData.email)
        await AsyncStorage.setItem('phone', userData.phone)
        await AsyncStorage.setItem('refCode', userData.ref_code)
        await AsyncStorage.setItem('img', JSON.stringify(userData.img))
        await AsyncStorage.setItem('status', JSON.stringify(userData.status))
      }
}



const styles = StyleSheet.create({

  container: {

    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
    borderBottomWidth: 7,
    borderBottomColor: 'blue',
    height: 60,
    width: "90%",
    borderRadius: 12,
    borderColor: "white",
    fontSize: 100,
    margin: 10
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  ImageStyle1: {
    padding: 10,
    margin: 5,
    marginRight:10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },

});










    // const verifyCode = () => {
    //     if(code === ''){
    //         toast('Verification Code Required', 'red')
    //         setVerify({...verify, error:false})
    //     }
    //     else{
    //       setVerify({...verify, error:true})
    //         Keyboard.dismiss()
    //         const token = props.navigation.getParam('token');
    //         verifyUser( code, token )
    //       .then((res) => {
    //         if(res.data.msg === 'success'){
    //             setVerify({ ...verify, error:true})
    //             storeToken (res.data.res)
    //             setTimeout(() => {
    //               props.navigation.navigate('Phone')
    //             }, 1000);
    //         }
    //         else{
    //             setVerify({ ...verify, error:false})
    //             toast(res.data.msg, 'red')
    //         }
    //       })
    //       .catch(err => alert(err))
    //     }
    // }