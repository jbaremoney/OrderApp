import { createStackNavigator } from "@react-navigation/stack";
import barListScreen from "./barListScreen";
import MenuScreen from "./MenuScreen";


const BarsMenusStack = createStackNavigator()

export default function BarsMenusNav(){
    return(
    <BarsMenusStack.Navigator initialRouteName="Bars">
        <BarsMenusStack.Screen name="Bars" component={barListScreen}/>
        <BarsMenusStack.Screen name="Drinks" component={MenuScreen}/>
    </BarsMenusStack.Navigator>
    )
}