module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // import the react-native-dotenv plugin
    // ref: https://www.npmjs.com/package/react-native-dotenv
    plugins: [
      ["module:react-native-dotenv"]
    ],
  };
};
