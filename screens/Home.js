import React from 'react';
import { Component,
  StyleSheet,
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  SafeAreaView,
  Dimensions} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropZoneValues : null,
      panMoon            : new Animated.ValueXY(),   //Take care of interpolating X & Y values
      panEarth           : new Animated.ValueXY() 
    };

    this.panResponderMoon = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder : () => true,

      onPanResponderMove           : Animated.event([null,{ //Handler trigger when element is moving
        dx : this.state.panMoon.x,
        dy : this.state.panMoon.y
      }]),
      
      onPanResponderRelease        : (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if(this.isDropZone(gesture)){ 
          this.setState({
            // If in drop zone, do something
          });
        }else{
          Animated.spring(            
            this.state.panMoon,         
            {
              toValue  : {x:0,y:0},
              friction : 5,
              tension  : 20,
            }     
          ).start();
        }
      } 
    });

    this.panResponderEarth = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder : () => true,

      onPanResponderMove           : Animated.event([null,{ //Handler trigger when element is moving
        dx : this.state.panEarth.x,
        dy : this.state.panEarth.y
      }]),
      
      onPanResponderRelease        : (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if(this.isDropZone(gesture)){ 
          this.setState({
            // If in drop zone, do something
          });
        }else{
          Animated.spring(            
            this.state.panEarth,         
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

  isDropZone(gesture){ //Check if in 'drop zone'
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event){ //Callback to set values
    this.setState({
        dropZoneValues : event.nativeEvent.layout
    });
  }

  renderMoon(){
    return (
        <View style={styles.draggableMoonContainer}>
            <Animated.View 
              {...this.panResponderMoon.panHandlers}
              style={[this.state.panMoon.getLayout()]}
            >
              <Image
                style={styles.moon}
                source={require('../assets/moon.png')}
                resizeMode="contain"
              />
            </Animated.View>
        </View>
    );
  }

  renderEarth(){
    return (
        <View style={styles.draggableEarthContainer}>
            <Animated.View 
              {...this.panResponderEarth.panHandlers}
              style={[this.state.panEarth.getLayout()]}
            >
              <Image
                style={styles.earth}
                source={require('../assets/earth.png')}
                resizeMode="contain"
              />
            </Animated.View>
        </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#222222'}}>
        <View style={styles.mainContainer}>
            <View 
              onLayout={this.setDropZoneValues.bind(this)}  
              style={styles.dropZone}
            >
            </View>
            {this.renderMoon()}
            {this.renderEarth()}
        </View>
      </SafeAreaView>
    );
  }

}

//css
const Window = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
      flex    : 1
    },
    dropZone    : {
      height         : 200,
      backgroundColor:'#2c3e50'
    },
    text        : {

    },
    draggableMoonContainer: {
      position    : 'absolute',
      top         : Window.height/5*2 - Window.height/5 / 2,
      left        : Window.width/3*2 - Window.height/5 / 2,
    },
    draggableEarthContainer: {
      position    : 'absolute',
      top         : Window.height-(Window.width/2) - Window.width/5,
      left        : -Window.width/20,
    },
    moon   : {
      height : Window.height/5, 
      width : Window.height/5 
    },
    earth   : {
      height : Window.width + Window.width/10,
      width : Window.width + Window.width/10
    },
});