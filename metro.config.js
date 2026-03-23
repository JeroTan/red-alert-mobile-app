const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add platform-specific extensions
config.resolver.sourceExts.push('native.tsx', 'web.tsx');

module.exports = withNativewind(config);
