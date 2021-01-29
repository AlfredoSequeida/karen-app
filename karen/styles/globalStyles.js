import { StyleSheet } from "react-native";

import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  settingLabel: { fontSize: 20, fontWeight: "bold" },
  successButtonText: {
    fontWeight: "bold",
    color: colors.light,
  },
  sucessButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  eliminateTopMargin: {
    marginTop: 0,
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  navigationHeader: {
    fontWeight: "bold",
    fontSize: 30,
  },
  pageView: {
    flex: 1,
    margin: 10,
  },
  textInput: {
    backgroundColor: colors.light,
    borderRadius: 20,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textBold: {
    fontWeight: "bold",
  },
  pageHeader: {
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 10,
    color: colors.dark,
  },
});

export const icons = {
  homeIconActive: require("../assets/home_icon_active.png"),
  homeIconInactive: require("../assets/home_icon_inactive.png"),
  marketIconActive: require("../assets/market_icon_active.png"),
  marketIconInactive: require("../assets/market_icon_inactive.png"),
  moreIconActive: require("../assets/more_icon_active.png"),
  moreIconInactive: require("../assets/more_icon_inactive.png"),
};
