import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MarketPostCategorySelector from "../screens/marketPostCategorySelector";

const Stack = createStackNavigator();

export default function marketPostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarketPostCategorySelector"
        component={MarketPostCategorySelector}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
