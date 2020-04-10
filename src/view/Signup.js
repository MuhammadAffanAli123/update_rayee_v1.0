import React, { useState, useEffect, Component } from 'react'
import { Container, Content, Grid, Col, Row, Item, Input, Icon, Button, Text, Label, Radio } from 'native-base';
import { Image, StatusBar, Picker, StyleSheet, Keyboard, View, PermissionsAndroid, CheckBox, Linking, TouchableOpacity } from 'react-native';
import { Overlay, ButtonGroup } from 'react-native-elements'
import { UIActivityIndicator, BallIndicator } from 'react-native-indicators';
import Api from '../utils/Api'
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';
import { toast } from '../function/Function'
import DatePicker from 'react-native-datepicker'
import Geolocation from '@react-native-community/geolocation';
import { TextInput } from 'react-native-paper'

export default (props) => {
  var radio_props = [
    {label: 'ZONG', value: "ZONG"},
    {label: 'UFONE', value: "UFONE"},
   
  ];
  var radio_props1 = [
    {label1: 'jAZZ', value1: "ZONG"},
    {label1: 'Ufone', value1: "UFONE"}    ,
   
  ];
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    phone: '',
    network: '',
    coords: '',
    ref: '',
    buttonAction: false,
    error: 'date'
  })
  const [load, setLoad] = useState(false)
  const [selectedIndex, setSelectedInex] = useState(0)
  const [check, setcheck] = useState(false)
  const [check1, setcheck1] = useState(false)
  const { fname, lname, gender, dob, email, password, phone, network, coords, ref, buttonAction, error } = user

  useEffect(() => {

    loc()
    async function loc() {

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Raaye',
            'message': 'Raaye would like to access your location for better experience'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition((info) => {
            setUser({ ...user, coords: info.coords.latitude + '-' + info.coords.longitude })
          },
            (error) => {
              console.log('Request location error', error)
            },
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000 }
          );

        } else {
          console.log("location permission denied")
          
          props.navigation.navigate('Login')

        }
      } catch (err) {
        console.warn(err)
      }

    }

  }, [])

  const update = () => {
    const val = selectedIndex == 0 ? 1 : 0
    setSelectedInex(val)
  }

  const Register = () => {
    if (validate()) {
      Keyboard.dismiss()
      setLoad(true)
      setUser({ ...user, buttonAction: true })

      Api.post('register', { fname, lname, gender, dob, email, password, phone, network, coords, ref })
        .then(res => {
          if (res.data.msg == 'success') {
            setLoad(true)
            props.navigation.navigate('Verify', { token: res.data.res.token });
            setUser({ ...user, emailStyleError: false, passwordStyleError: false, buttonAction: true })
          }
          else {
            setLoad(false)
            setUser({ ...user, buttonAction: false })
            toast(res.data.msg, 'red')
          }
        })
        .catch(err => console.log(err.response))

    }
  }

  if (load) {
    return (
      <View style={{ flex: 1, backgroundColor: '#18e6d1', justifyContent: 'center' }}>

        <View style={{ alignItems: 'center' }}>
          <BallIndicator color='white' style={{ marginTop: 50 }} size={80} />
        </View>

      </View>
    )
  }
  else {

    return (
      <Container style={{ backgroundColor: '#18e6d1' }}>
        <StatusBar backgroundColor="#18e6d1" barStyle="default" />
        <Content>
          {buttonAction &&
            <Overlay
              isVisible={true}
              windowBackgroundColor="rgba(.5, .5, .5, .5)"
              overlayBackgroundColor="#fff"
              width={80}
              height={60}
            >
              <UIActivityIndicator color='black' />
            </Overlay>
          }
          <Grid>

            <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
              <Image source={require('../assets/img/icon1.png')} style={{ width:180, height:53 }} />
            </Row>
<Col>
<Text style={{fontSize:35,marginLeft:"35%",fontWeight:"bold",color:"white",fontFamily:"italic"}}>SIGNUP</Text>
</Col>
           
            {selectedIndex == 0 ? (
              <>
                {/* <Row style={{ paddingLeft:20, paddingRight:10, marginTop:20, justifyContent:'center', alignItems:'center'}}> */}
                {/* <Item floatingLabel  style={[{borderStyle:'solid'}, error === 'fname' ? {borderColor:'red'} : {borderColor:'#ffffff'} ]}>
        <Label style={{color:'#ffffff'}}>First Name</Label>
        <Input style={{color:'#ffffff'}} value={fname} onChangeText={val => setUser({...user, fname:val})}/>
        </Item> */}



                <View style={styles.SectionStyle}>

                  <Image source={require('./icons/color/cart.png')} style={styles.ImageStyle} />

                  <TextInput
                    style={{ flex: 1, borderColor: "black", backgroundColor: "transparen" , color:"blue" }}
                    label="First Name"
                    underlineColor='#18e6d1'
                    value={fname}
                    theme={{colors: {primary: '#18e6d1'}}}
                    onChangeText={val => setUser({ ...user, fname: val })}
                  />


                </View>
                {/* </Row> */}

                {/* <Row style={{ paddingLeft:20, paddingRight:20,  marginTop:5, justifyContent:'center', alignItems:'center'}}> */}
                {/* <Item floatingLabel  style={[{borderStyle:'solid'}, error === 'lname' ? {borderColor:'red'} : {borderColor:'#ffffff'} ]}>
        <Label style={{color:'#ffffff'}}>Last Name</Label>
        <Input style={{color:'#ffffff'}} value={lname} onChangeText={val => setUser({...user, lname:val})}/>
        </Item> */}


                <View style={styles.SectionStyle}>

                  <Image source={require('./icons/color/last.jpg')} style={styles.ImageStyle} />

                  <TextInput
                    style={{ flex: 1, borderColor: "black", backgroundColor: "transparent" }}
                    label="Last Name"
                    value={lname}
                    underlineColor='#18e6d1'
                    theme={{colors: {primary: '#18e6d1'}}}
                    onChangeText={val => setUser({ ...user, lname: val })}
                  />


                </View>
                {/* </Row> */}
                {/* <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}> */}
                {/* <Item floatingLabel style={[{ borderStyle: 'solid' }, error === 'email' ? { borderColor: 'red' } : { borderColor: '#ffffff' }]}>
                    <Label style={{ color: '#ffffff' }}>Email</Label>
                    <Input style={{ color: '#ffffff' }} value={email} onChangeText={val => setUser({ ...user, email: val })} />
                  </Item> */}

                <View style={styles.SectionStyle}>

                  <Image source={require('./icons/color/email1.png')} style={styles.ImageStyle  } />

                  <TextInput
                    style={{ flex: 1, borderBottomColor:"#18e6d1" ,  backgroundColor: "transparent"  }}
                    label="Email"
                    value={email}
                    theme={{colors: {primary: '#18e6d1'}}}
                    underlineColor='#18e6d1'
                    onChangeText={val => setUser({ ...user, email: val })}
                  />

                </View>
                {/* </Row> */}

                {/* <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}> */}
                {/* <Item floatingLabel style={[{ borderStyle: 'solid' }, error === 'password' ? { borderColor: 'red' } : { borderColor: '#ffffff' }]}>
  <Label style={{ color: '#ffffff' }}>Password</Label>
  <Input style={{ color: '#ffffff' }} secureTextEntry={true} value={password} onChangeText={val => setUser({ ...user, password: val })} />
</Item> */}
                <View style={styles.SectionStyle}>

                  <Image source={require('./icons/color/lock.png')} style={styles.ImageStyle} />

                  <TextInput
                    style={{ flex: 1, borderColor: "black", backgroundColor: "transparent"  ,}}
                    label="Password"
                    underlineColor='#18e6d1'
                    secureTextEntry={true}
                    value={password}
                    theme={{colors: {primary: '#18e6d1'}}}
                    onChangeText={val => setUser({ ...user, password: val })}
                  />

                </View>


                <Row style={{  }}>

<Item style={[{ }, error === 'network' ? { borderColor: 'red' } : { borderColor: '#18e6d1',marginLeft:"9%" }]}>
  <View style={{borderWidth:1,borderRadius:3,borderColor:"white" ,width:"90%" ,height: "70%",borderBottomColor: '#34aeeb', borderBottomWidth:6 ,marginLeft:"2%",marginTop:"3%" , borderRadius:12 , backgroundColor:"white" }}>
  {/* <Text style={{marginTop:"0.1%",fontSize:15,color:"black",fontWeight:"bold",marginLeft:"3%"}}>GENDER</Text> */}
  <View style={{flexDirection:"row",paddingLeft:"4%",width:"90%" ,}}>   

<View >

  <RadioButton.Group
onValueChange={value =>setUser({  ...user , gender: value })}
value={gender}
>



<View style={{flexDirection:"row" , marginTop:5}}>
<Text  style={{marginTop:5,color:"gray",fontSize:15,paddingRight:"0%" }}>Male</Text>
<RadioButton value="1" />
<Text  style={{marginTop:5,marginLeft:"5%",color:"gray",fontSize:15}}>Female</Text>
<RadioButton value="2" />
</View>

</RadioButton.Group>


</View>
{/* <View style={{paddingLeft:"5%",color:"white"}}>
<RadioForm 
radio_props1={radio_props1}
initial={0}
onPress={(value1) => {this.setState({value1:value1})}}
/>
</View> */}
</View>  

  </View>

  {/* <Picker  
    itemTextStyle={{ fontSize: 18, color: 'blue'  }}
    mode="dropdown"
    iosIcon={<Icon name="arrow-down" />}
    placeholder="Gender"
    placeholderStyle={{ color: "white" }}
    placeholderIconColor="white"
    style={{ flex: 1, color: 'green',borderRadius:22 ,backgroundColor:"white" , height:60}}
    itemStyle={{
      backgroundColor: 'green',
      
    }}                     
     selectedValue={network}
    onValueChange={(val, ind) => {
      if (val !== "0") {
        setUser({ ...user, network: val })
      }
    }}
  >
    
    <Picker.Item label="Mobile Network" value="0" />
    <Picker.Item  label="Ufone" value="ufone" />
    <Picker.Item overlayBackgroundColor="red" label="Zong" value="zong" />
    <Picker.Item label="Jazz" value="jazz" />
    <Picker.Item label="Warid" value="warid" />
    <Picker.Item label="Telenor" value="telenor" />
  </Picker> */}
  
</Item>
</Row>

                {/* </Row> */}

                {/* <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Item floatingLabel style={[{ borderStyle: 'solid' }, error === 'phone' ? { borderColor: 'red' } : { borderColor: '#ffffff' }]}>
                    <Label style={{ color: '#ffffff' }}>Mobile Number</Label>
                    <Input style={{ color: '#ffffff' }} value={phone} onChangeText={val => setUser({ ...user, phone: val })} keyboardType={'numeric'} />
                  </Item> */}
                <View style={styles.SectionStyle } >

                  <Image source={require('./icons/color/cell1.png')} style={styles.ImageStyle} />

                  <TextInput
                    style={{ flex: 1, borderColor: "black",backgroundColor: "transparent" ,}}
                    label="Phone Number (03xxxxxxxx)"
                    value={phone}
                    theme={{colors: {primary: '#18e6d1'}}}
                    onChangeText={val => setUser({ ...user, phone: val })} 
                    keyboardType={'numeric'}
                    underlineColor='#18e6d1'
                  />

                </View>

                {/* </Row> */}


                {/* <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Item style={[{ borderStyle: 'solid',borderBottomWidth: 7,
    borderBottomColor: 'green',width:"99%" ,marginRight:"6%"  }, error === 'gender' ? { borderColor: 'red' } : { borderColor: '#ffffff' }]}>
                
                  <Image source={require('./icons/color/gender.png')} style={styles.ImageStyle ,{width:35 , height:60 , backgroundColor:"white"}} />
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Gender"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ flex: 1, color: 'black',backgroundColor:"white"  , height:60}}
                      itemStyle={{ backgroundColor: 'white' }}
                      onValueChange={(val, ind) => {
                        if (val != "0") {
                          setUser({ ...user, gender: val })
                        }
                      }}
                      selectedValue={gender}
                    >
                      <Picker.Item label="Gender" value="0" />
                      <Picker.Item label="Male" value="1" />
                      <Picker.Item label="Female" value="2" />
                    </Picker>
    
                  </Item>
                </Row> */}

                <Row style={{ paddingLeft: "3%", paddingRight: 20,  justifyContent: 'center', alignItems: 'center' }}>
                  <Item style={{ borderStyle: 'solid',borderBottomWidth: 7,width:"82%",marginTop: 10, height:"60%",marginLeft:"1%", borderRadius: 12,
    borderBottomColor: '#34aeeb',height:60,backgroundColor:"white",color:"black" }}>
                    {/* <DatePicker
                      style={{ width: '99%'}}
                      date={dob}
                      // mode="date"
                      placeholder="Select date of Birth"
                      maxDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                          color:"black"
                        },
                        dateInput: {
                          marginRight: 130,
                          borderColor: '#fff',
                          paddingTop:10,
                          paddingLeft:20,
                          color:"gray",
                          fontWeight:"bold"

                        },
                        placeholderText: {
                          color: 'black'
                        },
                        dateText: {
                          color: "black",
                          fontWeight:"bold",
                          marginRight: 40,

                        }
                      }}
                      onDateChange={(date) => { setUser({ ...user, dob: date }) }}
                    /> */}
                    <DatePicker
        style={{width: 200}}
        date={dob}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        maxDate="2010-01-01"
        androidMode="default"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: "-20%",
            borderColor:"transparent"
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { setUser({ ...user, dob: date }) }}
      />
                  </Item>
                </Row>

                <Row style={{  }}>

                  <Item style={[{ }, error === 'network' ? { borderColor: 'red' } : { borderColor: '#18e6d1',marginLeft:"11%" }]}>
                  <View style={{borderWidth:7,borderRadius:3,borderColor:"white",width:"90%",borderBottomColor: '#34aeeb', borderBottomWidth:6 ,marginLeft:"2%",marginTop:10 , borderRadius:12 , backgroundColor:"white"}}>
  {/* <Text style={{marginTop:"1%",fontSize:15,color:"black",fontWeight:"bold",marginLeft:"3%"}}>NETWORK</Text> */}
  <View style={{flexDirection:"row",paddingLeft:"4%",width:"90%" ,}}>   

      <View  >
        {/* <RadioForm 
          radio_props={radio_props}
          initial="ZONG"
          onPress={(value) => {this.setState({radio_props:value})}}
          
        /> */}
        
        <RadioButton.Group
        onValueChange={value =>setUser({ ...user, network: value })}
        value={network}
      >
                

        <View style={{flexDirection:"row"}}>
        <Text style={{marginTop:5,color:"gray",fontSize:15}}>Ufone</Text>
          <RadioButton value="ufone" />
          <Text  style={{marginTop:5,marginLeft:"5%",color:"gray",fontSize:15}}>Zong</Text>
          <RadioButton value="zong" />
          </View>
          <View style={{flexDirection:"row"}}>
          <Text  style={{marginTop:5,color:"gray",fontSize:15,paddingRight:"3%"}}>Jazz</Text>
          <RadioButton value="jazz" />
          <Text  style={{marginTop:6,marginLeft:"5%",color:"gray",fontSize:15 }}>Warid</Text>
          <RadioButton value="warid" />
        </View>
       
      </RadioButton.Group>


        </View>
        {/* <View style={{paddingLeft:"5%",color:"white"}}>
         <RadioForm 
          radio_props1={radio_props1}
          initial={0}
          onPress={(value1) => {this.setState({value1:value1})}}
        />
      </View> */}
      </View>  
    
                    </View>
           
                    {/* <Picker  
                      itemTextStyle={{ fontSize: 18, color: 'blue'  }}
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Gender"
                      placeholderStyle={{ color: "white" }}
                      placeholderIconColor="white"
                      style={{ flex: 1, color: 'green',borderRadius:22 ,backgroundColor:"white" , height:60}}
                      itemStyle={{
                        backgroundColor: 'green',
                        
                      }}                     
                       selectedValue={network}
                      onValueChange={(val, ind) => {
                        if (val !== "0") {
                          setUser({ ...user, network: val })
                        }
                      }}
                    >
                      
                      <Picker.Item label="Mobile Network" value="0" />
                      <Picker.Item  label="Ufone" value="ufone" />
                      <Picker.Item overlayBackgroundColor="red" label="Zong" value="zong" />
                      <Picker.Item label="Jazz" value="jazz" />
                      <Picker.Item label="Warid" value="warid" />
                      <Picker.Item label="Telenor" value="telenor" />
                    </Picker> */}
                    
                  </Item>
                </Row>

               







                <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                  <CheckBox
                    value={check}
                    onValueChange={() => {
                      check ? setcheck(false) : setcheck(true)
                    }}
                    style={{ borderColor: '#fff', color: '#fff' }}
                  />
                  <Text style={{ color: 'black', marginTop: 5 }}>
                    Do you have a referral code?
        </Text>
                </Row>
                

                {check && (

                  // <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                  //   <Item floatingLabel style.com={[{ borderStyle: 'solid' }, error === 'ref' ? { borderColor: 'red' } : { borderColor: '#ffffff' }]}>
                  //     <Label style={{ color: '#ffffff' }}>Referral Code</Label>
                  //     <Input style={{ color: '#ffffff' }} value={ref} onChangeText={val => setUser({ ...user, ref: val })} />
                  //   </Item>
                  // </Row>
                  <View style={styles.SectionStyle}>

            <Image source={require('./icons/color/logo.png')} style={styles.ImageStyle} />

                  <TextInput
                    style={{ flex: 1, borderColor: "black", backgroundColor: "transparent" }}
                    label="Referral Code"
                    value={ref}
                     onChangeText={val => setUser({ ...user, ref: val })}
                     theme={{colors: {primary: '#18e6d1'}}}
                     underlineColor='#18e6d1'
                  />

                </View>

                )}

                <Row  style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                  <TouchableOpacity onPress={() => Linking.openURL('https://raaye.com.pk/policy')}>
                   <Row>
                    <CheckBox
                    value={check1}          
                     onValueChange={() => { check1 ? setcheck1(false) : setcheck1(true)}}
                     style={{ borderColor: '#fff', color: '#fff' }} />
                      <Text style={{color:"black",marginTop:"1%"}}> 
                    By clicking Register, you agree to our Terms and that you have read our <Text style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}>Policy</Text>
                    </Text>
                    </Row>
                    {/* <CheckBox
                    value={check}
                    onValueChange={() => {
                      check ? setcheck(false) : setcheck(true)
                    }}
                    style={{ borderColor: '#fff', color: '#fff' }}
                  />
                  <Text style={{ color: '#ffffff', marginTop: 5 }}>
                    Do you have a referral code?
        </Text> */}


                  </TouchableOpacity>
                </Row>


                {check1  && <Row style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                  {buttonAction === false ?
                    <Button rounded bordered style={{ width: '80%', justifyContent: 'center',backgroundColor:"black", alignItems: 'center', borderColor: '#ffffff' }} onPress={Register} disabled={buttonAction}>
                      <Icon name='unlock' style={{ color: 'white' }}
                  
                      />
                      <Text style={{ marginLeft: '-10%',borderBottomWidth: 4,borderBottomColor:"black", color: 'white',fontWeight:"bold" }}>Register</Text>

                    </Button>
                    :
                    <UIActivityIndicator color='white' />
                  }
                </Row>
                }

                {/* <Row style={{ width: '85%', marginTop: 20, marginLeft: 30, justifyContent: 'center', marginBottom: '5%', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Text style={{ color: '#ffffff' }} onPress={() => props.navigation.navigate('Login')}>Already have an account? Click Here...</Text>
                  </TouchableOpacity>
                </Row> */}
              </>
            ) : (
                <>

                  <View>
                    <Text>Other Screen</Text>
                  </View>

                </>
              )}

          </Grid>
          
        </Content>
      </Container>
    )

  }


  function validate() {
    //Password Validate
    const passwordPreg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

    //Email Validate
    const emailPreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    //name validate
    const namePreg = /^[a-z]+$/i

    //phone Validate
    const phoneReg = /^[0][1-9]\d{9}$|^[1-9]\d{10}$/

    if (check && ref == '') {
      setUser({ ...user, ref: '', error: 'ref' })
      toast('Please Enter Referral Code', 'red')
    }
    else if (network === '') {
      setUser({ ...user, network: '', error: 'network' })
      toast('Select Network', 'red')
    }
    else if (phone == '') {
      setUser({ ...user, phone: '', error: 'phone' })
      toast('Mobile Number Required', 'red')
    }
    else if (phoneReg.test(phone) !== true) {
      setUser({ ...user, phone: '', error: 'phone' })
      toast('Invalid Mobile Number, eg( 03412584631 )', 'red')
    }
    else if (passwordPreg.test(password) !== true) {
      setUser({ ...user, password: '', error: 'password' })
      toast('Password must be at least 6 character long and conatin one numeric digit, one uppercase and lowercase letter.', 'red')
    }
    else if (emailPreg.test(email.trim()) !== true) {
      setUser({ ...user, email: '', error: 'email' })
      toast('Invalid Email Format', 'red')
    }
    else if (dob == '') {
      setUser({ ...user, dob: '', error: 'dob' })
      toast('Date of birth required', 'red')
    }
    else if (gender === '') {
      setUser({ ...user, gender: '', error: 'gender' })
      toast('Select Gender', 'red')
    }
    else if (lname == '') {
      setUser({ ...user, lname: '', error: 'lname' })
      toast('Last name required', 'red')
    }
    else if (namePreg.test(lname.trim()) !== true) {
      setUser({ ...user, lname: '', error: 'lname' })
      toast('Only alphabets are allowed', 'red')
    }
    else if (fname == '') {
      setUser({ ...user, fname: '', error: 'fname' })
      toast('First name required', 'red')
    }
    else if (namePreg.test(fname.trim()) !== true) {
      setUser({ ...user, fname: '', error: 'fname' })
      toast('Only alphabets are allowed', 'red')
    }
    else {
      return true
    }

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
    borderBottomColor: '#34aeeb',
    height: "5%",
    width: "75%",
    borderRadius: 12,
    fontSize: 100,
    marginTop: 20,
    marginLeft:"11%"
  },

  ImageStyle: {
    padding:15,
    marginTop: 10,
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