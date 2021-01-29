// used for market listings

import React from "react";
import { ScrollView, View } from "react-native";

import { globalStyles } from "../styles/globalStyles";
import Markdown from "react-native-markdown-display";

import AddonInfo from "../shared/addonInfo";

export default function ListingDetail({ route }) {
  return (
    <ScrollView
      style={globalStyles.pageView}
      showsVerticalScrollIndicator={false}
    >
      <AddonInfo
        addon={route.params}
        action={"install"}
        gitHubUrl={route.params.upstream_url}
      >
        {route.params.readme ? (
          <View>
            <Markdown>{route.params.readme}</Markdown>
          </View>
        ) : (
          <View></View>
        )}
      </AddonInfo>
    </ScrollView>
  );
}
