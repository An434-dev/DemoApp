# 🔧 Fix SVG Icons Not Showing

## Issue

Getting error: "Element type is invalid: expected a string... but got: number"

## Root Cause

Metro bundler needs to be restarted with cache cleared after adding SVG transformer configuration.

## ✅ Solution

### Step 1: Stop Metro Bundler

Press `Ctrl + C` in the terminal where Metro is running to stop it.

### Step 2: Clear Cache and Restart

Run one of these commands:

**Option 1: Start with cache reset**

```bash
yarn start --reset-cache
```

**Option 2: Clean and start**

```bash
# Clean everything
yarn start --reset-cache

# In a new terminal, run the app
yarn ios
# or
yarn android
```

### Step 3: Rebuild the App

After Metro restarts, rebuild your app:

```bash
# For iOS
yarn ios

# For Android
yarn android
```

## 🎯 What This Does

1. **Clears Metro cache** - Removes old cached JavaScript bundles
2. **Reloads SVG transformer** - Metro will now process `.svg` files correctly
3. **Rebuilds with new config** - App will include SVG components properly

## 📝 Expected Result

After restarting, the SVG icons should render correctly:

- ✅ Edit icon (pencil) in profile header
- ✅ Help icon (info) in Help and Support menu

## 🐛 If Still Not Working

### Check 1: Verify SVG Files Exist

```bash
ls -la src/assests/icons/
```

Should show:

- EditSquare.svg ✅
- DangerCircle.svg ✅
- (other SVG files)

### Check 2: Verify Metro Config

File: `metro.config.js` should have:

```javascript
transformer: {
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
}
```

### Check 3: Completely Clean and Rebuild

**iOS:**

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
yarn ios
```

**Android:**

```bash
cd android
./gradlew clean
cd ..
yarn android
```

## ✨ Quick Fix Command

Run all these in sequence:

```bash
# Stop current Metro (Ctrl+C first)
yarn start --reset-cache &
sleep 5
yarn ios
```

## 📌 Remember

After ANY changes to:

- `metro.config.js`
- New package installations
- SVG transformer setup

Always restart Metro with `--reset-cache` flag!
