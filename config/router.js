import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';

export const AppNavigator = createStackNavigator (
    {
    Home: {
        screen: Home,
        navigationOptions: {
            gesturesEnabled: false,
        },
    }
    },{
        initialRouteName: "Home",
        headerMode: 'none',
        // transitionConfig: () => ({
        //     transitionSpec: {
        //     duration: 800
        //     },
        //     screenInterpolator: (props) => {
        //     return transitionConfiguration(props)
        //     }
        // })
    }
);
  
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

