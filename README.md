Click [here](https://www.youtube.com/watch?v=VPdPOVL8c1Q&list=PL9gEr35J45czlRLHXhA3jShGG_jIrRprJ) to see the video series for how Karen was made.

![Karen](https://alfredo.lol/static/karen/img/karen_small.png)
### open source voice assistant

![installing addon demo](https://imgur.com/z7ZH9ZK.gif)

This is the cross-platform app built using [React Native](https://reactnative.dev/) for [Karen](https://github.com/AlfredoSequeida/karen) - and open-source voice assistant. The purpose of the app is to facilitate installing and configuring [Karen addons](https://alfredo.lol/karen/).

## Build instructions
Since the Karen app has not been deployed to an app store to run the app, you have to build it.

### install all of the dependencies

### for ios you need to install the native dependencies using POD

### ssh
Since the Karen app connects and interacts with the Karen installation via ssh, [react-native-ssh by Peter Valdez has been used](https://github.com/azlyth/react-native-ssh). [Follow the instructions for IOS to link](https://github.com/azlyth/react-native-ssh#ios).

### asycn storage
For storing user settings [React Native Async Storage has been used](https://react-native-async-storage.github.io/async-storage/docs/install). [Follow the instructions for IOS to link](https://react-native-async-storage.github.io/async-storage/docs/install#link)

Then, [build it like you would any other react app for android or ios](https://reactnative.dev/docs/running-on-device)
