# Text Component

A production-ready, type-safe text component with extensive styling options.

## ✅ Features

- ✅ Typography variants (h1-h3, body, labels, button, caption)
- ✅ Color customization
- ✅ Text alignment
- ✅ Bold & Italic
- ✅ Text decoration (underline, strikethrough)
- ✅ Text transform (uppercase, lowercase, capitalize)
- ✅ Disabled state
- ✅ Truncation support
- ✅ Clickable (onPress)
- ✅ Accessibility support
- ✅ Full TypeScript support

---

## 📖 Usage Examples

### Basic Typography

```tsx
import { Text } from '@/components/atoms/text';

// Headings
<Text variant="h1">Dashboard</Text>
<Text variant="h2">Recent Expenses</Text>
<Text variant="h3">Categories</Text>

// Body text
<Text variant="bodyLarge">Large paragraph text</Text>
<Text variant="bodyMedium">Default body text</Text>
<Text variant="bodySmall">Small description text</Text>

// Labels
<Text variant="labelLarge">Form Label</Text>
<Text variant="labelMedium">Input Label</Text>

// Button text
<Text variant="button">Submit</Text>

// Small text
<Text variant="caption">2 hours ago</Text>
<Text variant="overline">Category Tag</Text>
```

### Colors

```tsx
import { colors } from '@/theme';

<Text color={colors.primary[500]}>Green text</Text>
<Text color={colors.error.main}>Error message</Text>
<Text color={colors.neutral.gray[600]}>Secondary text</Text>
```

### Alignment

```tsx
<Text align="left">Left aligned (default)</Text>
<Text align="center">Center aligned</Text>
<Text align="right">Right aligned</Text>
<Text align="justify">Justified text</Text>
```

### Text Styling

```tsx
// Bold
<Text bold>Bold text</Text>

// Italic
<Text italic>Italic text</Text>

// Combined
<Text bold italic>Bold and italic</Text>

// Underline (for links)
<Text underline>Underlined link</Text>

// Strikethrough (for old prices)
<Text strikethrough>$100</Text>

// Both decorations
<Text underline strikethrough>Underline + Strikethrough</Text>
```

### Text Transform

```tsx
<Text transform="uppercase">uppercase text → UPPERCASE TEXT</Text>
<Text transform="lowercase">LOWERCASE TEXT → lowercase text</Text>
<Text transform="capitalize">capitalize text → Capitalize Text</Text>
```

### Truncation

```tsx
// Truncate after 2 lines
<Text numberOfLines={2} ellipsizeMode="tail">
  This is a very long text that will be truncated after two lines
  with ellipsis at the end...
</Text>

// Truncate in middle
<Text numberOfLines={1} ellipsizeMode="middle">
  very-long-filename-that-will-be-truncated-in-the-middle.pdf
</Text>

// Truncate at head
<Text numberOfLines={1} ellipsizeMode="head">
  ...message will be truncated at the beginning
</Text>
```

### Clickable Text (Links)

```tsx
import { useNavigation } from '@react-navigation/native';

function MyScreen() {
  const navigation = useNavigation();
  
  return (
    <Text 
      variant="labelMedium"
      color={colors.secondary[600]}
      underline
      onPress={() => navigation.navigate('Terms')}
    >
      Terms & Conditions
    </Text>
  );
}
```

### Disabled State

```tsx
// Disabled text (grayed out, 50% opacity)
<Text disabled>Disabled button text</Text>
<Text variant="button" disabled>Submit</Text>
```

### Accessibility

```tsx
<Text 
  accessibilityLabel="Total expense amount: $1,234.56"
  accessibilityRole="header"
>
  $1,234.56
</Text>
```

### Selectable Text (Copy-Paste)

```tsx
// Allow users to select and copy text
<Text selectable>
  Transaction ID: 1234567890
</Text>
```

### Testing

```tsx
<Text testID="expense-amount">$1,234.56</Text>
```

### Combined Examples (Real Use Cases)

```tsx
// Expense amount with old price
<View>
  <Text 
    variant="bodySmall" 
    color={colors.neutral.gray[400]} 
    strikethrough
  >
    $100.00
  </Text>
  <Text variant="h2" color={colors.success.main}>
    $80.00
  </Text>
</View>

// Category tag
<Text 
  variant="overline" 
  transform="uppercase"
  color={colors.primary[700]}
>
  Food & Dining
</Text>

// Expense description (truncated)
<Text 
  variant="bodyMedium"
  color={colors.neutral.gray[700]}
  numberOfLines={2}
  ellipsizeMode="tail"
>
  Lunch at Italian restaurant with colleagues. Had pizza and pasta.
  Great food and nice ambiance. Will visit again.
</Text>

// Link to see more
<Text
  variant="labelMedium"
  color={colors.secondary[600]}
  underline
  onPress={() => console.log('See more clicked')}
>
  See more details
</Text>

// Disabled submit button
<Text variant="button" disabled>
  Submit
</Text>

// Success message
<Text 
  variant="bodyMedium" 
  color={colors.success.main}
  accessibilityLabel="Expense saved successfully"
>
  ✓ Expense saved successfully
</Text>

// Error message
<Text 
  variant="bodySmall" 
  color={colors.error.main}
  accessibilityLabel="Amount is required"
>
  * Amount is required
</Text>
```

---

## 🎯 Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TextVariantKey` | `'bodyMedium'` | Typography variant |
| `color` | `string` | - | Text color |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Text alignment |
| `bold` | `boolean` | `false` | Bold text |
| `italic` | `boolean` | `false` | Italic text |
| `underline` | `boolean` | `false` | Underline text |
| `strikethrough` | `boolean` | `false` | Strikethrough text |
| `transform` | `'uppercase' \| 'lowercase' \| 'capitalize' \| 'none'` | - | Text transform |
| `disabled` | `boolean` | `false` | Disabled state |
| `numberOfLines` | `number` | - | Limit lines |
| `ellipsizeMode` | `'head' \| 'middle' \| 'tail' \| 'clip'` | `'tail'` | Truncation mode |
| `onPress` | `() => void` | - | Press handler |
| `selectable` | `boolean` | `false` | Allow text selection |
| `accessibilityLabel` | `string` | - | Screen reader label |
| `testID` | `string` | - | Test identifier |
| `style` | `StyleProp<TextStyle>` | - | Custom styles |

---

## 📂 File Structure

```
src/components/atoms/text/
├── index.tsx         # Component implementation
├── styles.ts         # Styling logic
├── types.d.ts        # TypeScript types
└── README.md         # This file
```

---

## ✅ Component Status

- ✅ **Complete** - Production ready
- ✅ TypeScript types defined
- ✅ All props implemented
- ✅ Documented with examples
- ⏳ Unit tests (TODO - Week 16)
