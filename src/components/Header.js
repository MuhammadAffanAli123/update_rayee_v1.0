import React from 'react';
import { Alert } from 'react-native'
import { Container, Header, Button, Icon, Left, Right, Body, Title } from 'native-base'

export default (props) => {
  function back(){
    Alert.alert(
      'Alert',
      'Are you sure?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK', 
          onPress: () => props.nav('Home')
        },
      ],
      {cancelable: false},
    );
  }
    return(
        <Header style={{backgroundColor: "#18e6d1" }}>
          <Left style={{flex:1}}>
            { props.back == 'back' ? (
              <Button transparent onPress={back}>
              <Icon name='arrow-back' />
            </Button>
            ) : true}
          </Left>
          <Body style={{flex:1, alignItems:'center' }}>
        <Title style={{marginTop:15,fontFamily:"Noto Sans, sans-serif",fontSize:30, fontWeight:"bold" }}>{ props.title }</Title>
          </Body>
          <Right style={{flex:1}}>
          </Right>
        </Header>
    )
}