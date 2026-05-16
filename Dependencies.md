# Dependencies Documentation

## 📦 Installed Packages

### Core Navigation (React Navigation 6)

#### Packages:
```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated@3.16.3
```

**What They Do:**

| Package | Purpose | Why We Need It |
|---------|---------|----------------|
| `@react-navigation/native` | Core navigation library | Foundation for all navigation |
| `@react-navigation/native-stack` | Stack navigation | Push/pop screens (Login → Dashboard) |
| `@react-navigation/bottom-tabs` | Bottom tab bar | Main app navigation tabs |
| `@react-navigation/drawer` | Side drawer menu | Hamburger menu navigation |
| `react-native-screens` | Native screen optimization | Better performance, native transitions |
| `react-native-safe-area-context` | Safe area handling | Avoid notches, status bars |
| `react-native-gesture-handler` | Gesture system | Swipes, taps, pan gestures |
| `react-native-reanimated` | Animation library | 60 FPS animations |

**Installation Issues & Solutions:**

❌ **Issue:** `RNWorklets` dependency not found (Reanimated v4.x)
```
[!] Unable to find a specification for `RNWorklets` depended upon by `RNReanimated`
```

✅ **Solution:** Downgraded to Reanimated v3.16.3
```bash
npm install react-native-reanimated@3.16.3
```

**Why v3.16.3?**
- v4.x uses new Worklets architecture with CocoaPods spec issues
- v3.16.3 is production-stable and widely used
- Still supports all animations we need

---

### State Management

#### Packages:
```bash
npm install zustand @tanstack/react-query
```

**What They Do:**

| Package | Purpose | Use Case |
|---------|---------|----------|
| `zustand` | Global state management | User data, app settings, UI state |
| `@tanstack/react-query` | Server state & caching | API calls, data fetching, mutations |

**Why These Over Redux?**
- **Zustand:** Simpler API, less boilerplate, TypeScript-friendly
- **React Query:** Handles caching, loading states, refetching automatically
- **Together:** Clean separation of client state vs server state

---

### Storage

#### Packages:
```bash
npm install react-native-mmkv@3.0.1
```

**What It Does:**

| Package | Purpose | Performance |
|---------|---------|-------------|
| `react-native-mmkv` | High-performance key-value storage | 30x faster than AsyncStorage |

**Installation Issues & Solutions:**

❌ **Issue:** NitroModules dependency not found (MMKV v4.x)
```
[!] Unable to find a specification for `NitroModules` depended upon by `NitroMmkv`
```

✅ **Solution:** Downgraded to MMKV v3.0.1
```bash
npm install react-native-mmkv@3.0.1
```

**Why v3.0.1?**
- v4.x uses NitroModules (new React Native architecture)
- NitroModules spec not yet in CocoaPods master repo
- v3.0.1 is production-ready and used by top apps

**Use Cases:**
- User preferences
- Auth tokens
- Offline data cache
- App state persistence

---

### Forms & Validation

#### Packages:
```bash
npm install react-hook-form zod @hookform/resolvers
```

**What They Do:**

| Package | Purpose | Why |
|---------|---------|-----|
| `react-hook-form` | Form state management | Best performance, minimal re-renders |
| `zod` | Schema validation | TypeScript-first, auto-inferred types |
| `@hookform/resolvers` | Connector | Links react-hook-form with zod |

