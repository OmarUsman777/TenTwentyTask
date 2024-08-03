module.exports = {
  assets: ["./app/ui/fonts"],
  project: {
    android: {},
    ios: {}, // grouped into "project"
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
