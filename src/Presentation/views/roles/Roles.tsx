import React, { useState } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import useViewModel from './ViewModel';
import RolesItem from './Item';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../../../App';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParamList, 'RolesScreen'> { };

export const RolesScreen = ({navigation,route}:Props) => {
  const { user } = useViewModel();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height +40;
  const [mode, setMode] = useState<any>('horizontal-stack');
  const [snapDirection, setSnapDirection] = useState<'left' | 'right'>("left");
  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        {/* <FlatList
        data = {user?.roles}
        renderItem={ ({item}) => <RolesItem rol={item} height={420} width={width -100} />}
        keyExtractor={ (item) => (item?.id ? item.id.toString() : 'defaultKey')}
        /> */}
        <Carousel
          loop
          width={width}
          height={height / 2}
          data={user?.roles!}
          scrollAnimationDuration={5000}
          //onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => <RolesItem rol={item} height={420} width={width - 100}
          navigation={navigation}
          />}
          modeConfig={{
            snapDirection,
            stackInterval: 30
          }}
          mode={mode}
        />
      </View>
    </GestureHandlerRootView>
  )
}
