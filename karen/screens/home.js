import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";

import { getSettings } from "../fetchSettings";
import { isOnline, getInstalledAddons } from "../ssh";

export default function Home({ navigation }) {
  const [online, setOnline] = useState(false);
  const [installedAddons, setInstalledAddons] = useState({});
  const [statusBarStyle, setStatusBarStyle] = useState({
    backgroundColor: colors.danger,
  });
  const [config, setConfig] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        getSettings().then((set) => {
          setConfig(set);
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      // get installed addons
      getInstalledAddons(config).then((set) => {
        setInstalledAddons(set);
      });

      // check if Karen is Online
      isOnline(config).then((online) => {
        let color = colors.danger;

        online ? (color = colors.success) : (color = colors.danger);

        setOnline(online);
        setStatusBarStyle({
          backgroundColor: color,
        });
      });
    }, [config])
  );

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 / 3 }}>
      <TouchableOpacity onPress={() => navigation.navigate("AppConfig", item)}>
        <View style={styles.appContainer}>
          <View style={{ justifyContent: "center" }}>
            {item.icon ? (
              <Image
                source={{
                  uri: item.icon_url,
                }}
                style={styles.listingImage}
              />
            ) : (
              <Image
                source={{
                  uri: "https://alfredo.lol/static/karen/img/icon.png",
                }}
                style={styles.listingImage}
              />
            )}
          </View>

          <View style={styles.appNameContainer}>
            <Text numberOfLines={2}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.pageView}>
      <View style={[styles.statusBar, statusBarStyle]}>
        <Text style={styles.statusText}>{online ? "Online" : "Offline"}</Text>
      </View>
      <FlatList
        data={installedAddons}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

styles = StyleSheet.create({
  statusBar: {
    margin: -10,
    marginBottom: 10,
    backgroundColor: colors.success,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 15,
    color: colors.light,
  },
  flatList: {
    margin: -5,
  },
  appContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    marginBottom: 20,
    height: 130,
  },
  appNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  listingImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    resizeMode: "contain",
  },
});
