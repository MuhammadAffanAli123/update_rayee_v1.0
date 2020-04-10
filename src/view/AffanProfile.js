// import React, { Component } from 'react'
// import { Text, View , Button } from 'react-native'
// import Profile from './Profile'
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
// import { StackActions, NavigationActions } from 'react-navigation';
// import { Container, Content, Grid, Row, Col, StatusBar, StyleSheet, Keyboard, Picker, BackHandler, Icon, Item, Label, Input,
//     Card, CardItem } from 'native-base'
//    // import { StackActions, NavigationActions } from 'react-navigation';
//  import Header from '../components/Header'

// export class AffanProfile extends Component {
//     render() {
//         return (
//             <View>
//                  {/* <StatusBar backgroundColor="#333333" barStyle="default" /> */}
//             {/* <Header title='Profile'/> */}
//                 <Text> textInComponent </Text>
//                 <Button
//                 title="About"
//                  onPress={()=>{this.props.navigation.navigate("About")}}
//                 />
//                  <Button
//                 title="Profile"
//                  onPress={()=>{this.props.navigation.navigate("Profile")}}
//                 />
//                 {/* <Button>Profile</Button> */}
//             </View>
//         )
//     }
// }

// export default AffanProfile



import React,{ useEffect, useState } from 'react'
import { View, StatusBar, StyleSheet, Keyboard, Picker, BackHandler} from 'react-native'
import { Container, Content, Grid, Row, Col, Text, Button, Icon, Item, Label, Input,
     Card, CardItem } from 'native-base'
import { Avatar, Overlay, Divider } from 'react-native-elements';
import Header from '../components/Header'
import Api from '../utils/Api'
import { getUserData } from '../function/Function'
import { FadeInAnim } from '../components/Animate'
import { UIActivityIndicator } from 'react-native-indicators';
import { toast } from '../function/Function'
import DatePicker from 'react-native-datepicker'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { StackActions, NavigationActions } from 'react-navigation';

