import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';

import { Ionicons } from '@expo/vector-icons';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import userPseudo from './reducers/pseudo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = createStore(combineReducers({userPseudo}));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LocaPic" component={LocaPicScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const LocaPicScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Map') {
            iconName = 'navigate-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#eb4d4b',
        inactiveTintColor: '#FFFFFF',
        tabStyle: styles.tabBar
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: '#130f40',
  },
});