**Example Use Case:**
```typescript
// Expense form with validation
const schema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1),
  date: z.date(),
});

const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

---

### UI Libraries

#### Packages:
```bash
npm install react-native-vector-icons react-native-svg react-native-size-matters
```

**What They Do:**

| Package | Purpose | Features |
|---------|---------|----------|
| `react-native-vector-icons` | Icon library | 3000+ icons (FontAwesome, MaterialIcons, etc.) |
| `react-native-svg` | SVG support | Custom vector graphics, illustrations |
| `react-native-size-matters` | Responsive sizing | `scale()`, `verticalScale()`, `moderateScale()` |

**Installation Notes:**

⚠️ **Warning seen during install:**
```
react-native-vector-icons@10.3.0: package has moved to per-icon-family packages
```

**What this means:**
- Future versions will split into separate packages (`@react-native-vector-icons/fontawesome`, etc.)
- Current version (10.3.0) still works fine
- Migration guide: https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md

**We'll keep current version for now** - migration can wait.

---

### Utilities

#### Packages:
```bash
npm install date-fns react-native-toast-message
```

**What They Do:**

| Package | Purpose | Why Not Others? |
|---------|---------|-----------------|
| `date-fns` | Date manipulation | Smaller than Moment.js, tree-shakeable |
| `react-native-toast-message` | Toast notifications | Customizable, looks native |

---

### Development Tools

#### Packages:
```bash
npm install --save-dev babel-plugin-module-resolver
```

**What It Does:**

| Package | Purpose | Example |
|---------|---------|---------|
| `babel-plugin-module-resolver` | Transform import paths at compile time | `import Button from '@/components/atoms/Button'` |

**How It Works:**

**Without module-resolver (relative imports):**
```typescript
// ❌ Hard to read, breaks when moving files
import Button from '../../../components/atoms/Button';
import { supabase } from '../../../../lib/supabase';
```

**With module-resolver (absolute imports):**
```typescript
// ✅ Clean, won't break if file moves
import Button from '@/components/atoms/Button';
import { supabase } from '@/lib/supabase';
```

**Configuration:**

The plugin reads your `babel.config.js` and transforms imports at build time:

```javascript
// babel.config.js
plugins: [
  [
    'module-resolver',
    {
      root: ['./src'],        // Base directory
      alias: {
        '@': './src',         // @ points to src folder
        '@/components': './src/components',
        '@/screens': './src/screens',
        // ... etc
      },
    },
  ],
  'react-native-reanimated/plugin',  // MUST BE LAST
],
```

**Build Process:**
1. You write: `import Button from '@/components/atoms/Button'`
2. Babel sees this during build
3. Babel transforms to: `import Button from './src/components/atoms/Button'`
4. Metro bundler receives transformed code

**Why `--save-dev`?**
- This is a **development tool** (used during build)
- Not needed in production bundle
- Saves to `devDependencies` in package.json

**Benefits:**
- ✅ Cleaner imports
- ✅ Easier refactoring (move files without breaking imports)
- ✅ Better autocomplete in VS Code
- ✅ Matches TypeScript path mapping

**⚠️ Critical: Babel Plugin Order**

Babel plugins execute in **order**. This matters because:

1. **Module resolver can be FIRST or early**
   - Transforms `@/` imports to relative paths
   - Other plugins see the transformed paths

2. **Reanimated MUST BE LAST**
   - Transforms JS → Worklets (UI thread code)
   - Needs to see final transformed code
   - **Official requirement from Reanimated docs**

**Correct Order:**
```javascript
plugins: [
  ['module-resolver', { ... }],      // FIRST
  'react-native-reanimated/plugin', // LAST
],
```

**Wrong Order Causes:**
- ❌ Reanimated animations don't work
- ❌ "Worklet" errors in console
- ❌ UI thread crashes

---

## 🔧 iOS Linking (CocoaPods)

### Commands Run:
```bash
cd ios
pod install
cd ..
```

### What Happened:
1. **Auto-linking:** React Native 0.75+ auto-links most packages
2. **Pod install:** Links native iOS code to Xcode project
3. **Codegen:** Generated TypeScript → Native bindings

### Files Modified:
- `ios/Podfile.lock` - Locked dependency versions
- `ios/Pods/` - Downloaded native libraries
- `ios/ExpenseTrackerAI.xcworkspace` - Xcode workspace (USE THIS, not .xcodeproj)

---

## 🐛 Issues Faced & Fixes

### Issue 1: NitroModules Not Found (MMKV v4.x)

**Error:**
```
[!] Unable to find a specification for `NitroModules` depended upon by `NitroMmkv`
```

**Root Cause:**
- MMKV v4.x uses NitroModules (new RN architecture)
- NitroModules podspec not in CocoaPods master repo yet

**Solution:**
```bash
npm uninstall react-native-mmkv
npm install react-native-mmkv@3.0.1
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..
```

---

### Issue 2: RNWorklets Not Found (Reanimated v4.x)

**Error:**
```
[!] Unable to find a specification for `RNWorklets` depended upon by `RNReanimated`
```

**Root Cause:**
- Reanimated v4.x uses Worklets architecture
- Worklets podspec issues in CocoaPods

**Solution:**
```bash
npm uninstall react-native-reanimated
npm install react-native-reanimated@3.16.3
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

---

## 📊 Final Working Versions

| Package | Version | Notes |
|---------|---------|-------|
| @react-navigation/native | Latest | ✅ No issues |
| @react-navigation/native-stack | Latest | ✅ No issues |
| @react-navigation/bottom-tabs | Latest | ✅ No issues |
| @react-navigation/drawer | Latest | ✅ No issues |
| react-native-screens | Latest | ✅ No issues |
| react-native-safe-area-context | Latest | ✅ No issues |
| react-native-gesture-handler | Latest | ✅ No issues |
| react-native-reanimated | **3.16.3** | ⚠️ Downgraded from v4.x |
| zustand | Latest | ✅ No issues |
| @tanstack/react-query | Latest | ✅ No issues |
| react-native-mmkv | **3.0.1** | ⚠️ Downgraded from v4.x |
| react-hook-form | Latest | ✅ No issues |
| zod | Latest | ✅ No issues |
| @hookform/resolvers | Latest | ✅ No issues |
| react-native-vector-icons | 10.3.0 | ⚠️ Deprecated warning (still works) |
| react-native-svg | Latest | ✅ No issues |
| react-native-size-matters | Latest | ✅ No issues |
| date-fns | Latest | ✅ No issues |
| react-native-toast-message | Latest | ✅ No issues |

