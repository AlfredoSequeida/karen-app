import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

import { uninstall, install, getInstalledAddons } from "../ssh";
import { getSettings } from "../fetchSettings";

export default function AddonInfo(props) {
  LogBox.ignoreLogs(["Promise Rejection"]);
  const [config, setConfig] = useState({});
  const [action, setAction] = useState("install");

  useFocusEffect(
    React.useCallback(() => {
      getSettings().then((set) => {
        setConfig(set);
      });
    }, [])
  );

  // cheking if addon is already installed to change action
  useFocusEffect(
    React.useCallback(() => {
      getInstalledAddons(config).then(
        (addons) => {
          if (addons.length === 0) {
            setAction("install");
          } else {
            for (let index = 0; index < addons.length; index++) {
              if (
                addons[index].name === props.addon.name &&
                addons[index].developer === props.addon.developer
              ) {
                setAction("uninstall");
                break;
              } else {
                setAction("install");
              }
            }
          }
        },
        (error) => console.log("Error:", error)
      );
    }, [config])
  );

  /*
  perform an action (to install or uninstall) an addon
  */
  const addonManager = () => {
    if (action === "uninstall") {
      uninstall(props.addon.name, props.addon.developer, config);
    } else if (action === "install") {
      install(props.addon.upstream_url, config);
    }
  };

  const animation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [installButtonColor, setInstallButtonColor] = useState({
    backgroundColor: colors.success,
  });

  const [installButtonTextColor, setInstallButtonTextColor] = useState({
    color: colors.light,
  });

  const progressInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const colorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255,246,135)", "rgb(216,200,2)"],
  });

  const progressStyle = {
    width: progressInterpolate,
    bottom: 0,
    backgroundColor: colorInterpolate,
    opacity: opacity,
  };

  return (
    <View style={globalStyles.pageView} showsVerticalScrollIndicator={false}>
      <View style={styles.appHeader}>
        <View style={styles.appIconContainer}>
          <Image
            source={{ uri: props.addon.icon_url }}
            style={styles.appIcon}
          />
        </View>
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>{props.addon.name}</Text>
          <Text style={styles.appDeveloper}>{props.addon.developer}</Text>
          <TouchableOpacity
            onPress={() => {
              addonManager();
              //change color of button
              setInstallButtonColor({ backgroundColor: colors.light });
              setInstallButtonTextColor({ color: colors.dark });
              //animations
              animation.setValue(0);
              opacity.setValue(1);
              Animated.timing(animation, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
              }).start((finished) => {
                if (finished) {
                  Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                  }).start();
                  setInstallButtonColor({ backgroundColor: colors.success });
                  setInstallButtonTextColor({ color: colors.light });
                }
              });
            }}
          >
            <View style={[styles.installButton, installButtonColor]}>
              <View style={StyleSheet.absoluteFill}>
                <Animated.View
                  style={[styles.progressBar, progressStyle]}
                ></Animated.View>
              </View>
              <Text style={[styles.installButtonText, installButtonTextColor]}>
                {action}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  appNameContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  appDeveloper: {
    fontSize: 15,
    marginBottom: 10,
  },
  appHeader: {
    height: 120,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  appIconContainer: {
    flex: 0.5,
  },
  appIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  // loading
  installButton: {
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.success,
  },
  installButtonText: { fontSize: 15, color: colors.light },
  progressBar: {
    borderRadius: 50,
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
