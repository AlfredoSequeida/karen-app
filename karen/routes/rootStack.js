import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./tabNavigator";
import MarketPostStack from "./marketPostStack";
import SettingsStack from "./settingsStack";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MarketPostStack"
        component={MarketPostStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
