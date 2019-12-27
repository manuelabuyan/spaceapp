import React from 'react';
import { createAppContainer } from 'react-navigation';

import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import { AppNavigator } from './config/router';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    Asset.loadAsync([
      require('./assets/spacebg.png'),
      require('./assets/earth.png'),
      require('./assets/moon.png'),
      require('./assets/galaxy.png'),
      require('./assets/moon_rotate.gif')
    ]),

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

