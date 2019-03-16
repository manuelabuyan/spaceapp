import React from 'react';
import { Component,
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable  : true,
      dropZoneValues : null,
      pan            : new Animated.ValueXY()   //Take care of interpolating X & Y values
    };

    this.panResponder = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder : () => true,

      onPanResponderMove           : Animated.event([null,{ //Handler trigger when element is moving
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),
      
      onPanResponderRelease        : (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if(this.isDropZone(gesture)){ 
          this.setState({
            showDraggable : false // If in drop zone
          });
        }else{
          Animated.spring(            
            this.state.pan,         
            {
              toValue  : {x:0,y:0},
              friction : 5,
              tension: 20
            }     
          ).start();
        }
      } 
    });
  }

  isDropZone(gesture){     //Step 2
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event){ //Callback to set values
    this.setState({
        dropZoneValues : event.nativeEvent.layout
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
          <View 
              onLayout={this.setDropZoneValues.bind(this)}  
              style={styles.dropZone}>
              <Text style={styles.text}>Drop me here!</Text>
          </View>
          {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable(){
    if (this.state.showDraggable){
      return (
          <View style={styles.draggableContainer}>
              <Animated.View 
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout(), styles.circle]}
              >
                  <Text style={styles.text}>Drag me!</Text>
              </Animated.View>
          </View>
      );
    }
  }
}

const CIRCLE_RADIUS = 36;
const Window = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});