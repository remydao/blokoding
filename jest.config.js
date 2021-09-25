module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      "node_modules/(?!(react-native"
        + "|react-navigation-tabs"
        + "|react-native-splash-screen"
        + "|react-native-screens"
        + "|react-native-reanimated"
        + "|@react-native"
        + "|react-native-iphone-x-helper"
        + "|@react-navigation"
        + "|react-native-status-bar-height"
        + "|react-native-camera"
        + "|rn-text-detector"
        + "|react-native-permissions"
        + "|react-native-gesture-handler"
        + "|@react-native-picker"
        + "|react-native-auto-height-image"
        + "|@react-native-async-storage"
        + "|rn-sprite-sheet"
        + "|react-native-progress"
        + "|react-native-really-awesome-button"
        + "|react-native-snap-carousel"
      + ")/)",
    ],
    setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  }

