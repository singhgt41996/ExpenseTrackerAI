# 💰 FinFlow - AI-Powered Expense Tracker

> **A production-grade React Native learning project**  
> **Goal:** Master React Native from scratch with real-world skills for 12-15 LPA roles

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

## 📱 Project Overview

**FinFlow** is an AI-powered expense tracking app with:
- 📊 Smart expense categorization (AI)
- 📸 Receipt scanning (OCR)
- 📈 Interactive charts & analytics
- 📰 Social feed for financial tips
- 📝 Budget planning workspace
- 🤖 AI financial assistant
- 💳 Payment integration (Razorpay/Stripe)

**Why this project?**
- Covers 95% of senior RN developer skills
- Portfolio-ready for interviews
- Demonstrates production-level architecture
- Real-world AI/payment/real-time integration

---

## 🔄 Multi-Machine Workflow

**⚠️ Important:** This project is developed across 2 machines (Office + Personal Laptop)

### 🚀 Starting Work on Any Machine

```bash
# 1. Sync first!
./scripts/sync-start.sh

# 2. Read what you were doing
cat memories/repo/current-task.md

# 3. Start coding
```

### ✅ Finishing Work

```bash
# 1. Update progress
./scripts/update-progress.sh

# 2. Update memory files manually
# - memories/repo/current-task.md
# - memories/repo/progress.md

# 3. Commit & push
git add .
git commit -F .git-commit-msg-temp
git push origin develop
```

### 📋 Visual Workflow

See [`SYNC_WORKFLOW.txt`](./SYNC_WORKFLOW.txt) for detailed visual guide.

See [`memories/repo/UPDATE_GUIDE.md`](./memories/repo/UPDATE_GUIDE.md) for complete workflow documentation.

---

## 📚 Documentation Structure

| File | Purpose |
|------|---------|
| [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md) | Complete 16-week learning roadmap |
| [`SYNC_WORKFLOW.txt`](./SYNC_WORKFLOW.txt) | Visual sync workflow guide |
| [`memories/repo/current-task.md`](./memories/repo/current-task.md) | What you're working on NOW |
| [`memories/repo/progress.md`](./memories/repo/progress.md) | Weekly progress tracking |
| [`memories/repo/next-steps.md`](./memories/repo/next-steps.md) | Upcoming tasks |
| [`memories/repo/learnings.md`](./memories/repo/learnings.md) | Key insights & gotchas |
| [`memories/repo/UPDATE_GUIDE.md`](./memories/repo/UPDATE_GUIDE.md) | How to update progress |
| [`scripts/README.md`](./scripts/README.md) | Helper scripts documentation |

---

## 🏗️ Tech Stack

### Core
- React Native 0.74
- TypeScript (strict mode)
- Zustand (global state)
- React Query (server state)
- Supabase (backend)

### UI/UX
- Atomic Design Pattern
- React Native Reanimated
- React Native Gesture Handler
- FlashList (performance)
- Victory Native (charts)

### AI & Advanced
- OpenAI API
- Firebase (Analytics, Crashlytics, FCM)
- CodePush (OTA updates)
- Razorpay/Stripe (payments)

See [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md) for complete tech stack.

---

## 📊 Current Progress

**Week:** 1 of 16  
**Phase:** Foundation (60% complete)  
**Overall:** 5%

### ✅ Completed
- [x] Project structure & setup
- [x] Theme system (colors, typography, spacing)
- [x] Text atom component
- [x] Absolute imports configured
- [x] Multi-machine sync workflow

### 🔄 In Progress
- [ ] Button atom component

See [`memories/repo/progress.md`](./memories/repo/progress.md) for detailed tracking.

---

## 🚀 Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
