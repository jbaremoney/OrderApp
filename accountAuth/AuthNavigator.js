import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Create Account" component={CreateAccountScreen} />
    </AuthStack.Navigator>
  );
}