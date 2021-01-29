import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const Stack = createStackNavigator();

import Home from "../screens/home";
import AppConfig from "../screens/appConfig";

export default function HomeStack({ route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppConfig"
        component={AppConfig}
        options={({ route }) => ({
          headerTitle: <Text style={globalStyles.pageHeader}>Home</Text>,
          headerStyle: styles.header,
          headerBackTitleVisible: false,
          headerTitleAlign: "left",
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
});
