import React, { Component } from 'react'
import { Image, Text, View, Button } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";

export class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                'http://raaye.com.pk/appslider/1.jpeg',
                'http://raaye.com.pk/appslider/2.jpeg',
                'http://raaye.com.pk/appslider/3.jpeg',
               'http://raaye.com.pk/appslider/4.jpeg'

            ]
        };
    }


    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    };
    render() {
        return (
            <View>
                <View onLayout={this.onLayout} style={{ marginLeft: 3, marginTop: 10, marginRight: 5, borderWidth: 1, borderColor: "white", backgroundColor: '#ededed', width: "100%"  }}>


                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={120}
                        onCurrentImagePressed={index =>
                            console.warn(`image ${index} pressed`)
                        }
                        parentWidth={this.state.width}
                        dotColor="#03fcf8"
                        inactiveDotColor="white"
                        autoplay
                        circleLoop
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 15,
                            marginHorizontal: 0,
                            padding: 0,
                            margin: 0,
                            bottom: 10,
                            left: 0
                        }}
                    />

                </View>
               
              
            </View>
        )
    }
}

export default Slider
