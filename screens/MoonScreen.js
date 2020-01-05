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

import SafeViewStyle from '../components/SafeViewStyle';
import BackgroundStyle from '../components/BackgroundStyle';
import MainContainerStyle from '../components/MainContainerStyle';

const Window = Dimensions.get('window');

export default class Home extends React.Component {
  // componentDidMount(){
  //   this.image = (<ImageBackground source={require('../assets/spacebg.png')} />);
  // }

  //https://www.icalendar37.net/lunar/api/?lang=en&month=1&year=2020

  constructor(props) {
    super(props);

    this.state = {
      spacebgVisible: false,
      spacebgAnimated: new Animated.Value(0),
      stars1Animated: new Animated.Value(0),
      stars1Visible: false,
    };
  }

  renderStars1() {
    return (
      <Animated.Image
        source={require('../assets/stars1.png')}
        style={[BackgroundStyle.BackgroundStyle, { opacity: this.state.stars1Animated }]}
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
        <View style={MainContainerStyle.MainContainerStyle}>
          <ImageBackground
              source={require('../assets/spacebg.png')}
              style={BackgroundStyle.BackgroundStyle}
              onLoadEnd={() => {
                this.setState({ stars1Visible: true })
              }}
          >

            <Text style={styles.moonTitle}>
              moon
            </Text>

            <Text style={styles.textStyle}>
              <Text>
                Phase: {this.props.navigation.state.params.moonStatsVar.phaseName}
                {"\n\n"}
                Percentage: {this.props.navigation.state.params.moonStatsVar.phasePercentage}%
                {"\n\n"}
              </Text>

              <Text>
                TESTSET
                {"\n\n"}
                TESTSET
                {"\n\n"}
                TESTSET
                {"\n\n"}
                TESTSET
              </Text>
            </Text>
            

            {this.state.stars1Visible && this.renderStars1()}

            {/* <Button
              title="MOON: G BACK"
              // titleStyle={{ fontFamily: 'SPACEMAN' }}
              onPress={() => this.props.navigation.navigate('Home')}
            /> */}

            

          </ImageBackground>
        </View>
      </SafeAreaView>
      </>

    );
  }
}

const styles = StyleSheet.create({
  moonTitle: {
    fontFamily: 'SPACEMAN',
    position: 'absolute',
    color: 'white',
    fontSize: Window.width / 7,
    height: Window.height - (Window.height/10),
  },
  textStyle: {
    // fontFamily: 'SPACEMAN',
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
    fontSize: Window.width / 15,
    height: Window.height / 2,
  }
});