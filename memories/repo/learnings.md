# Key Learnings & Gotchas

> Lessons learned during the FinFlow project

---

## 📝 React Native Fundamentals

### Rest Parameters (`...rest`)
**Learned:** May 24, 2026 (Text Component)

**What I Learned:**
- Native RN props (like `numberOfLines`, `ellipsizeMode`, `selectable`) automatically work with `...rest`
- You don't need to explicitly destructure them
- Just add them to the TypeScript interface for autocomplete

**Example:**
```typescript
interface TextProps extends RNTextProps {
  // Custom props that need logic
  variant?: string;
  underline?: boolean;
  
  // Native props - just for TypeScript (work via ...rest)
  numberOfLines?: number;
  selectable?: boolean;
}

function Text({ variant, underline, ...rest }: TextProps) {
  return <RNText {...rest}>...</RNText>;  // ← numberOfLines works!
}
```

**When to Explicitly Handle Props:**
- Props that don't exist natively (like `disabled`, `underline`)
- Props that need conversion (like `transform` → `textTransform`)
- Props that need conditional logic

---

### TextDecorationLine
**Learned:** May 24, 2026 (Text Component)

**What I Learned:**
- `textDecorationLine` can combine multiple values!
- Values: `'none' | 'underline' | 'line-through' | 'underline line-through'`

**Implementation:**
```typescript
let textDecorationLine: TextStyle['textDecorationLine'] = 'none';
if (underline && strikethrough) {
  textDecorationLine = 'underline line-through';  // ← Both!
} else if (underline) {
  textDecorationLine = 'underline';
} else if (strikethrough) {
  textDecorationLine = 'line-through';
}
```

---

## 🎨 Styling Best Practices

### Prop Priority in Styling
**Learned:** May 24, 2026 (Text Component)

**What I Learned:**
- More specific states should override general props
- `disabled` should override custom `color`

**Implementation:**
```typescript
const customStyles: TextStyle = {
  // Wrong: color always applied
  ...(color && { color }),
  ...(disabled && { color: colors.neutral.gray[400] }),
  
  // Right: disabled takes priority
  ...(disabled 
    ? { color: colors.neutral.gray[400] } 
    : color && { color }
  ),
};
```

**Rule:** Disabled/error states > Custom props > Default values

---

## 📚 TypeScript Tips

### Proper Type Annotations
**Learned:** May 24, 2026 (Text Component)

**What I Learned:**
- Use RN's built-in types for better type safety
- `TextStyle['propertyName']` gives exact type

**Examples:**
```typescript
// ✅ Good - Uses RN's exact type
let decoration: TextStyle['textDecorationLine'] = 'none';

// ❌ Bad - String is too loose
let decoration: string = 'none';

// ✅ Good - Explicit typing
fontWeight: 'bold' as const

// ❌ Bad - TypeScript might infer wrong type
fontWeight: 'bold'
```

---

### Optional Parameters with Defaults
**Learned:** May 24, 2026 (Text Component)

**What I Learned:**
- Mark optional with `?` in interface
- Provide defaults in function signature

```typescript
interface Props {
  variant?: string;  // ← Optional
  disabled?: boolean;
}

function Component({
  variant = 'bodyMedium',  // ← Default value
  disabled = false,
}: Props) {
  // ...
}
```

---

## 🛠️ Development Setup

### Dependency Version Issues
**Learned:** May 22-23, 2026 (Project Setup)

**Issue:** MMKV v4.x and Reanimated v4.x failed due to missing specs

**Solution:**
- MMKV: Downgraded to v3.0.1 (stable, production-ready)
- Reanimated: Downgraded to v3.16.3 (stable, no breaking changes)

**Lesson:** 
- Latest ≠ Best for React Native
- Check CocoaPods specs availability
- v3.x versions are often more stable than v4.x bleeding edge

**Commands:**
```bash
npm install react-native-mmkv@3.0.1
npm install react-native-reanimated@3.16.3
cd ios && pod install
```

---

## 🎯 Component Architecture

### Atomic Design Structure
**Learned:** May 23-24, 2026 (Text Component)

**What I Learned:**
- Each component should have 4 files:
  1. `index.tsx` - Implementation
  2. `types.d.ts` - TypeScript interface
  3. `styles.ts` - Styling logic
  4. `README.md` - Documentation

**Benefits:**
- ✅ Separation of concerns
- ✅ Easy to test
- ✅ Easy to document
- ✅ Reusable across project

**File Naming:**
- `types.d.ts` NOT `types.ts` (better convention for type-only files)
- `index.tsx` (auto-imported when you import folder)

---

## 🐛 Common Gotchas

### Import Aliases
**Learned:** May 23, 2026 (Setup)

**Issue:** Absolute imports not working

**Solution:** Must configure in 3 places:
1. `tsconfig.json` - For TypeScript
2. `babel.config.js` - For Metro bundler
3. `metro.config.js` - Optional but recommended

**Working Config (babel.config.js):**
```javascript
plugins: [
  [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@': './src',
        '@/components': './src/components',
        // ... other aliases
      },
    },
  ],
  'react-native-reanimated/plugin',  // ← MUST be last!
],
```

**Gotcha:** Reanimated plugin MUST be last in plugins array!

---

### React Native Text vs Custom Text
**Learned:** May 24, 2026

**Naming Convention:**
```typescript
// ✅ Good - Clear naming
import { Text as RNText } from 'react-native';

export const Text = ({ ... }: TextProps) => {
  return <RNText>...</RNText>;
};

// ❌ Bad - Confusing
import { Text } from 'react-native';
export const Text = ...  // ← Name collision!
```

---

## 📖 To Research Next

- [ ] TouchableOpacity vs Pressable performance
- [ ] Best practices for loading states
- [ ] Haptic feedback implementation
- [ ] React Navigation type safety
- [ ] React Query optimistic updates
- [ ] MMKV vs AsyncStorage performance comparison

---

## 💡 Tips & Tricks

### VSCode Shortcuts
- `Cmd + Click` on import - Jump to definition
- `F2` - Rename symbol across files
- `Cmd + P` - Quick file open
- `Cmd + Shift + O` - Go to symbol in file

### Development Flow
1. Define types first (think through the API)
2. Implement styles second (visual feedback)
3. Write component third (bring it together)
4. Document fourth (while it's fresh)
5. Test last (verify everything works)

---

**Keep adding to this file as you learn!**
