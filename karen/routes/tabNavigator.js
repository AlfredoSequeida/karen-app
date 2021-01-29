import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./homeStack";
import MarketStack from "./marketStack";
import SettingsStack from "./settingsStack.js";

import { icons } from "../styles/globalStyles";

import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "HomeStack") {
            icon = focused ? icons.homeIconActive : icons.homeIconInactive;
          } else if (route.name === "MarketStack") {
            icon = focused ? icons.marketIconActive : icons.marketIconInactive;
          } else if (route.name === "SettingsStack") {
            icon = focused ? icons.moreIconActive : icons.moreIconInactive;
          }
          return <Image source={icon} style={style.navBarIcon} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.inactive,
        tabStyle: { width: 1000 },
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="MarketStack" component={MarketStack} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} />
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  navBarIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
