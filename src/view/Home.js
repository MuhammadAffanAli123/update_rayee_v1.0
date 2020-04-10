import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text, FlatList, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native'
import { Container, Content, Grid, Row, Col, Tabs, Left, Right } from 'native-base'
import { Card, ListItem, Button, Image, Overlay } from 'react-native-elements'
import Header from '../components/Header'
import Api from '../utils/Api'
import { getUserData } from '../function/Function'
import { FadeInAnim } from '../components/Animate'
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Slider from './slider'
import { Icon } from "native-base";

export default (props) => {

    const [gri, updateState] = useState()
    const [load, updateLoad] = useState(true)

    useEffect(() => {

        // BackHandler.addEventListener('hardwareBackPress', back);

        setTimeout(() => {
            getData()
        }, 2000)

        return () => {
            // BackHandler.removeEventListener('hardwareBackPress', back);
        }

    })



    // const back = () => {
    //     Alert.alert("Exit", "Are you sure you want to exit?",
    //      [{ text: "No"},
    //       { text: "Yes", onPress: () => BackHandler.exitApp() }], 
    //       { cancelable: false });  
    //       return true;
    // }


    const getData = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token !== null) {
            await Api.get('/survey-main/' + token)
                .then(res => {
                    updateState(res.data)
                    updateLoad(false)
                })
                .catch(err => console.log(err.response))
        }
    }


    const click = (item, des) => {

        let resetAction = StackActions.reset({
            key: undefined,
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SurveyDetails', params: { survey: item, des: des } })],
        });
        props.navigation.dispatch(resetAction);
    }
    return (

        <Container style={{backgroundColor:"#18e6d1"}}>
            <StatusBar backgroundColor="#18e6d1" barStyle="default" />
            <Header   title='Raaye' toggle={props.navigation.toggleDrawer} />
            {load &&
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

            <Content style={{ backgroundColor: '#ededed' }}>
                <View style={{ marginTop: 10, marginLeft: 5, marginRight: 15 }}>
                    <Slider style={{ width: "90%" }} />
                </View>
                <View style={{  borderWidth: 3, marginTop:10, height:"6%",  flexDirection: "row", flexWrap: 'wrap', width: "100%", backgroundColor: "#ededed", borderColor: "#ededed", borderStyle: "solid" }}>
                    <Row style={{marginLeft:"5%"}}>
                        <Col style={{paddingLeft:"4%"}}>
                    <Image source={require('../assets/img/i1.png')} style={{
                        flex: 1,
                        width: 50,
                        height: 50,
                        resizeMode: 'contain', marginTop: 55, marginLeft: "20%"
                    }} /></Col>
                    <Col>
                    <Image source={require('../assets/img/i2.png')} style={{
                       
                        width: 50,
                        height: 50,
                        resizeMode: 'contain', marginTop: 55, marginLeft: "10%"
                    }} />
</Col>
<Col>
                    <Image source={require('../assets/img/i3.png')} style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain', marginTop: 55, marginLeft: "8%"
                    }} /></Col>
                    <Col>
                    <Image source={require('../assets/img/14.png')} style={{
                        width: 50,
                        marginLeft:'15',
                        height: 50,
                        resizeMode: 'contain', marginTop: 55, marginLeft: "20%"
                    }} /></Col>
</Row>
                </View>


                {!load ? (
                    <FadeInAnim style={{ flexWrap: 'wrap', flexDirection: "row", marginTop: 15 }} >



                        {gri.map((gri, i) => (

                            <View onPress={() => click(gri.survey_id, gri.discription)} style={{ width: "50%",  marginTop: 5 }}>
                                {console.log(gri, "checking@@@@@@@@@@@@@@@@@@@@@@@@")}
                                <Card
                                    onPress={() => click(gri.survey_id, gri.discription)}
                                    key={i}
                                    titleStyle={{
                                        height: 5
                                    }}
                                    onPress={() => click(gri.survey_id, gri.discription)}
                                    image={gri.image === '' ? require('../assets/img/r.png') : { uri: gri.url + gri.image }}
                                    imageStyle={{
                                        flex: 1,
                                        width: 50,
                                        marginTop: 10,
                                        height: 80,
                                        resizeMode: 'contain'
                                    }}
                                    containerStyle={{ borderRadius: 20 }}
                                >
                                   

                                    <Row style={{ marginTop: 10, Right: "40%", width: "104%", }}>
                                        <Col style={{ width: 120, alignItems: 'flex-start' }}>
                                            <Text onPress={() => click(gri.survey_id, gri.discription)} style={{ height: 25, fontSize: 10, fontWeight: "bold", color: "blue" }}>{gri.title.toUpperCase()} </Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 10 }}>
                                        
                                <Text onPress={() => click(gri.survey_id, gri.discription)}><Icon style={{ color: "black" }} name="calculator" size={2} /><Text style={{fontWeight:"bold"}}>:{gri.expiry_days}Days</Text></Text>
                                        
                                        </Row >
                                        <Row>
                                            <Text onPress={() => click(gri.survey_id, gri.discription)}><Icon style={{ color: "black" }} name="pulse" size={2} /><Text style={{fontWeight:"bold"}}>:{gri.cost_type}</Text></Text>
                                        
                                    </Row>

                                    <Row>
                                        <Col style={{ right: 0, alignItems: 'flex-start' }}>
                                            <Text onPress={() => click(gri.survey_id, gri.discription)}><Text style={{fontWeight:"bold"}}>Price : {gri.price} Rs</Text></Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </View>
                        ))}

                    </FadeInAnim>


                ) : null}
            </Content>

        </Container>
    )
}

function survey(id) {
    return new Promise(async (resolve, reject) => {
        await Api.get('/survey-get/' + id)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}


const styles = StyleSheet.create({
    GridViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 5,
        borderWidth: 1,
        borderColor: '#4388d6',
        backgroundColor: '#fff'
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: 'gray',
        padding: 10,
    }
})