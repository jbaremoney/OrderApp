import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserScreen from './User/UserScreen';
import BarsMenusNav  from './Ordering/BarsMenusNav';
import MapScreen  from './Map/MapScreen';
import GiftScreen  from './Rewards/GiftScreen';
import CartScreen from './Ordering/CartScreen'
import { Text, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'; //need for navigation between screens


//Need user icon, drink icon, map icon, gift icon

const Tab = createBottomTabNavigator(); //This is the bottom tab
const Stack = createNativeStackNavigator(); //creates a stack for the screens


const HomeTabs = ({navigation}) => {
  return (
      <Tab.Navigator
        initialRouteName='Order'
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            let iconName;
            //This case stuff is just deciding what icon goes on what screen.
            switch (route.name) {
                case 'Order':
                  iconName = 'glass';
                  break;
                case 'Map':
                  iconName = 'map-marker';
                  break;
                case 'Gift':
                  iconName = 'gift';
                  break;
                case 'User Info':
                  iconName = 'user';
                  break;
                default:
                  break;
              }

              return <Icon name={iconName} color={color} size={24} />;
            },
            //This is to show what screen is in use by changing the color of the icon. We can change the color
                tabBarActiveTintColor:  "purple",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [
                  {
                    display: "flex"
                  },
                  null
                ],
      
                 headerRight:() => <TouchableOpacity style = {{marginRight:20}} onPress={() => 
                    
                    navigation.navigate('Cart')
                  }>
                    <Icon
                       name = {'shopping-cart'}
                       color = {'black'}
                       size = {24}
                     />
                 </TouchableOpacity>
                 
        })}
      >
        <Tab.Screen name="Order" component={BarsMenusNav}/>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Gift" component={GiftScreen} />
        <Tab.Screen name="User Info" component={UserScreen} />
      </Tab.Navigator>//This all is adding the screens to the tab. You can add as many screens as you want. 
  );
};

function HomeScreen() {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="OrderTab" component={HomeTabs}/>
        <Stack.Screen name="Cart" component={CartScreen}  options={
          {
            headerShown:true,
          }
        }
        />
      </Stack.Navigator>
  );
}

export default HomeScreen;
