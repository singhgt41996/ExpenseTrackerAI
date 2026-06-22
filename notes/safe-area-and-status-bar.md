# React Native Notes — Safe Area & Status Bar

> Personal revision notes from the FinFlow project.

---

## 1. The JSX / React import rule

- With `"jsx": "react-native"` in `tsconfig.json` (the **classic** JSX transform), every JSX tag compiles to `React.createElement(...)`, so **`React` must be imported** in the file.
- Error `"'React' refers to a UMD global, but the current file is a module"` = you used JSX but forgot `import React from 'react'`.
- Fix:

```typescript
import React, { useEffect, useState } from 'react';
```

- Modern alternative: set `"jsx": "react-jsx"` (automatic runtime) → no React import needed anywhere. But then unused `import React` lines elsewhere may get flagged by `noUnusedLocals`.

---

## 2. SafeAreaProvider

- It is **only a context provider**. It measures the device's safe-area insets (notch, status bar, home indicator) and makes those numbers available to children.
- **It does NOT add any padding by itself.** Wrapping your app in it changes nothing visually.
- Put it **once at the root** of the app.
- **Gotcha:** the component that *renders* `SafeAreaProvider` cannot use `useSafeAreaInsets()` itself — the hook / `SafeAreaView` must be in a child **nested under** the provider. Otherwise insets return 0 (or fall back).

```typescript
function App() {
  return (
    <SafeAreaProvider>
      <AppContent />   {/* hook works here, not in App */}
    </SafeAreaProvider>
  );
}
```

---

## 3. Two ways to APPLY the insets

### a) `SafeAreaView` (declarative — preferred for containers)

- A `View` that auto-applies insets as padding.
- Use the one from **`react-native-safe-area-context`**, NOT the deprecated one from `react-native`.
- `edges` prop chooses which sides to pad: `['top']`, `['bottom']`, `['top','bottom']`, etc.

```typescript
<SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
  {children}
</SafeAreaView>
```

### b) `useSafeAreaInsets()` (hook — for raw numbers / special cases)

- Returns `{ top, bottom, left, right }` as numbers.
- Use when you need the value for something other than simple container padding:
  - Floating button → `marginBottom: insets.bottom`
  - ScrollView → `contentContainerStyle={{ paddingBottom: insets.bottom }}`
  - Custom header, animations, layout math

**Rule of thumb:** `SafeAreaView` for the screen container; the hook for special elements inside.

---

## 4. Screen Wrapper Pattern (reusable)

- Don't repeat safe-area logic on every screen. Make one reusable wrapper (a "template" in atomic design).
- `SafeAreaProvider` stays at root; each screen wraps its content in `<Screen>`.
- The wrapper does NOT go in the navigator config — it goes **inside each screen component** as the root element.

```typescript
// src/components/templates/Screen/index.tsx
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  backgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content';
};

export const Screen = ({
  children,
  edges = ['top', 'bottom'],
  backgroundColor = '#fff',
  barStyle = 'dark-content',
}: ScreenProps) => (
  <SafeAreaView style={{ flex: 1, backgroundColor }} edges={edges}>
    <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
    {children}
  </SafeAreaView>
);
```

How it's used with navigation:

```typescript
// Navigator = routing only (no wrappers here)
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Login" component={LoginScreen} />
</Stack.Navigator>

// Screen = uses the wrapper internally
const LoginScreen = () => (
  <Screen edges={['top', 'bottom']}>
    {/* UI */}
  </Screen>
);
```

---

## 5. Safe Area + React Navigation (important)

- Navigation **headers and bottom tab bars handle safe area automatically.**
- If a screen **has a header** → wrapper should use `edges={['bottom']}` (header covers top; padding top too = double gap).
- If a screen **has no header** (e.g. auth screens with `headerShown: false`) → use `edges={['top', 'bottom']}`.
- This is why `edges` should be a prop.

---

## 6. StatusBar `<StatusBar />`

- Controls the OS top bar (clock, battery, wifi).
- It's **imperative** — doesn't render UI in place; tells the OS how the bar looks.
- React Native merges all mounted `StatusBar` components; **the last one to mount/update wins.**

### Props

| Prop | Meaning |
|---|---|
| `barStyle` | Color of the icons/text: `dark-content` = dark icons (for light bg), `light-content` = white icons (for dark bg) |
| `backgroundColor` | Background behind the bar — **Android only** |
| `translucent` | Android: draw under the status bar |
| `hidden` | Hide the bar |

> Naming trick: `dark-content` = *dark text*, used on a *light* background.

### Root vs per-page

- Put one at the **root** as the default.
- Add a `<StatusBar>` **per-screen only when that screen needs something different.**

### Making status bar color match the page

- **iOS:** status bar is always a transparent overlay — no `backgroundColor`. Color the **top safe-area region** instead (e.g. `SafeAreaView` `backgroundColor`), and set `barStyle` for readable icons.
- **Android:** set `backgroundColor` on `<StatusBar>` directly.
- **Cross-platform:** set `barStyle` + `backgroundColor` (Android) + color the top safe area (iOS). Bundling this into the `Screen` wrapper handles both at once.

### Caveat with navigation

- Because last-mounted wins, navigating **back** may not re-apply a screen's status bar. Fix by re-applying on focus (`useFocusEffect` + `StatusBar.setBarStyle(...)`) or keeping `<StatusBar>` inside each screen.

---

## Quick Summary Table

| Thing | Job |
|---|---|
| `SafeAreaProvider` | Measures insets; provides numbers. No padding itself. Root, once. |
| `SafeAreaView` | Applies insets as padding on chosen `edges`. Use for containers. |
| `useSafeAreaInsets()` | Raw inset numbers for special elements. |
| `Screen` wrapper | Reusable: SafeAreaView + StatusBar + bg color. Used inside each screen. |
| `StatusBar` | Tells OS how the top bar looks. Root default + per-page overrides. |
