import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { globalStyles } from "../styles/globalStyles";

export default function Market({ navigation }) {
  const [addons, setAddons] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getAddonData();
    }, [])
  );

  const getAddonData = () => {
    const api = "https://alfredo.lol/api/karen";

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setAddons(data);
      });
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 / 3 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ListingDetail", item)}
      >
        <View style={styles.appContainer}>
          <View style={{ justifyContent: "center" }}>
            {item.icon_url ? (
              <Image
                source={{ uri: item.icon_url }}
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
      <Text style={globalStyles.pageHeader}>Market</Text>

      <View style={styles.rowContainer}>
        <TextInput
          placeholder={"Search ..."}
          style={[globalStyles.textInput, styles.searchBar]}
        ></TextInput>
      </View>

      <FlatList
        data={addons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  flatList: {
    margin: -5,
  },
  listingImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    resizeMode: "contain",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchBar: {
    width: "100%",
  },
});
