import { createStackNavigator } from "@react-navigation/stack";
import barListScreen from './barListScreen';
import MenuScreen from './MenuScreen';

const BarMenusNavStack = createStackNavigator();

export default function BarsMenusNav(){
    return(
        <BarMenusNavStack.Navigator initialRouteName="Bar List">
            <BarMenusNavStack.Screen name="Bar List" component={barListScreen}/>
            <BarMenusNavStack.Screen name="Menu" component={MenuScreen}/>
        </BarMenusNavStack.Navigator>
    )
}