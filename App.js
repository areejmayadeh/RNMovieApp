/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MoviesList from './src/components/MoviesList';
import MovieDetails from './src/components/MovieDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetails} 
          options={{
            title: '',
            headerTintColor: 'black',
            headerBackTitleVisible: false,
            headerStyle: {
              shadowColor: 'transparent',
            },
            headerLeftContainerStyle: { marginHorizontal: 14}
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={MoviesList}
          options={{ headerShown: false,  headerTitle: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
