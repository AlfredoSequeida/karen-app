import AsyncStorage from "@react-native-async-storage/async-storage";

// these functions serve as an alternative solution to fetch user settings

/*
store user settings
@param {string} key the name of the setting
@param {any} value the value to store
@param settings {object} the settings object to containing the current settings
*/
export async function storeData(key, value, settings) {
  try {
    settings[key] = value;
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem("@settings", jsonValue);
  } catch (e) {
    console.log("error");
  }
}

/*
get uset settings
*/
export async function getSettings() {
  try {
    const jsonValue = await AsyncStorage.getItem("@settings");
    if (jsonValue != null) {
      const sshConf = JSON.parse(jsonValue);
      return {
        user: sshConf.sshUser,
        host: sshConf.sshIp,
        password: sshConf.sshPassword,
        karenPath: sshConf.karenPath,
      };
    }
  } catch (e) {
    //error reading value
  }
}
