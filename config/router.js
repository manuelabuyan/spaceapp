import { createStackNavigator, createAppContainer } from 'react-navigation';
import { zoomIn, zoomOut, fromRight } from 'react-navigation-transitions'

import Home from '../screens/Home';
import MoonScreen from '../screens/MoonScreen';
import EarthScreen from '../screens/EarthScreen';
import GalaxyScreen from '../screens/GalaxyScreen';

const handleCustomTransition = ({ scenes }) => {
  // const prevScene = scenes[scenes.length - 2];
  // const nextScene = scenes[scenes.length - 1];
 
  // // Custom transitions go there
  // if (prevScene
  //   && prevScene.route.routeName === 'MoonScreen'
  //   && nextScene.route.routeName === 'Home') {
  //   return zoomIn(2000);
  // }
  // } else if (prevScene
  //   && prevScene.route.routeName === 'Home'
  //   && nextScene.route.routeName === 'EarthScreen') {
  //   return zoomIn(2000);
  // }
  // else if (prevScene
  //   && prevScene.route.routeName === 'Home'
  //   && nextScene.route.routeName === 'EarthScreen') {
  //   return zoomIn(2000);
  // }
  return zoomIn(800);
}

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    MoonScreen: {
      screen: MoonScreen,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    EarthScreen: {
      screen: EarthScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    GalaxyScreen: {
      screen: GalaxyScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  }, {
    initialRouteName: "Home",
    headerMode: 'none',
    transitionConfig: (nav) => handleCustomTransition(nav),

  }
);

        // transitionConfig: () => ({
        //     transitionSpec: {
        //     duration: 800
        //     },
        //     screenInterpolator: (props) => {
        //     return transitionConfiguration(props)
        //     }
        // })
// const transitionConfiguration = (props) => {
//     const { layout, position, scene } = props
//     const { index, route } = scene;
//     const params = route.params || {};
//     const transition = params.transition || 'other';

//     return {
//         fade: FadeTransition(index, position, layout),
//         fadePause: FadePauseTransition(index, position, layout),
//         default: DefaultTransition(index, position, layout),
//     }[transition]
// }

// const DefaultTransition = (index, position, layout) => {
//     const width = layout.initWidth

//     const translateY = 0;
//     const translateX = position.interpolate({
//         inputRange: [index - 1, index],
//         outputRange: [width+width, 0],
//     });
//     return {
//         transform: [
//             { translateX },
//             { translateY }
//         ],
//     }
// }

// const FadeTransition = (index, position, layout) => {
//     const opacity = position.interpolate({
//     inputRange: [index - 1, index],
//     outputRange: [0, 1],
//     })

//     return {
//         opacity
//     }
// }

// const FadePauseTransition = (index, position, layout) => {
//     const opacity = position.interpolate({
//     inputRange: [index - 1, index],
//     outputRange: [0, 0.8],
//     })

//     return {
//         opacity
//     }
// }

