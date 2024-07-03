import { createStackNavigator } from "@react-navigation/stack";
// import MenuScreen from "./MenuScreen";
// import { TouchableOpacity } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import UserScreen from "./UserScreen";
import IdentificationScreen from "./IdentificationScreen"



const UserStack = createStackNavigator()

export default function UserNav({navigation}){
    return(
    <UserStack.Navigator initialRouteName="Profile Information" 
        // screenOptions= {{headerRight:() => 
        // <TouchableOpacity style = {{marginRight:20}} onPress={() => navigation.navigate('POS')}>
        //     <Icon
        //         name = {'shopping-cart'}
        //         color = {'black'}
        //         size = {24}
        //     />
        // </TouchableOpacity>}}
        >
        <UserStack.Screen name="Profile Information" component={UserScreen} />
        <UserStack.Screen name="Identification" component={IdentificationScreen}/>
        
    </UserStack.Navigator>
    )
}