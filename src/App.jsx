import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PostsListPage from './screens/PostsListPage';
import CreatePost from './screens/CreatePost';
import EditPost from './screens/EditPost';
import PostDetailPage from './screens/PostDetailPage';
import Login from './screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Posts" component={PostsListPage} />
        <Stack.Screen name="NewPost" component={CreatePost} />
        <Stack.Screen name="EditPost" component={EditPost} />
        <Stack.Screen name="PostDetail" component={PostDetailPage} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
