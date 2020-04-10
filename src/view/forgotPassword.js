import React, { useState, useEffect } from 'react'
import Api from '../utils/Api'
import { Container, Content, Grid, Col, Row, Item, Input, Button, Text } from 'native-base';
import { Image, StatusBar, StyleSheet, View, Keyboard } from 'react-native';
import { toast } from '../function/Function'
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper'

export default (props) => {

    const [ state, setState ] = useState({
        email: null,
        load: false,
        codeLoad:false,
        code: null,
        cpass:null,
        npass:null
    })

    const { email, load, codeLoad, code, cpass, npass } = state

    const sendMail = async () => {
        setState({...state, load:true})
        if(email == null){
            alert('Please enter your email')
            setState({...state, load:false})
        }
        else{
            await Api.post('/forgot-password',{email})
            .then(res => {
                if(res.data.msg == 'success'){
                    setState({...state, load:false, codeLoad:true })
                }
                else if(res.data.msg == 'err'){
                    alert('Email not found in database')
                    setState({...state,load:false})
                }
                else{
                    console.log(res)
                }
            })
            .catch(err => console.log(err.response))
        }
    }

    const verifyCode = async () => {
        setState({...state, load:true})
        if(code == null){
            alert('Please Enter verificaion code')
            setState({...state, load:false})
        }
        else{
            await Api.post('/forgot-password-verify',{email,code})
            .then(res => {
                if(res.data.msg == 'success'){
                    setState({...state, load:false, codeLoad:'t' })
                }
                else if(res.data.msg == 'error'){
                    alert('Code verification failed')
                    setState({...state,load:false})
                }
                else{
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
        }
    }

    const changePassword = async () => {
        const preg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        if(npass == null){
            alert('Please enter new password')
        }
        else if(npass == null){
            alert('Please enter confirm password')
        }
        else if(npass !== cpass){
            alert('Both passwword should be same')
        }
        else if(preg.test(npass)){
            setState({...state, load:true})
            await Api.post('/change-password',{email,npass})
            .then(res => {
                console.log(res.data)
                if(res.data.msg == 'success'){
                    setState({...state, load:false, codeLoad:'t' })
                    alert('Password change successfully')
                    setTimeout(() => {
                        props.navigation.navigate('Login')
                    }, 500);
                }
                else if(res.data.msg == 'error'){
                    alert('Error while updating password. Please try again')
                    setState({...state,load:false})
                }
                else{
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
        }
        else{
            alert('Password must be at least 6 character long and conatin one numeric digit, one uppercase and lowercase letter.')
        }
    }

    return(

        <Container style={{ flex:1, backgroundColor:'#18e6d1'}}>
      <StatusBar backgroundColor="#18e6d1" barStyle="default" />
    <Content>
    
    <Grid style={{ justifyContent:'center', alignItems:'center'}}>
    <Row>
    <Col style={{alignItems: 'center', marginTop:100}}>
    <Image source={require('../assets/img/icon.png')} style={{width:180, height:53}} />
    </Col>
    </Row>

    {codeLoad == false &&  
    <>
    <Row style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
        <Col style={{width:'80%'}}>
        <Text style={{textAlign:'center', color:'#ffffff', fontSize:20 , fontWeight:"bold"}}>
            Enter your email below
        </Text>
        </Col>
    </Row>

      {/* <Row style={{marginTop:30, paddingRight:25, paddingLeft:25}}>
      <Col style={{ alignItems:'center'}}>
        <Item rounded style={{ borderStyle:'solid', borderColor:'#ffffff', alignItems:'center'}}>
        <Input placeholder='Email' style={{ color:'#ffffff', textAlign:'center' }} placeholderTextColor="#ffffff"
        value={email} onChangeText={val => setState({...state, email:val})}
       />
        </Item>
        </Col> */}
             <View style={styles.SectionStyle}>

<Image source={require('./icons/color/email1.png')} style={styles.ImageStyle  } />

<TextInput
  style={{ flex: 1, borderBottomColor:"#18e6d1" ,  backgroundColor: "transparent"  }}
  label="Email"
  theme={{colors: {primary: '#18e6d1'}}}
  underlineColor='#18e6d1'
  value={email}
   onChangeText={val => setState({...state, email:val})}
/>

</View>
        {/* </Row> */}

      <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
        {!load ? 
        <Button  style={{width:'50%', justifyContent:'center', backgroundColor:"white",borderColor:'black'}} disabled={load} onPress={sendMail}>
          <Text style={{ color:'black',fontWeight:"bold",fontSize:20}}>SUBMIT</Text>
        </Button>
        :
        <UIActivityIndicator color='white'/>
        }
        </Col>
      </Row>

      </>
        }

    {codeLoad == true &&
     <>

    {/* <Row style={{marginTop:30, paddingRight:25, paddingLeft:25}}>
      <Col style={{ alignItems:'center'}}>
        <Item rounded style={{ borderStyle:'solid', borderColor:'#ffffff', alignItems:'center'}}>
        <Input placeholder='Code' style={{ color:'#ffffff', textAlign:'center' }} placeholderTextColor="#ffffff"
        value={code} onChangeText={val => setState({...state, code:val})}
       />
        </Item>
        </Col> */}

<View style={styles.SectionStyle}>

<Image source={require('./icons/color/logo.png')} style={styles.ImageStyle} />

{/* <TextInput
  style={{ flex: 1, borderColor: "black", backgroundColor: "transparent" }}
  label="code"
  value={code}
   onChangeText={val => setState({...state, code:val})}
/> */}
<TextInput
  style={{ flex: 1, borderBottomColor:"#18e6d1" ,  backgroundColor: "transparent"  }}
  theme={{colors: {primary: '#18e6d1'}}}
  underlineColor='#18e6d1'
  label="code"
  value={code}
   onChangeText={val => setState({...state, code:val})}
/>


</View>
        {/* </Row> */}

      {/* <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {load === false ? 
        <Button rounded bordered style={{width:'50%', justifyContent:'center', borderColor:'#ffffff'}} disabled={load} onPress={verifyCode}>
          <Text style={{ color:'#ffffff'}}>Verify</Text>
        </Button>
          :
        <UIActivityIndicator color='white'/>
          }
        </Col> */}
        <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {load === false ? 
        <Button rounded bordered style={{width:'50%', justifyContent:'center',backgroundColor:"white", borderColor:'#ffffff'}} disabled={load} onPress={verifyCode}>
          <Text style={{ color:'black' , fontWeight:"bold"}}>Verify</Text>
        </Button>
          :
        <UIActivityIndicator color='white'/>
          }
        </Col>
      </Row>
      {/* </Row> */}
     </>   
     }

    {codeLoad == 't' &&
     <>

    {/* <Row style={{marginTop:30, paddingRight:25, paddingLeft:25}}>
      <Col style={{ alignItems:'center'}}>
        <Item rounded style={{ borderStyle:'solid', borderColor:'#ffffff', alignItems:'center'}}>
        <Input placeholder='New Password' secureTextEntry={true} style={{ color:'#ffffff', textAlign:'center' }} placeholderTextColor="#ffffff"
        value={npass} onChangeText={val => setState({...state, npass:val})}
       />
        </Item>
        </Col>
        </Row> */}
        <View style={styles.SectionStyle}>

        <Image source={require('./icons/color/lock.png')} style={styles.ImageStyle} />

{/* <TextInput
  style={{ flex: 1, borderColor: "black", backgroundColor: "transparent" }}
  label="New Password"
  value={npass} onChangeText={val => setState({...state, npass:val})}
/> */}
<TextInput
  style={{ flex: 1, borderBottomColor:"#18e6d1" ,  backgroundColor: "transparent"  }}
  theme={{colors: {primary: '#18e6d1'}}}
  underlineColor='#18e6d1'
  label="New Password"
  value={npass}
   onChangeText={val => setState({...state, npass:val})}
/>

</View>
        {/* <Row style={{marginTop:30, paddingRight:25, paddingLeft:25}}>
      <Col style={{ alignItems:'center'}}>
        <Item rounded style={{ borderStyle:'solid', borderColor:'#ffffff', alignItems:'center'}}>
        <Input placeholder='Confirm Password' secureTextEntry={true} style={{ color:'#ffffff', textAlign:'center' }} placeholderTextColor="#ffffff"
        value={cpass} onChangeText={val => setState({...state, cpass:val})}
       />
        </Item>
        </Col>
        </Row> */}
        <View style={styles.SectionStyle}>

<Image source={require('./icons/color/logo.png')} style={styles.ImageStyle} />

{/* <TextInput
  style={{ flex: 1, borderColor: "black", backgroundColor: "transparent" }}
  label="Confirm Password"
  value={cpass}
   onChangeText={val => setState({...state, cpass:val})}
/> */}
<TextInput
  style={{ flex: 1, borderBottomColor:"#18e6d1" ,  backgroundColor: "transparent"  }}
  theme={{colors: {primary: '#18e6d1'}}}
  underlineColor='#18e6d1'
  label="Confirm Password"
  value={cpass}
   onChangeText={val => setState({...state, cpass:val})}
/>

</View>
      {/* <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {load === false ? 
        <Button rounded bordered style={{width:'50%', justifyContent:'center', borderColor:'#ffffff'}} disabled={load} onPress={changePassword}>
          <Text style={{ color:'#ffffff'}}>Change Password</Text>
        </Button>
          :
        <UIActivityIndicator color='white'/>
          }
        </Col>
      </Row> */}
       <Row style={{marginTop:20}}>
        <Col style={{alignItems:'center'}}>
          {load === false ? 
        <Button rounded bordered style={{width:'50%', justifyContent:'center',backgroundColor:"white", borderColor:'#ffffff'}} disabled={load} onPress={changePassword}>
          <Text style={{ color:'black' , fontWeight:"bold"}}>Change Password</Text>
        </Button>
          :
        <UIActivityIndicator color='white'/>
          }
        </Col>
      </Row>
     </>   
     }


    </Grid>
    
</Content>
    </Container>

    )
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
    borderBottomColor: '#34aeeb',
    height: "15%",
    width: "75%",
    borderRadius: 12,
    fontSize: 100,
    marginTop: 20,
    marginLeft:"0%"
  },

  ImageStyle: {
    padding:15,
    marginTop: 13,
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