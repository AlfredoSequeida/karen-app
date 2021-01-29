import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { globalStyles } from "../styles/globalStyles";

import Market from "../screens/market";
import ListingDetail from "../screens/listingDetail";

const Stack = createStackNavigator();

export default function MarketStack({ route }) {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Market"
        component={Market}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ListingDetail"
        component={ListingDetail}
        options={({ route }) => ({
          headerTitle: <Text style={globalStyles.pageHeader}>Market</Text>,
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
