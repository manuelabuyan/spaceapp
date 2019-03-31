import React from 'react';
import { Component,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  PanResponder,
  Animated,
  SafeAreaView,
  Easing,
  Dimensions} from 'react-native';

const Window = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropZoneValues     : null,
      panMoon            : new Animated.ValueXY(),   //Take care of interpolating X & Y values
      panEarth           : new Animated.ValueXY(),
      panMilkyWay        : new Animated.ValueXY(),
      stars1Animated     : new Animated.Value(0),
      stars2Animated     : new Animated.Value(0),
      stars2zAnimated    : new Animated.Value(0),
      stars3zAnimated    : new Animated.Value(-Window.width),
      moonAnimated       : new Animated.Value(0),
      earthAnimated      : new Animated.Value(0),
      milkyWayAnimated   : new Animated.Value(0),
      stars1Visible      : false,
      stars1Visible      : false,
      moonVisible        : false,
      earthVisible       : false,
      milkyWayVisible    : false
    };

    this.panResponderMoon = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder : () => true,

      onPanResponderMove           : Animated.event([null,{ //Handler trigger when element is moving
        dx : this.state.panMoon.x,
        dy : this.state.panMoon.y
      }]),
      
      onPanResponderRelease        : (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if(this.isMoonDropZone(gesture)){ 
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
        if(this.isEarthDropZone(gesture)){ 
          this.setState({
            // If in drop zone, do something
          });
        }else{
          Animated.spring(            
            this.state.panEarth,         
            {
              toValue  : {x:0,y:0},
              friction : 5,
              tension  : 20
            }     
          ).start();
        }
      } 
    });

    this.panResponderMilkyWay = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder : () => true,

      onPanResponderMove           : Animated.event([null,{ //Handler trigger when element is moving
        dx : this.state.panMilkyWay.x,
        dy : this.state.panMilkyWay.y
      }]),
      
      onPanResponderRelease        : (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if(this.isMilkyWayDropZone(gesture)){ 
          this.setState({
            // If in drop zone, do something
          });
        }else{
          Animated.spring(            
            this.state.panMilkyWay,         
            {
              toValue  : {x:0,y:0},
              friction : 5,
              tension  : 20
            }     
          ).start();
        }
      } 
    });
  }

  isMoonDropZone(gesture){ //Check if in 'drop zone'
    return ((Math.abs(gesture.dy) > Window.height/5) || (Math.abs(gesture.dx) > Window.height/5));
  }

  isEarthDropZone(gesture){ //Check if in 'drop zone'
    return ((Math.abs(gesture.dy) > (Window.width + Window.width/10)) || (Math.abs(gesture.dx) > (Window.width + Window.width/10)));
  }

  isMilkyWayDropZone(gesture){ //Check if in 'drop zone'
    return ((Math.abs(gesture.dy) > Window.height/5) || (Math.abs(gesture.dx) > Window.height/5));
  }

  // setDropZoneValues(event){ //Callback to set values
  //   this.setState({
  //     dropZoneValues : event.nativeEvent.layout
  //   });
  // }

  renderMoon(){
    return (
        <View style={styles.draggableMoonContainer}>
            <Animated.View 
              {...this.panResponderMoon.panHandlers}
              style={[this.state.panMoon.getLayout()]}
            >
              <Animated.Image
                style={[styles.moon, {opacity: this.state.earthAnimated}]}
                source={require('../assets/moon.png')}
                resizeMode="contain"
                onLoad={this.onMoonLoad.bind(this)}
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
              <Animated.Image
                style={[styles.earth, {opacity: this.state.earthAnimated}]}
                source={require('../assets/earth.png')}
                resizeMode="contain"
                onLoad={this.onEarthLoad.bind(this)}
              />
            </Animated.View>
        </View>
    );
  }

  renderMilkyWay(){
    return (
        <View style={styles.draggableMilkyWayContainer}>
            <Animated.View 
              {...this.panResponderMilkyWay.panHandlers}
              style={[this.state.panMilkyWay.getLayout()]}
            >
              <Animated.Image
                style={[styles.milkyWay, {opacity: this.state.milkyWayAnimated}]}
                source={require('../assets/milkyway.png')}
                resizeMode="contain"
                onLoad={this.onMilkyWayLoad.bind(this)}
              />
            </Animated.View>
        </View>
    );
  }

  renderStars1(){
    return(
      <Animated.Image
        source={require('../assets/stars1.png')}
        style={[styles.background, {opacity: this.state.stars1Animated}]}
        onLoad={this.onStars1Load.bind(this)}
      />
    )
  }

  renderStars2(){
    return(
      <Animated.Image
        source={require('../assets/stars2.png')}
        style={[styles.background, {opacity: this.state.stars2Animated, left: this.state.stars2zAnimated}]}
        onLoad={this.onStars2Load.bind(this)}
      />
    )
  }

  renderStars3(){
    return(
      <Animated.Image
        source={require('../assets/stars2.png')}
        style={[styles.background, {opacity: this.state.stars2Animated, left: this.state.stars3zAnimated}]}
      />
    )
  }

  // dropZoneLoad() {
  //   return(
  //     <View 
  //       onLayout={this.setDropZoneValues.bind(this)}  
  //       style={styles.dropZone}
  //     />
  //   )
  // }

  onStars1Load() {
    Animated.timing(
      this.state.stars1Animated,
      {
        toValue: 1,
        duration: 500
      }
    ).start()
    //( () => {this.setState({ moonVisible: true }), this.setState({ earthVisible: true }), this.setState({ milkyWayVisible: true }) } )
  }
  
  onStars2Load() {
    Animated.parallel([
      Animated.timing(
        this.state.stars2Animated,
        {
          toValue: 1,
          duration: 3000
        }
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(
            this.state.stars2zAnimated,
            {
              toValue: Window.width,
              duration: 30000,
              easing: Easing.linear
            }
          ),
          Animated.timing(
            this.state.stars3zAnimated,
            {
              toValue: 0,
              duration: 30000,
              easing: Easing.linear
            }
          )
        ])
      )
    ]).start()
  }

  onMilkyWayLoad() {
    Animated.timing(
      this.state.milkyWayAnimated,
      {
        toValue: 1,
        duration: 3000
      }
    ).start()
  }

  onMoonLoad() {
    Animated.timing(
      this.state.moonAnimated,
      {
        toValue: 1,
        duration: 3000
      }
    ).start()
  }

  onEarthLoad() {
    Animated.timing(
      this.state.earthAnimated,
      {
        toValue: 1,
        duration: 3000
      }
    ).start()
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
        <View style={styles.mainContainer}>
          <ImageBackground 
            source={require('../assets/spacebg.png')} 
            style={styles.background} 
            onLoadEnd={ () => {
              this.setState({ stars1Visible: true }),
              this.setState({ stars2Visible: true }),
              this.setState({ moonVisible: true }),
              this.setState({ earthVisible: true }),
              this.setState({ milkyWayVisible: true }) } 
            }
          >
            {this.state.stars1Visible && this.renderStars1()}
            {this.state.stars2Visible && this.renderStars2()}
            {this.state.stars2Visible && this.renderStars3()}

            {/* {this.dropZoneLoad()} */}
            
            <Text style={styles.galaxyText}>
              Galaxy
            </Text>

            <Text style={styles.moonText}>
              Moon
            </Text>

            <Text style={styles.earthText}>
              Earth
            </Text>
            
            {this.state.milkyWayVisible && this.renderMilkyWay()}
            {this.state.moonVisible && this.renderMoon()}
            {this.state.earthVisible && this.renderEarth()}
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }

}

