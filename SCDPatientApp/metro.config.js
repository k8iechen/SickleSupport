const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Make sure that .cjs files get recognized as source files.
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = defaultConfig;
