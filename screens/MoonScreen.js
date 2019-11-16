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
} from 'react-native';

const Window = Dimensions.get('window');

export default class Home extends React.Component {
  // componentDidMount(){
  //   this.image = (<ImageBackground source={require('../assets/spacebg.png')} />);
  // }

  constructor(props) {
    super(props);

    this.state = {
      stars1Animated: new Animated.Value(0),
      stars1Visible: false
    };
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <View style={styles.mainContainer}>
          <ImageBackground
              source={require('../assets/spacebg.png')}
              style={styles.background}
              onLoadEnd={() => {
                this.setState({ stars1Visible: true })
              }}
          >

            {this.state.stars1Visible && this.renderStars1()}
            <Button
              title="MOON: G BACK"
              titleStyle={{ fontFamily: 'SPACEMAN' }}
              onPress={() => this.props.navigation.navigate('Home')}
            />

            <Text style={styles.moonTitle}>
              moon
            </Text>

          </ImageBackground>
        </View>
      </SafeAreaView>

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
  }
});