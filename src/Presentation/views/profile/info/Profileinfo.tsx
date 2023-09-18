import React from 'react'
import { View, Text, Button } from 'react-native';
import useViewModel from './ViewModel'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileinfoScreen'>{};

const ProfileinfoScreen = ({navigation,route}:Props) => {
  const {clearSesion} = useViewModel();
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
       <Button
        title='Cerrar sesion'
        onPress={()=>{
          clearSesion();
          navigation.navigate('HomeScreen');
        }}
       
       />
    </View>
  )
}

export default ProfileinfoScreen