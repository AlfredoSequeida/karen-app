import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { globalStyles } from "../styles/globalStyles";

import AddonInfo from "../shared/addonInfo";
import Markdown from "react-native-markdown-display";

import { getReadme, updateAddonConfig } from "../ssh";
import { ScrollView } from "react-native-gesture-handler";

import { getSettings } from "../fetchSettings";

export default function AppConfig({ route }) {
  const [settings, setSettings] = useState(route.params.settings);
  const [config, setConfig] = useState();
  const [readme, setReadme] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getSettings().then((set) => {
        setConfig(set);
      });
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      getReadme(route.params.name, route.params.developer, config).then(
        (data) => {
          setReadme(data);
        }
      );
    }, [config])
  );

  return (
    <ScrollView style={globalStyles.pageView}>
      <AddonInfo addon={route.params} action={"uninstall"}>
        {route.params.settings ? (
          <Text style={styles.sectionLabel}>Settings</Text>
        ) : (
          <View></View>
        )}

        {route.params.settings ? (
          Object.entries(route.params.settings).map(([key, value], index) => {
            return (
              <View style={{ flex: 1 }} key={index}>
                <Text style={styles.settingLabel}>{key}</Text>
                <TextInput
                  style={[globalStyles.textInput, styles.textInput]}
                  onChangeText={(text) => {
                    let s = settings;
                    s[key] = text;
                    setSettings(s);
                    updateAddonConfig(
                      route.params.name,
                      route.params.developer,
                      key,
                      text,
                      config
                    );
                  }}
                  defaultValue={settings[key]}
                />
              </View>
            );
          })
        ) : (
          <View></View>
        )}
        {readme ? (
          <View>
            <Text style={styles.sectionLabel}>About</Text>
            <Markdown>{readme}</Markdown>
          </View>
        ) : (
          <View></View>
        )}
      </AddonInfo>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { fontSize: 40, fontWeight: "bold", marginTop: 20 },

  textInput: {
    marginBottom: 10,
    alignSelf: "stretch",
  },
});
