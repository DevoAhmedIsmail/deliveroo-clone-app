import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import "react-native-url-polyfill/auto";
import ResturantScreen from "./screens/ResturantScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import Delivery from "./screens/Delivery";

const Stack = createNativeStackNavigator();

export default function App() {
  console.ignoredYellowBox = ["Warning: ..."];
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Resturant" component={ResturantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "fade_from_bottom",
              gestureDirection: "vertical",
              gestureEnabled: true,
              gestureResponseDistance: { vertical: 400 },
            }}
          />
          <Stack.Screen
            name="PreparingOrderScreen"
            component={PreparingOrderScreen}
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Delivery"
            component={Delivery}
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
