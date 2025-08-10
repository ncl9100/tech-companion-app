import 'dotenv/config';

export default {
  name: "ElderlyAI",
  slug: "elderlyai",
  owner: "gamerguy123",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.TechCompanionApp",
    buildNumber: "2",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSPhotoLibraryUsageDescription: "This app may access your photo library to help you learn how to use your iPhone's camera and photos features. This helps provide better guidance when teaching you about your device.",
      NSSpeechRecognitionUsageDescription: "This app uses speech recognition to help you interact with the AI assistant more easily. You can speak your questions instead of typing them."
    }
    
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true,
    package: "com.anonymous.TechCompanionApp"
  },
  web: {
    favicon: "./assets/icon.png"
  },
  extra: {
    eas: {
      projectId: "2c04889e-6930-49e7-9e26-179472fc3f85"
    },
    newsApiKey: process.env.NEWS_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
  },
}; 