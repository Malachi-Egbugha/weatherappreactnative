import React from 'react';
import {

  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './screens/Search';
import Home from './screens/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor="#00aaff" />
  <NavigationContainer>
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarIcon:({ focused, color, size })=>{
        let iconName;
        if(route.name === 'home'){
          iconName = 'home-city-outline'
        }else if(route.name === 'search'){
          iconName = "city"
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color}/>

      }
    }

    )}
    tabBarOptions={{
      activeTinColor:"#00aaff",
      inactiveTintColor:"#000000",
      activeBackgroundColor:"grey",
      inactiveBackgroundColor:"grey",
    }}
    >
      <Tab.Screen name="Home" component={Home} initialParams ={{city:"london"}}/>
      <Tab.Screen name="Search" component={Search}/>
    </Tab.Navigator>
  </NavigationContainer>
     
    </>
  );
};



export default App;
