import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserScreen from './UserScreen';
import OrderScreen  from './OrderScreen';
import MapScreen  from './MapScreen';
import GiftScreen  from './GiftScreen';
import BarsMenusNav from './BarsMenusNav';
//Need user icon, drink icon, map icon, gift icon

const Tab = createBottomTabNavigator(); //This is the bottom tab

const MainTabNavigator = () => {
  return (
      <Tab.Navigator
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
                ]
              
        })}
      >
        <Tab.Screen name="Order" component={BarsMenusNav} /> 
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Gift" component={GiftScreen} />
        <Tab.Screen name="User Info" component={UserScreen} />
      </Tab.Navigator>//This all is adding the screens to the tab. You can add as many screens as you want. 
  );
};

export default MainTabNavigator;
