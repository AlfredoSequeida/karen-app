import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ScrollView, Text, TextInput } from "react-native";

import { globalStyles } from "../styles/globalStyles";

export default function Settings() {
  const [settings, setSettings] = useState({
    sshIp: "",
    karenPath: "",
    sshUser: "",
    sshPassword: "",
  });

  useEffect(() => {
    getData();
  }, []);

  /*
  store user settings
  @param {string} key the name of the setting value to be stored
  @param {any} value the value to be stored
  */
  const storeData = async (key, value) => {
    try {
      let set = settings;
      set[key] = value;

      console.log(set);

      setSettings(set);

      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem("@settings", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  /*
  get user settings
  @return {object} the user settings data
  */
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@settings");
      if (jsonValue != null) {
        setSettings(JSON.parse(jsonValue));
      }
    } catch (e) {
      //error reading value
    }
  };

  return (
    <ScrollView style={globalStyles.pageView}>
      <Text style={globalStyles.pageHeader}>Settings</Text>
      <Text style={[globalStyles.settingLabel, styles.settingSection]}>
        SSH
      </Text>
      <Text style={globalStyles.settingLabel}>ssh ip</Text>
      <TextInput
        style={[globalStyles.textInput, styles.textInput]}
        onChangeText={(text) => {
          storeData("sshIp", text);
        }}
        defaultValue={settings.sshIp}
      />
      <Text style={globalStyles.settingLabel}>ssh user</Text>
      <TextInput
        style={[globalStyles.textInput, styles.textInput]}
        onChangeText={(text) => {
          storeData("sshUser", text);
        }}
        defaultValue={settings.sshUser}
      />
      <Text style={globalStyles.settingLabel}>ssh password</Text>
      <TextInput
        style={[globalStyles.textInput, styles.textInput]}
        secureTextEntry={true}
        onChangeText={(text) => {
          storeData("sshPassword", text);
        }}
        defaultValue={settings.sshPassword}
      />
      <Text style={[globalStyles.settingLabel, styles.settingSection]}>
        KAREN
      </Text>
      <Text style={globalStyles.settingLabel}>karen path</Text>
      <TextInput
        style={[globalStyles.textInput, styles.textInput]}
        onChangeText={(text) => {
          storeData("karenPath", text);
        }}
        defaultValue={settings.karenPath}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
    alignSelf: "stretch",
  },
  settingSection: {
    marginVertical: 15,
  },
});
