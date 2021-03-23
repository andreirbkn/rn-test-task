import React, {Component} from 'react';
import { Animated, StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default class HiddenView extends Component {
 
    constructor(){
        super();
        this.state={
          animationValue : new Animated.Value(80),
          viewState : true
        }
      }

      toggleAnimation=()=>{
 
        if(this.state.viewState == true){
        Animated.timing(this.state.animationValue, {
          toValue : 300,
          timing : 1500,
        }).start(()=>{
          this.setState({viewState : false})
        });
        }
        else{
          Animated.timing(this.state.animationValue, {
            toValue : 80,
            timing : 1500,
          }).start(this.setState({viewState: true})
          );
        }
      }
     
      render() {
     
        const animatedStyle = {
          height : this.state.animationValue

        }
     
        return (

               <Animated.View style={[styles.animatedBox, animatedStyle]} >
                 <Text style={styles.h2}>
                  Конфигуратор карьеры
                 </Text>
                 <TouchableHighlight  onPress={this.toggleAnimation} style={styles.openButton} underlayColor="rgba(155, 155, 155, 1)" >
                     <AntDesign name="down" size={18} color="#9fb0c0" style={{paddingTop: 1, paddingLeft: 1}}/>
                 </TouchableHighlight>  
               </Animated.View>
     

        );
      }
    };
     
    const styles = StyleSheet.create({
      MainContainer: {
      },
      animatedBox:
      {
         width: '100%',
         backgroundColor : '#38424e',
         borderRadius: 16,
         marginBottom: 20,
      },
     
      h2:{
        marginHorizontal: 30,
        marginVertical: 25,
        color : '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',

      },
      openButton: {
        position: 'absolute',
        bottom: -22,
        alignSelf: 'center',

        borderColor: '#f0f6fc',
        borderWidth: 7,


        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 100,
        elevation: 18,

        backgroundColor: '#38424e'
    },
    infoText: {
    }
});