---

## 🚀 Next Steps

### Phase 0 Remaining Tasks:
- [ ] Configure TypeScript (strict mode)
- [ ] Setup absolute imports (`@/components` instead of `../../components`)
- [ ] Create theme system (colors, typography, spacing)
- [ ] Configure Metro bundler
- [ ] Setup Babel plugins

### Phase 1 (Module 1):
- [ ] Setup navigation structure
- [ ] Create Zustand stores
- [ ] Configure React Query
- [ ] Build atomic design components

---

## 📚 Learning Resources

### Must-Read Docs:
- React Navigation: https://reactnavigation.org/docs/getting-started
- Zustand: https://docs.pmnd.rs/zustand/getting-started/introduction
- React Query: https://tanstack.com/query/latest/docs/framework/react/overview
- React Hook Form: https://react-hook-form.com/get-started
- Zod: https://zod.dev/

### Community:
- React Native Discord: https://discord.gg/react-native
- Stack Overflow: Tag `react-native`

---

## 🐛 Troubleshooting

### Pod Install Failures:

**Clean everything:**
```bash
cd ios
rm -rf Pods Podfile.lock build
pod cache clean --all
pod deintegrate
pod install
cd ..
```

**Update CocoaPods repo:**
```bash
pod repo update
```

### Linking Issues:

**Full clean:**
```bash
# iOS
cd ios
rm -rf Pods Podfile.lock build
pod install
cd ..

# Android
cd android
./gradlew clean
cd ..

# Metro cache
rm -rf node_modules
npm cache clean --force
npm install
npx react-native start --reset-cache
```

---

## 📝 Notes

- All packages installed on: **16 May 2026**
- React Native version: **0.85.3**
- Node version: (check with `node -v`)
- CocoaPods version: (check with `pod --version`)

---

### Development Tools

#### Packages:
```bash
npm install --save-dev babel-plugin-module-resolver
```

**What It Does:**

| Package | Purpose | Example |
|---------|---------|---------|
| `babel-plugin-module-resolver` | Transform import paths at compile time | `import Button from '@/components/atoms/Button'` |

**How It Works:**

**Without module-resolver (relative imports):**
```typescript
// ❌ Hard to read, breaks when moving files
import Button from '../../../components/atoms/Button';
import { supabase } from '../../../../lib/supabase';
```

**With module-resolver (absolute imports):**
```typescript
// ✅ Clean, won't break if file moves
import Button from '@/components/atoms/Button';
import { supabase } from '@/lib/supabase';
```

**Configuration:**

The plugin reads your `babel.config.js` and transforms imports at build time:

```javascript
// babel.config.js
plugins: [
  [
    'module-resolver',
    {
      root: ['./src'],        // Base directory
      alias: {
        '@': './src',         // @ points to src folder
        '@/components': './src/components',
        '@/screens': './src/screens',
        // ... etc
      },
    },
  ],
  'react-native-reanimated/plugin',  // MUST BE LAST
],
```

**Build Process:**
1. You write: `import Button from '@/components/atoms/Button'`
2. Babel sees this during build
3. Babel transforms to: `import Button from './src/components/atoms/Button'`
4. Metro bundler receives transformed code

**Why `--save-dev`?**
- This is a **development tool** (used during build)
- Not needed in production bundle
- Saves to `devDependencies` in package.json

**Benefits:**
- ✅ Cleaner imports
- ✅ Easier refactoring (move files without breaking imports)
- ✅ Better autocomplete in VS Code
- ✅ Matches TypeScript path mapping

---

## ⚠️ Critical Plugin Order

**Babel Plugin Order Matters!**

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 1. Module resolver FIRST
    ['module-resolver', { ... }],
    
    // 2. Other plugins here...
    
    // 3. Reanimated LAST (required by library)
    'react-native-reanimated/plugin',
  ],
};
```

**Why Reanimated Must Be Last:**
- Transforms JS → Worklets (UI thread code)
- Needs to see final transformed code
- If placed first, other plugins break worklet transformations
- **Official requirement from Reanimated docs**

**Wrong Order Causes:**
- ❌ Reanimated animations don't work
- ❌ "Worklet" errors in console
- ❌ UI thread crashes