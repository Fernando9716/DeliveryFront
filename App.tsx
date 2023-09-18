import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import ProfileinfoScreen from './src/Presentation/views/profile/info/Profileinfo';


export type RootStackParamList = {
  HomeScreen: undefined,
  RegisterScreen: undefined
  ProfileinfoScreen: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {
          headerShown: false
        }
      }>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
        />
        <Stack.Screen
          name='RegisterScreen'
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: ''
          }}
        />
        <Stack.Screen
          name='ProfileinfoScreen'
          component={ProfileinfoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;