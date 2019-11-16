import React from 'react';
import {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  PanResponder,
  Animated,
  SafeAreaView,
  Easing,
  Dimensions
} from 'react-native';

const Window = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropZoneValues: null,
      panMoon: new Animated.ValueXY(),   //Take care of interpolating X & Y values
      panEarth: new Animated.ValueXY(),
      panGalaxy: new Animated.ValueXY(),
      stars1Animated: new Animated.Value(0),
      stars2Animated: new Animated.Value(0),
      stars2zAnimated: new Animated.Value(0),
      stars3zAnimated: new Animated.Value(-Window.width),
      moonAnimated: new Animated.Value(0),
      earthAnimated: new Animated.Value(0),
      galaxyAnimated: new Animated.Value(0),
      stars1Visible: false,
      stars2Visible: false,
      moonVisible: false,
      earthVisible: false,
      galaxyVisible: false,
      moonTextVisible: false,
      earthTextVisible: false,
      galaxyTextVisible: false
    };

    this.panResponderMoon = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([null, { //Handler trigger when element is moving
        dx: this.state.panMoon.x,
        dy: this.state.panMoon.y
      }]),

      onPanResponderRelease: (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if (this.isMoonDropZone(gesture)) {
          Animated.spring(
            this.state.panMoon,
            {
              toValue: { x: 0, y: 0 },
              friction: 5,
              tension: 20,
            }
          ).start();

          this.props.navigation.navigate('MoonScreen')
        } else {
          Animated.spring(
            this.state.panMoon,
            {
              toValue: { x: 0, y: 0 },
              friction: 5,
              tension: 20,
            }
          ).start();
        }
      }
    });

    this.panResponderEarth = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([null, { //Handler trigger when element is moving
        dx: this.state.panEarth.x,
        dy: this.state.panEarth.y
      }]),

      onPanResponderRelease: (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if (this.isEarthDropZone(gesture)) {
          Animated.spring(
            this.state.panEarth,
            {
              toValue: { x: 0, y: 0 },
              friction: 5,
              tension: 20,
            }
          ).start();

          this.props.navigation.navigate('EarthScreen')
        } else {
          Animated.spring(
            this.state.panEarth,
            {
              toValue: { x: 0, y: 0 },
              friction: 5,
              tension: 20
            }
          ).start();
        }
      }
    });

    this.panResponderGalaxy = PanResponder.create({    //Create the PanResponder - settling the handles
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([null, { //Handler trigger when element is moving
        dx: this.state.panGalaxy.x,
        dy: this.state.panGalaxy.y
      }]),

      onPanResponderRelease: (e, gesture) => { // When element is released, and not in drop zone, spring back to middle
        if (this.isGalaxyDropZone(gesture)) {
          Animated.spring(
            this.state.panGalaxy,
            {
              toValue: { x: 0, y: 0 },
              friction: 5,
              tension: 20,
            }
          ).start();

          this.props.navigation.navigate('GalaxyScreen')
        } else {
          Animated.spring(
            this.state.panGalaxy,
            {
              toValue: { x: 0, y: 0 },
              friction: 5,
              tension: 20
            }
          ).start();
        }
      }
    });
  }
  

  isMoonDropZone(gesture) { //Check if in 'drop zone'
    return ((Math.abs(gesture.dy) > Window.height / 5) || (Math.abs(gesture.dx) > Window.height / 5));
  }

  isEarthDropZone(gesture) { //Check if in 'drop zone'
    return ((Math.abs(gesture.dy) > (Window.width + Window.width / 10)) || (Math.abs(gesture.dx) > (Window.width + Window.width / 10)));
  }

  isGalaxyDropZone(gesture) { //Check if in 'drop zone'
    return ((Math.abs(gesture.dy) > Window.height / 5) || (Math.abs(gesture.dx) > Window.height / 5));
  }

  renderMoon() {
    return (
      <View style={styles.draggableMoonContainer}>
        <Animated.View
          {...this.panResponderMoon.panHandlers}
          style={[this.state.panMoon.getLayout()]}
        >
          <Animated.Image
            style={[styles.moon, { opacity: this.state.earthAnimated }]}
            source={require('../assets/moon.png')}
            resizeMode="contain"
            onLoad={this.onMoonLoad.bind(this)}
          />
        </Animated.View>
      </View>
    );
  }

  renderEarth() {
    return (
      <View style={styles.draggableEarthContainer}>
        <Animated.View
          {...this.panResponderEarth.panHandlers}
          style={[this.state.panEarth.getLayout()]}
        >
          <Animated.Image
            style={[styles.earth, { opacity: this.state.earthAnimated }]}
            source={require('../assets/earth.png')}
            resizeMode="contain"
            onLoad={this.onEarthLoad.bind(this)}
          />
        </Animated.View>
      </View>
    );
  }

  renderGalaxy() {
    return (
      <View style={styles.draggableGalaxyContainer}>
        <Animated.View
          {...this.panResponderGalaxy.panHandlers}
          style={[this.state.panGalaxy.getLayout()]}
        >
          <Animated.Image
            style={[styles.galaxy, { opacity: this.state.galaxyAnimated }]}
            source={require('../assets/galaxy.png')}
            resizeMode="contain"
            onLoad={this.onGalaxyLoad.bind(this)}
          />
        </Animated.View>
      </View>
    );
  }

  renderStars1() {
    return (
      <Animated.Image
        source={require('../assets/stars1.png')}
        style={[styles.background, { opacity: this.state.stars1Animated }]}
        onLoad={this.onStars1Load.bind(this)}
      />
    )
  }

  renderStars2() {
    return (
      <Animated.Image
        source={require('../assets/stars2.png')}
        style={[styles.background, { opacity: this.state.stars2Animated, left: this.state.stars2zAnimated }]}
        onLoad={this.onStars2Load.bind(this)}
      />
    )
  }

  renderStars3() {
    return (
      <Animated.Image
        source={require('../assets/stars2.png')}
        style={[styles.background, { opacity: this.state.stars2Animated, left: this.state.stars3zAnimated }]}
      />
    )
  }

  renderMoonText() {
    return (
      <Text style={styles.moonText}>
        Moon
      </Text>
    )
  }

  renderGalaxyText() {
    return (
      <Text style={styles.galaxyText}>
        Galaxy
      </Text>
    )
  }

  renderEarthText() {
    return (
      <Text style={styles.earthText}>
        Earth
      </Text>
    )
  }

  onStars1Load() {
    Animated.timing(
      this.state.stars1Animated,
      {
        toValue: 1,
        duration: 500
      }
    ).start()
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
              duration: 60000,
              easing: Easing.linear
            }
          ),
          Animated.timing(
            this.state.stars3zAnimated,
            {
              toValue: 0,
              duration: 60000,
              easing: Easing.linear
            }
          )
        ])
      )
    ]).start()
  }

  onGalaxyLoad() {
    Animated.timing(
      this.state.galaxyAnimated,
      {
        toValue: 1,
        duration: 3000
      }
    ).start(() => { this.setState({ galaxyTextVisible: true }) })
  }

  onMoonLoad() {
    Animated.timing(
      this.state.moonAnimated,
      {
        toValue: 1,
        duration: 3000
      }
    ).start(() => { this.setState({ moonTextVisible: true }) })
  }

  onEarthLoad() {
    Animated.timing(
      this.state.earthAnimated,
      {
        toValue: 1,
        duration: 3000
      }
    ).start(() => { this.setState({ earthTextVisible: true }) })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <View style={styles.mainContainer}>
          <ImageBackground
            source={require('../assets/spacebg.png')}
            style={styles.background}
            onLoadEnd={() => {
              this.setState({ stars1Visible: true }),
              this.setState({ stars2Visible: true }),
              this.setState({ moonVisible: true }),
              this.setState({ earthVisible: true }),
              this.setState({ galaxyVisible: true })
              }
            }
          >
            {this.state.stars1Visible && this.renderStars1()}
            {this.state.stars2Visible && this.renderStars2()}
            {this.state.stars2Visible && this.renderStars3()}

            {/* {this.dropZoneLoad()} */}

            {this.state.galaxyTextVisible && this.renderGalaxyText()}
            {this.state.moonTextVisible && this.renderMoonText()}
            {this.state.earthTextVisible && this.renderEarthText()}

            {this.state.galaxyVisible && this.renderGalaxy()}
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
    flex: 1
  },
  galaxyText: {
    position: 'absolute',
    color: 'white',
    fontSize: Window.width / 11,
    top: (Window.height / 6 - Window.height / 5 / 2) + Window.height / 9,
    left: (Window.width / 3 - Window.height / 5 / 2) + Window.width / 5.5,
    // fontFamily: 'sans-serif'
  },
  moonText: {
    position: 'absolute',
    color: 'white',
    fontSize: Window.width / 11,
    top: (Window.height / 5 * 2 - Window.height / 5 / 5) + Window.height / 13,
    left: (Window.width / 3 * 2 - Window.height / 5 / 2) + Window.height / 20,
    // fontFamily: 'SPACEMAN'
  },
  earthText: {
    position: 'absolute',
    color: 'white',
    fontSize: Window.width / 11,
    top: (Window.height - (Window.width / 2) - Window.width / 5) + Window.height / 13,
    left: Window.width / 2 - Window.width / 11,
    // fontFamily: 'sans-serif'
  },
  background: {
    height: Window.height,
    width: Window.width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  draggableMoonContainer: {
    position: 'absolute',
    top: Window.height / 5 * 2 - Window.height / 5 / 5,
    left: Window.width / 3 * 2 - Window.height / 5 / 2,
  },
  draggableEarthContainer: {
    position: 'absolute',
    top: Window.height - (Window.width / 2) - Window.width / 5,
    left: -Window.width / 20,
  },
  draggableGalaxyContainer: {
    position: 'absolute',
    top: Window.height / 6 - Window.height / 5 / 2,
    left: Window.width / 3 - Window.height / 5 / 2,
  },
  moon: {
    height: Window.height / 5,
    width: Window.height / 5
  },
  earth: {
    height: Window.width + Window.width / 10,
    width: Window.width + Window.width / 10
  },
  galaxy: {
    height: Window.height / 3.5,
    width: Window.height / 3.5
  },
});