import React from 'react';
import {
  Component,
  Text,
  SafeAreaView,
  Button
} from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <Text>
          TEST@!#21as
                </Text>

        <Button
          title="EARTH: G BACK"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </SafeAreaView>

    );
  }
}