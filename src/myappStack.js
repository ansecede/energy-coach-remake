import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReportScreen from './screens/ReportScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './utils/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Reports') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen
      options={{ headerShown: false }}
      name="Profile"
      component={ProfileScreen}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Reports"
      component={ReportScreen}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="HomeFeed"
      component={AppTab}
    />
  </Stack.Navigator>
);

// Editar este componente para que aparezca el loginscreen
const AppNavigator = () => {
  const { currentUser } = useContext(AuthContext);
  const isSignedIn = !!currentUser?.email;
  console.log(isSignedIn);

  return (
    <>
      {isSignedIn ? (
        <>
          <AppStack />
        </>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default AppNavigator;
