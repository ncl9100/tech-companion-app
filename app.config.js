import 'dotenv/config';

export default {
  expo: {
    name: "TechCompanionApp",
    slug: "TechCompanionApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.TechCompanionApp",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSPhotoLibraryUsageDescription: "This app may access your photo library to help you learn how to use your iPhone's camera and photos features. This helps provide better guidance when teaching you about your device.",
        NSSpeechRecognitionUsageDescription: "This app uses speech recognition to help you interact with the AI assistant more easily. You can speak your questions instead of typing them."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.TechCompanionApp"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "ce609487-c5a0-426f-892c-e1198853aa5e"
      },
      newsApiKey: process.env.NEWS_API_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
}; 