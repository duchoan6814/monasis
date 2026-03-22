import Reactotron from "reactotron-react-native";

Reactotron.configure() // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  }) // add all built-in react native plugins
  .connect(); // let's connect!
