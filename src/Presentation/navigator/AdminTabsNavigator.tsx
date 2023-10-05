import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList';
import { AdminOrderListScreen } from '../views/admin/order/list/OrderList';
import { ClientCategoryListScreen } from '../views/client/cateogry/list/CategoryList';
import ProfileinfoScreen from '../views/profile/info/Profileinfo';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AdminCategoryListScreen" 
      component={AdminCategoryListScreen} 
      options={{
        title:'Categorias',
        tabBarLabel:'Categorias',
        tabBarIcon: ({ color })=>(
          <Image
          source={require('../../../assets/list.png')}
          style = {{width:25, height:25}}
          />
          )
      }}
      />
      <Tab.Screen name="AdminOrderListScreen" 
      component={AdminOrderListScreen} 
      options={{
        title:'Pedidos',
        tabBarLabel:'Pedidos',
        tabBarIcon: ({ color })=>(
          <Image
          source={require('../../../assets/orders.png')}
          style = {{width:25, height:25}}
          />
          )
      }}
      />
      <Tab.Screen name="ProfileinfoScreen" 
      component={ProfileinfoScreen} 
      options={{
        title:'Perfil',
        tabBarLabel:'Perfil',
        headerShown: false,
        tabBarIcon: ({ color })=>(
          <Image
          source={require('../../../assets/user_menu.png')}
          style = {{width:25, height:25}}
          />
          )
      }}
      />
    </Tab.Navigator>
  )
}
