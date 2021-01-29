import SSH from "react-native-ssh";

// set of ssh commands to interact with Karen

/*
uninstall an add-on using Karen's addon manager
@paran {string} addonName the name of the add-on to uninstall
@param {string} addonDeveloper the name of the developer for the add-on to uninstall
@param {object} the ssh config
*/
export function uninstall(addonName, addonDeveloper, config) {
  const command = `cd ${config.karenPath} && python3 addon_manager.py --uninstall '${addonName}' --developer '${addonDeveloper}'`;
  SSH.execute(config, command).then(
    (result) => console.log(result),
    (error) => console.log("Error:", error)
  );
}

/*
install an addong using Karen's addon manager
@paran {string} gitHubUrl the github repo url for the add-on
@param {object} the ssh config
*/
export function install(gitHubUrl, config) {
  const command = `cd ${config.karenPath} && python3 addon_manager.py --install ${gitHubUrl}`;
  SSH.execute(config, command).then(
    (result) => console.log(result),
    (error) => console.log("Error:", error)
  );
}

/*
update Karen's config for a specific add-on using Karen's config manager
@paran {string} addonName the name of the add-on to configure
@param {string} addonDeveloper the developer of the add-on to configure
@param {string} addonSetting the name of the setting to update
@param {any} settingValue the value of the setting
@param {object} config the ssh config
*/
export function updateAddonConfig(
  addonName,
  addonDeveloper,
  addonSetting,
  settingValue,
  config
) {
  const command = `cd ${config.karenPath} && python3 config_manager.py --addon '${addonName}' --developer '${addonDeveloper}' --setting ${addonSetting} --value ${settingValue}`;
  SSH.execute(config, command).then(
    (result) => console.log(result),
    (error) => console.log("Error:", error)
  );
}

/*
get the README file contents for an addon from Karen's local add-ons
@paran {string} addonName the name of the add-on to configure
@param {string} addonDeveloper the developer of the add-on to configure
@param {object} config the ssh config
@return {string} the README contents
*/
export async function getReadme(addonName, addonDeveloper, config) {
  try {
    const command = `cd ${config.karenPath}/addons/'${addonDeveloper}_${addonName}' && cat README.md`;
    const readme = await SSH.execute(config, command);

    return readme.join("\n");
  } catch (e) {
    //error reading value
  }
}

/*
check if the karen process is running using Karen's status script
@param {object} config the ssh config
return {boolean} oline status
*/
export const isOnline = async (config) => {
  try {
    const command = `cd ${config.karenPath} && python3 status.py -o`;
    const ex = await SSH.execute(config, command);
    status = ex[0];
    result = false;

    if (status == "True") {
      result = true;
    } else if (status == "False") {
      result = false;
    }
    return result;
  } catch (e) {
    console.log("Error:", e);
  }
};

/*
get the icon url for add-on
@param {object} the add-on information
return {object} the add-on information containing the icon url.
*/
const getIconURL = (addon) => {
  const icon_url =
    addon.upstream.replace("github.com", "raw.githubusercontent.com") +
    `/master/${addon.icon}`;
  addon.icon_url = icon_url;
  return addon;
};

/*
get all installed addons
@param {object} config the ssh config
@return {array} the installed addons
*/
export const getInstalledAddons = async (config) => {
  try {
    const command = `cd ${config.karenPath} && cat config.json`;
    const ex = await SSH.execute(config, command);

    const addons = JSON.parse(ex.join("")).addons;
    let processedAddons = [];

    addons.map((addon) => {
      processedAddons.push(getIconURL(addon));
    });

    return processedAddons;
  } catch (e) {
    console.log("Error:", e);
  }
};
