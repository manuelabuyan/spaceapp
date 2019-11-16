import React from 'react';
import { createAppContainer } from 'react-navigation';

import { AppNavigator } from './config/router';
import * as Font from 'expo-font';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'SPACEMAN': require('./assets/fonts/SPACEMAN.ttf'),
    });
  }

  //  //EXAMPLE OF LOADING SCREEN
  //  if (!this.state.fontLoaded) {
  //    return <AppLoading />
  //  }

  render() {
    return (
      <AppContainer />
    );
  }
}


// render() {
//   const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

//   if (!this.state.fontLoaded) {
//     return <AppLoading />
//   }

//   return (
//     <Provider store={store}>
//       <Router />
//     </Provider>
//   )
// }

