import Reactotron from "reactotron-react-native";

Reactotron.configure() // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
    asyncStorage: true,
  }) // add all built-in react native plugins
  .connect(); // let's connect!
