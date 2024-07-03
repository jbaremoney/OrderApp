import { createStackNavigator } from "@react-navigation/stack";
import CheckoutScreen from "./CheckoutScreen";
import CartScreen from "./CartScreen"

const PosStack = createStackNavigator();

export default function PosNav() {
    return (
        <PosStack.Navigator initialRouteName="Cart">
            <PosStack.Screen name="Cart" component={CartScreen}/>
            <PosStack.Screen name="Checkout" component={CheckoutScreen}/>
        </PosStack.Navigator>
    )
}