//css
const styles = StyleSheet.create({
    mainContainer: {
      flex    : 1
    },
    dropZone    : {
      height         : 0,
    },
    galaxyText        : {
      position: 'absolute',
      color : 'white',
      fontSize: Window.width/11,
      top         : (Window.height/6 - Window.height/5 / 2) + Window.height/9,
      left        : (Window.width/3 - Window.height/5 / 2) + Window.width/5.5,
      // fontFamily: 'sans-serif'
    },
    moonText        : {
      position: 'absolute',
      color : 'white',
      fontSize: Window.width/11,
      top         : (Window.height/5*2 - Window.height/5 / 5) + Window.height/13,
      left        : (Window.width/3*2 - Window.height/5 / 2) + Window.height/20,
      // fontFamily: 'sans-serif'
    },
    earthText        : {
      position: 'absolute',
      color : 'white',
      fontSize: Window.width/11,
      top         : (Window.height-(Window.width/2) - Window.width/5) + Window.height/13,
      left        : Window.width/2 - Window.width/11,
      // fontFamily: 'sans-serif'
    },
    background     : {
      height: Window.height,
      width: Window.width,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    draggableMoonContainer: {
      position    : 'absolute',
      top         : Window.height/5*2 - Window.height/5 / 5,
      left        : Window.width/3*2 - Window.height/5 / 2,
    },
    draggableEarthContainer: {
      position    : 'absolute',
      top         : Window.height-(Window.width/2) - Window.width/5,
      left        : -Window.width/20,
    },
    draggableMilkyWayContainer: {
      position    : 'absolute',
      top         : Window.height/6 - Window.height/5 / 2,
      left        : Window.width/3 - Window.height/5 / 2,
    },
    moon   : {
      height : Window.height/5, 
      width : Window.height/5 
    },
    earth   : {
      height : Window.width + Window.width/10,
      width : Window.width + Window.width/10
    },
    milkyWay   : {
      height : Window.height/3.5,
      width : Window.height/3.5
    },
});