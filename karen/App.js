import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { colors } from "./styles/colors";
import { globalStyles } from "./styles/globalStyles";

import RootStack from "./routes/rootStack";

const theme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.inactive,
    border: colors.background,
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme} style={globalStyles.mainView}>
      <RootStack />
    </NavigationContainer>
  );
}
