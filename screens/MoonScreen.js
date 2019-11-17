import React from 'react';
import {
  Component,
  View,
  Animated,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import SafeViewStyle from "../components/SafeViewStyle";

const Window = Dimensions.get('window');

export default class Home extends React.Component {
  // componentDidMount(){
  //   this.image = (<ImageBackground source={require('../assets/spacebg.png')} />);
  // }

  constructor(props) {
    super(props);

    this.state = {
      spacebgVisible: false,
      spacebgAnimated: new Animated.Value(0),
      stars1Animated: new Animated.Value(0),
      stars1Visible: false
    };
  }

  renderSpacebg() {
    return (
      <Animated.Image
        source={require('../assets/spacebg.png')}
        style={[styles.background, { opacity: this.state.spacebgAnimated }]}
        onLoad={this.onSpacebgLoad.bind(this)}
      />
    )
  }

  onSpacebgLoad() {
    Animated.timing(
      this.state.spacebgAnimated,
      {
        toValue: 1,
        duration: 500
      }
    ).start()
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

  onStars1Load() {
    Animated.timing(
      this.state.stars1Animated,
      {
        toValue: 1,
        duration: 1000
      }
    ).start()
  }

  render() {
    return (
      <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={SafeViewStyle.SafeViewStyle} forceInset={{ top: 'always', bottom: 'always' }}>
        <View style={styles.mainContainer}>
          <ImageBackground
              source={require('../assets/spacebg.png')}
              style={styles.background}
              onLoadEnd={() => {
                this.setState({ stars1Visible: true })
              }}
          >

            <Text style={styles.moonTitle}>
              moon
            </Text>

            {this.state.stars1Visible && this.renderStars1()}
            <Button
              title="MOON: G BACK"
              // titleStyle={{ fontFamily: 'SPACEMAN' }}
              onPress={() => this.props.navigation.navigate('Home')}
            />

          </ImageBackground>
        </View>
      </SafeAreaView>
      </>

    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  background: {
    height: Window.height,
    width: Window.width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  moonTitle: {
    fontFamily: 'SPACEMAN',
    position: 'absolute',
    color: 'white',
    fontSize: Window.width / 7,
    height: Window.height - (Window.height/10),
  }
});