export default (props) => {

    const [ user, setUser ] = useState()
    const [ load, setLoad ] = useState(true)
    const [ type, setType ] = useState({
        loading: false,
        cat: null,
        title: 'Edit'
    })
    const [ edit, setEdit ] = useState({
        editVal : null,
        editVal2 : null,
        editLoad : false
    })
    const [ visible, setVisible ] = useState({
        visibility : false,
        option : null,
        param : null,
        param1 : null,
        param2: null
    })
    const [ date, setDate ] = useState('')
    useEffect(() => {

        // BackHandler.addEventListener('hardwareBackPress', back);

        getData()

        const val = props.navigation.getParam('update');
        if(val == 'update'){
            getData() 
        }

        return () => {
            // BackHandler.removeEventListener('hardwareBackPress', back);
        }
        
    }, [props.navigation.getParam('update')])

    const back = () => {
        // let resetAction = StackActions.reset({
        //     key: undefined,
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'Home'})],
        // });
        // props.navigation.dispatch(resetAction);
    }

    
    const { visibility, option, param, param1, param2 } = visible
    const {  loading, cat, title } = type
    const { editVal, editVal2, editLoad } = edit
    return(
        <Container >
            <StatusBar backgroundColor="#333333" barStyle="default" />
            <Header title='Profile' toggle={props.navigation.toggleDrawer}/>
            { load && 
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

            <Content style={{ backgroundColor:'white' , borderColor:"white"}}>
                <FadeInAnim>
                <Grid style={{backgroundColor:'white', borderColor:"white",borderStyle:"solid",borderWidth:0, height:220 , width:342 , marginLeft:8.5 , marginTop:15}}>
                    <Row style={{height:150 , marginTop:20}}>
                        
                        {!load && <Avatar rounded title={user.avatar} size={120}/> }  
                        
                        {!load ?
                    <Col style={{justifyContent:'center', alignItems:'center'}}>
                    <Button transparent >
                        <Text style={{right:"10%", fontSize:20, color:'black', fontWeight:"bold",textTransform:'capitalize'}}>{user.fname+' '+user.lname+' '}
                        {/* <Icon name='md-create' style={{fontSize:26, color:'black'}}/> */}
                        </Text>
                    </Button>
                    </Col>
                    : null }
                    </Row>
                    {/* <Row style={{ height:20}}>
                    {!load ?
                    <Col style={{justifyContent:'center', alignItems:'center'}}>
                    <Button transparent onPress={() => setType({ ...type, loading:true, cat:'name', title:'Edit Name' })}>
                        <Text style={{ fontSize:26, color:'#96cd2a', textTransform:'capitalize'}}>{user.fname+' '+user.lname+' '}
                        <Icon name='md-create' style={{fontSize:26, color:'black'}}/>
                        </Text>
                    </Button>
                    </Col>
                    : null }
                    </Row> */}
                    {/* <Row style={{ height:20, marginTop:20 }}>
                        <Col style={{justifyContent:'center', alignItems:'center'}}>
                        <LoginButton  
    onLoginFinished={
      (error, result) => {
        if (error) {
          alert("login has error: " + result.error);
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken
              alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result)
                  alert('Success fetching data: ' + result.toString());
                }
              }

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()

            }
          )

        }
      }
    }
    onLogoutFinished={() => alert("logout.")}/>
                        </Col>
                    </Row> */}
                </Grid>

                <Content style={{ paddingLeft:5, paddingRight:5 ,borderWidth:0,  borderColor:"white"}}>
          <View  style={{height:"100%" , backgroundColor:"white" , borderColor:"white"}}>
            <CardItem header style={{backgroundColor:"white" , borderColor:"white"}}>
                    <Col style={{alignItems:'flex-start', justifyContent:'center',borderColor:"white", width:100}}>
                    
                   
                    
                    </Col>

                   
            </CardItem>

            <Divider style={{ backgroundColor: 'white' ,borderColor:"white", marginRight:12, marginLeft:12 }} />

            <CardItem  style={{backgroundColor:"white", borderColor:"white"}}>
            <Col style={{alignItems:'flex-start', justifyContent:'center', width:100 , borderColor:"white"}}>
                    <Text   onPress={()=>{props.navigation.navigate("Profile")}} style={{fontSize:16 , fontWeight:"bold",  color:"black"}}><Icon  style={{color:"black"}} name="person" size={15}/>  Profile</Text>
                    </Col>

                    <Col style={{alignItems:'flex-end', justifyContent:'center' , borderColor:"white"}}>
                    {!load ?
                    <View style={{ flex:1, flexDirection:'row-reverse' , borderColor:"white"}}>

                    {!load && 
                        
                            <Text  style={{paddingRight:10, fontSize:12 , fontWeight:"bold", color:"black"   }} onPress={() => props.navigation.navigate('Profile')} ><Icon style={{color:"black"}} name="md-arrow-forward" size={100}/></Text>
                       
                    }

                    {/* <Text style={{paddingRight:15, fontSize:16 , fontWeight:"bold", color:'blue'}}>{user.phone}</Text> */}
                    </View>
                    : null }
                    </Col>
            </CardItem>

            <Divider style={{ backgroundColor: 'white', borderColor:"white", marginRight:12, marginLeft:12  , fontWeight:"bold"}} />

            <CardItem style={{backgroundColor:"white" , borderColor:"white"}}>
                    <Col style={{alignItems:'flex-start', justifyContent:'center', width:100}}>
                    <Text  onPress={() => props.navigation.navigate('About')} style={{fontSize:16,  fontWeight:"bold", color:"black" }}><Icon style={{color:"black"}} name="md-apps" size={15}/>  About</Text>
                    </Col>

                    <Col style={{alignItems:'flex-end', justifyContent:'center' , borderColor:"white"}}>
                    {!load ?
                    <Text style={{paddingRight: 6, fontSize:16 , fontWeight:"bold",   color:"black"  }}  onPress={() => props.navigation.navigate('About')}><Icon style={{color:"black"}} name="md-arrow-forward" size={15}/> </Text>
                    : null }
                    </Col>
            </CardItem>

            

         

          </View>
        </Content>

       


                <Grid style={{ paddingLeft:5, paddingRight:5}}>

                <Overlay
                isVisible={loading}
                windowBackgroundColor="rgba(.5, .5, .5, .5)"
                overlayBackgroundColor="#fff"
                width={300}
                height={270}
                overlayStyle={{
                    justifyContent:'center',
                    alignItems:'center'
                }}
                >
                {/* <Content>

                <Row style={{ marginTop:10}}>
                
                <Col style={{ alignItems:'flex-start'}}>
                <Text style={{ fontSize:18, fontWeight:'400', color:'#000000'}}>{title}</Text>
                </Col>

                <Col style={{ alignItems:'flex-end' }}>
                <Button bordered style={{ justifyContent:'center', alignItems:'center', width:45, height:30, borderColor:'#f21010' }}
                onPress={() => {
                    setType({...type, 
                        loading:false, 
                        cat:null, 
                        title:null})
                        setEdit({editVal:null,editVal2:null,editVal3:null,editLoad:false})
                    }
                    
                    }
                > 
                <Icon style={{ color:'#f21010', fontSize:14 }} name='md-close-circle'/>
                </Button>
                </Col>

                </Row>

                { cat === 'phone' &&
                <Grid>

                    <Row style={{ paddingLeft:10, paddingRight:10, marginTop:20, justifyContent:'center', alignItems:'center'}}>
                    <Item floatingLabel  style={{borderStyle:'solid', borderColor:'#000'}}>
                    <Label style={{color:'#000'}}>Mobile Number</Label>
                    <Input style={{color:'#000'}} keyboardType={'numeric'}
                    value={editVal} onChangeText={val => setEdit({...edit, editVal:val})}
                    />
                    </Item>
                    </Row>

                    <Row style={{ paddingLeft:10, paddingRight:10, marginTop:20, justifyContent:'center', alignItems:'center'}}>
                        <Item style={{borderStyle:'solid', borderColor:'#000'}}>
                        <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" style={{color:'#000'}}/>}
                                placeholder="Gender"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ flex: 1, color: '#000' }}
                                itemStyle={{backgroundColor:'#000'}}
                                selectedValue={editVal2}
                                onValueChange={(val, ind) => {
                                if(val !== "0"){
                                    setEdit({...edit, editVal2:val})
                                }
                                }}
                            >
                            <Picker.Item label="Mobile Network" value="0"/>
                                <Picker.Item label="Ufone" value="ufone" />
                                <Picker.Item label="Zong" value="zong" />
                                <Picker.Item label="Jazz" value="jazz" />
                                <Picker.Item label="Warid" value="warid" />
                                <Picker.Item label="Telenor" value="telenor" />
                            </Picker>
                        </Item>
                    </Row>

                    <Row style={{justifyContent:'center', marginTop:20}}>
                    {editLoad === false ? 
                    <Button bordered dark onPress={() => updateData(cat,editVal,editVal2)}>
                        <Text>Update</Text>
                    </Button>
                    :
                    <UIActivityIndicator color='black'/>
                    }
                    </Row>

                </Grid>
                }


                { cat === 'name' &&
                <Grid>

                    <Row style={{ paddingLeft:10, paddingRight:10, marginTop:20, justifyContent:'center', alignItems:'center'}}>
                    <Item floatingLabel  style={{borderStyle:'solid', borderColor:'#000'}}>
                    <Label style={{color:'#000'}}>First Name</Label>
                    <Input style={{color:'#000'}} value={editVal} onChangeText={val => setEdit({...edit, editVal:val})}/>
                    </Item>
                </Row>

                <Row style={{ paddingLeft:10, paddingRight:10,  marginTop:20, justifyContent:'center', alignItems:'center'}}>
                    <Item floatingLabel  style={{borderStyle:'solid', borderColor:'#000'}}>
                    <Label style={{color:'#000'}}>Last Name</Label>
                    <Input style={{color:'#000'}} value={editVal2} onChangeText={val => setEdit({...edit, editVal2:val})}/>
                    </Item>
                </Row>

                    <Row style={{justifyContent:'center', marginTop:20}}>
                    {editLoad === false ? 
                    <Button bordered dark onPress={() => updateData(cat,editVal,editVal2)}>
                        <Text>Update</Text>
                    </Button>
                    :
                    <UIActivityIndicator color='black'/>
                    }
                    </Row>

                </Grid>
                } 

                </Content> */}
                </Overlay>
                
                </Grid>
                </FadeInAnim>
            </Content>
        </Container>
    )

function getData(){

    getUserData()
    .then(async res => {
        await Api.get('/profile/'+res[6][1]+'/profile')
        .then(res => {
            setUser(res.data)
            setLoad(false)
        })
        .catch(err => alert(err))
    })
    .catch(err => alert(err))
}

function updateData(type,val,val2){
    setEdit({...edit, editLoad:true })
    if(type == 'name'){
        if(val == null){
            setEdit({...edit, editLoad:false })
            toast('First name is required.', 'red')
        }
        else if(val2 == null){
            setEdit({...edit, editLoad:false })
            toast('Last name is required.', 'red')
        }
        else{
            sendData(type,val,val2)
        }
    }
    else if(type == 'dob'){
        if(val == null){
            setEdit({...edit, editLoad:false })
            toast('Date of birth is required.', 'red')
        }
        else{
            sendData(type,val,null)
        }
    }
    else if(type == 'phone'){
        if(val !== null){
            const phoneReg = /^[0][1-9]\d{9}$|^[1-9]\d{10}$/
            if(phoneReg.test(editVal)){
                if(val2 == null){
                    setEdit({...edit, editLoad:false })
                    toast('Select Network', 'red')
                  }
                  else{ 
                    sendData(type,val,val2)
                     }
            }
            else{
              setEdit({ ...edit, editVal:'', editLoad:false})
              toast('Invalid Mobile Number, eg( 03412584631 )', 'red')
            }
          }
          else{
            setEdit({ ...edit, editVal:'', editLoad:false })
            toast('Mobile Number Required', 'red')
          }
    }
        
    
}

function sendData(type,val,val2){
    getUserData()
        .then(async res => {
            const id = res[6][1]
            await Api.post('/updateUserData', {type,val,val2,id})
            .then(res => {
                if(res.data.msg == 'success'){
                    getData() 
                    setType({loading:false, cat:null, title:null})
                    setEdit({editLoad:false,editVal:null,editVal2:null})
                    setVisible({ visibility:false, option:null})
                }
                else{
                    toast(res.data.msg, 'red')  
                }
            })
            .catch(err => console.log(err.response))
        })
        .catch(err => console.log(err))
}

}



const styles = StyleSheet.create({
    box:{
        borderWidth: 0,
        borderRadius: 2,
        borderColor: 'white',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 0
    }
})