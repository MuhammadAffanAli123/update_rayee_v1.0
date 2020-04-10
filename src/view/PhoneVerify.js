import React, { useState, useEffect } from 'react'
import Api from '../utils/Api'
import { Container, Content, Grid, Col, Row, Item,Icon, Input, Button, Text } from 'native-base';
import { Image, StatusBar, Keyboard, Alert , View, StyleSheet } from 'react-native';
import { toast } from '../function/Function'
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserData } from '../function/Function'
import About from './profileAbout1'
import { TextInput } from 'react-native-paper'


export default (props) => {
        const [ verify, setVerify ] = useState({
            code:'',
            token:'',
            error:false
        })

    useEffect(() => {  
        
      AsyncStorage.getItem('token')
        .then(res => {
          const id = res;
            Api.get('/phoneVerify/'+id+'/send')
            .then(res => {
              //console.log(res._response);
                //if(res.data.msg == 'success'){
                    setVerify({...verify, token:res})
                // }
                // else{
                //     toast(res.data.msg, 'red')
                // }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    }, [])

    const {  code, token, error } = verify
    const verifyCode = () => {
      setVerify({...verify, error:true})
      if(code === ''){
          toast('Verification Code Required', 'red')
          setVerify({...verify, error:false})
      }
      else{
          Keyboard.dismiss()
          AsyncStorage.getItem('token')
          .then(res => {
            const id = res;
              Api.get('/phoneVerify/'+id+'/verify/'+code)
              .then(res => {
                  if(res.data.msg == 'success'){
                    setVerify({ ...verify, error:true})
                    Alert.alert(
                      'Verification',
                      'Mobile number verified successfull.',
                      [
                        {text: 'OK', onPress: () => props.navigation.navigate('About',{update:'update'})},
                      ],
                      {cancelable: false},
                    );
    
                    setTimeout(() => {
                      props.navigation.navigate('About')
                    }, 5000);
                  }
                  else{
                    setVerify({ ...verify, error:false})
                    toast(res.data.msg, 'red')
                  }
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
    
    
      }
    }
     
    
  

    
    return(

        <Container style={{ flex:1, backgroundColor:'#18e6d1'}}>
      <StatusBar backgroundColor="#18e6d1" barStyle="default" />
    <Content>
    
    <Grid style={{ justifyContent:'center', alignItems:'center'}}>
    <Row>
    <Col style={{alignItems: 'center', marginTop:100}}>
    <Image source={require('../assets/img/icon1.png')} style={{ width:180, height:53 }}/>
    </Col>
    </Row>

    <Row style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
        <Col style={{width:'80%'}}>
        <Text style={{textAlign:'center', color:'#ffffff', fontSize:16}}>
       OTP is sent to your mobile number, Please check your mobile  SMS.
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
      {/* <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {error === false ? 
        <Button rounded bordered style={{width:'50%', justifyContent:'center', borderColor:'#ffffff'}} disabled={error} onPress={verifyCode}>
          <Text style={{ color:'#ffffff'}}>Verify</Text>
        </Button>
          :
        <UIActivityIndicator color='white'/>
          }
        </Col>
      </Row> */}
      <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {error === false ? 
      
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
    </Container>

    )

    function verifyUser(code, id) {
        return new Promise(async ( resolve, reject ) => {
          await Api.get('/phoneVerify/'+id+'/verify/'+code)
          .then(res => resolve(res))
          .catch(err => reject(err))
        })
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
//   setVerify({...verify, error:true})
//   if(code === ''){
//       toast('Verification Code Required', 'red')
//       setVerify({...verify, error:false})
//   }
//   else{
//       Keyboard.dismiss()
//       AsyncStorage.getItem('token')
//       .then(res => {
//         const id = res;
//           Api.get('/phoneVerify/'+id+'/verify/'+code)
//           .then(res => {
//               if(res.data.msg == 'success'){
//                 setVerify({ ...verify, error:true})
//                 Alert.alert(
//                   'Verification',
//                   'Mobile number verified successfull.',
//                   [
//                     {text: 'OK', onPress: () => props.navigation.navigate('About',{update:'update'})},
//                   ],
//                   {cancelable: false},
//                 );

//                 setTimeout(() => {
//                   props.navigation.navigate('About')
//                 }, 5000);
//               }
//               else{
//                 setVerify({ ...verify, error:false})
//                 toast(res.data.msg, 'red')
//               }
//           })
//           .catch(err => console.log(err))
//       })
//       .catch(err => console.log(err))


//   }
// }