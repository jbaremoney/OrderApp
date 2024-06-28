import { createStackNavigator } from "@react-navigation/stack";
import barListScreen from "./barListScreen";
import MenuScreen from "./MenuScreen";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';



const BarsMenusStack = createStackNavigator()

export default function BarsMenusNav(){
    return(
    <BarsMenusStack.Navigator initialRouteName="Bars" 
        // screenOptions= {{headerRight:() => 
        // <TouchableOpacity style = {{marginRight:20}} onPress={() => navigation.navigate('Cart')}>
        //     <Icon
        //         name = {'shopping-cart'}
        //         color = {'black'}
        //         size = {24}
        //     />
        // </TouchableOpacity>}}
        >
        <BarsMenusStack.Screen name="Bars" component={barListScreen} />
        <BarsMenusStack.Screen name="Drinks" component={MenuScreen}/>
    </BarsMenusStack.Navigator>
    )
}