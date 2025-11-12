# DemoApp

A React Native mobile application with Redux state management, navigation, and API integration.

## 📱 Features

- **User Authentication**: Sign in and sign up functionality
- **Home Screen**: Browse products, explore destinations, and view recommendations
- **Network Monitoring**: Real-time network status detection with offline support
- **Redux State Management**: Centralized state management for products, users, and network status
- **Navigation**: Bottom tab navigation and stack navigation
- **Error Handling**: Custom error boundary and error display components
- **Product Listing**: Infinite scroll with pull-to-refresh functionality
- **SVG Icons**: Custom SVG icons for transport options and UI elements

## 🚀 Prerequisites

Before you begin,

#### Android

Make sure you have an Android emulator running or a device connected via USB with USB debugging enabled.

```bash
npm run android
# or
yarn android
```

You can also run the app directly from Android Studio:

1. Open the `android` folder in Android Studio
2. Wait for Gradle sync to complete
3. Select your target device/emulator
4. Press the Run button (▶️)

If everything is set up correctly, you should see your app running in the Android Emulator, iOS Simulator, or your connected device.

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## 🛠️ Project Structure

```
DemoApp/
├── src/
│   ├── assets/
│   │   └── icons/          # SVG icons (Hotel, Flight, Train, Ship, Bus, Star)
│   ├── components/         # Reusable components
│   │   ├── CommonButton.js
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorDisplay.tsx
│   │   └── NetworkAlert.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useNetworkMonitor.js
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js
│   ├── redux/              # Redux store and slices
│   │   ├── store.js
│   │   ├── productSlice.js
│   │   ├── userSlice.js
│   │   └── networkSlice.js
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js
│   │   ├── SignInScreen.js
│   │   ├── SignUpScreen.js
│   │   ├── BookingsScreen.js
│   │   ├── OffersScreen.js
│   │   └── ProfileScreen.js
│   └── utils/              # Utility functions
│       ├── apiClient.js    # Axios API client
│       ├── networkMonitor.js
│       ├── storage.js      # MMKV/AsyncStorage wrapper
│       └── validation.js
├── android/                # Android native code
├── ios/                    # iOS native code
├── __tests__/              # Test files
├── App.tsx                 # App entry point
└── index.js                # Root entry point
```

## 🔧 Configuration

### API Configuration

Update the API endpoint in `src/utils/apiClient.js`:

```javascript
const API_BASE_URL = 'https://your-api-endpoint.com/api';
```

### Environment Variables

You can create environment-specific configurations by modifying the API client or using a library like `react-native-config`.

## 📚 Key Technologies

- **React Native**: 0.82.1
- **React**: 19.1.1
- **Redux Toolkit**: ^2.10.1 - State management
- **React Navigation**: ^7.x - Navigation library
  - Stack Navigator
  - Bottom Tabs Navigator
- **Axios**: ^1.13.2 - HTTP client
- **React Native SVG**: ^15.14.0 - SVG support
- **AsyncStorage**: ^2.2.0 - Async storage
- **NetInfo**: ^11.4.1 - Network connectivity monitoring
- **MMKV**: ^4.0.0 - High-performance storage
- **TypeScript**: ^5.8.3

## 🎨 UI Components

The app includes custom components for:

- **ErrorBoundary**: Catches and handles React errors gracefully
- **ErrorDisplay**: Displays errors with retry functionality
- **NetworkAlert**: Shows network status alerts
- **CommonButton**: Reusable button component

## 🔐 State Management

The app uses Redux Toolkit with the following slices:

- **productSlice**: Manages product data, pagination, loading states
- **userSlice**: Manages user authentication and profile data
- **networkSlice**: Monitors and manages network connectivity status

## 📱 Navigation Structure

```
App
├── Auth Stack
│   ├── SignIn
│   └── SignUp
└── Main Tab Navigator
    ├── Home
    ├── Bookings
    ├── Offers
    └── Profile
```

## 🔄 Development Tips

### Fast Refresh

When you save changes to your code, the app will automatically update via Fast Refresh. To force a reload:

- **Android**: Press <kbd>R</kbd> twice or <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) to open Dev Menu
- **iOS**: Press <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in the iOS Simulator

### Dev Menu

Access the developer menu:

- **Android**: Shake the device or press <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS)
- **iOS**: Shake the device or press <kbd>Cmd ⌘</kbd> + <kbd>D</kbd>

## 🐛 Troubleshooting

### iOS Build Issues

```bash
# Clean and reinstall iOS dependencies
cd ios
pod deintegrate
pod cache clean --all
bundle exec pod install
cd ..
npm run ios
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Issues

```bash
# Reset Metro cache
npm start -- --reset-cache
```

### Clear All Caches

```bash
# Complete cache reset
watchman watch-del-all
rm -rf node_modules
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
npm install
cd ios && bundle exec pod install && cd ..
npm start -- --reset-cache
```

### Common Errors

**Error: Unable to resolve module**

- Run `npm install` again
- Clear Metro cache: `npm start -- --reset-cache`

**iOS Build Fails**

- Make sure Xcode Command Line Tools are installed: `xcode-select --install`
- Check `ios/Podfile.lock` matches dependencies

**Android Build Fails**

- Ensure Android SDK is properly installed
- Check `ANDROID_HOME` environment variable is set
- Verify Java version (JDK 11 or higher recommended)

## 🔄 Version History

- **0.0.1**: Initial release with core features
  - User authentication
  - Product browsing
  - Network monitoring
  - Redux state management

---

Built with ❤️ using React Native
