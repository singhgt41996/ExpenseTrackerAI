/**
 * 📏 What is Spacing?
 *
 * Spacing creates visual rhythm and consistency in your UI.
 * It controls margins, padding, and gaps between elements.
 *
 * Why consistent spacing matters:
 * - Makes UI feel professional and polished
 * - Creates visual hierarchy (what's important vs. what's not)
 * - Makes your app feel "designed", not thrown together
 * - Easy to maintain (change one value, updates everywhere)
 *
 * Where you'll use spacing:
 * - Padding inside cards, buttons, containers
 * - Margins between elements (Text, Buttons, Cards)
 * - Gap between list items
 * - Screen edge padding (safe area spacing)
 * - Form field spacing
 *
 * The 4px Grid System:
 * We use multiples of 4 (4, 8, 16, 24, 32...)
 * This is an industry standard used by:
 * - Material Design (Google)
 * - Human Interface Guidelines (Apple)
 * - Most design systems (Tailwind, Bootstrap, etc.)
 *
 * Why multiples of 4?
 * - Screens are usually divisible by 4 (1080px, 1920px, etc.)
 * - Creates visual harmony
 * - Easy mental math (8 = 2×4, 16 = 4×4)
 * - Works well for both small and large screens
 */

/**
 * Spacing scale based on 4px grid system
 * Use these for margins, padding, gaps
 */
export const spacing = {
  /**
   * 4px - Tiny spacing
   * Use for: Very tight spacing, small gaps between inline elements
   * Example: Gap between icon and text in a button
   */
  xs: 4,

  /**
   * 8px - Small spacing
   * Use for: Compact layouts, tight spacing between related items
   * Example: Padding inside small chips/tags, space between form label and input
   */
  sm: 8,

  /**
   * 16px - Medium spacing (MOST COMMON)
   * Use for: Default padding/margins, standard card padding
   * Example: Card padding, screen horizontal padding, gaps between sections
   */
  md: 16,

  /**
   * 24px - Large spacing
   * Use for: Breathing room between major sections
   * Example: Space between cards, vertical spacing between form sections
   */
  lg: 24,

  /**
   * 32px - Extra large spacing
   * Use for: Major sections, prominent separations
   * Example: Top/bottom screen padding, space before/after headings
   */
  xl: 32,

  /**
   * 48px - Extra extra large spacing
   * Use for: Maximum separation between unrelated sections
   * Example: Space between major screen sections, empty state spacing
   */
  xxl: 48,

  /**
   * 64px - Huge spacing
   * Use for: Dramatic spacing, onboarding screens, splash screens
   * Example: Hero section spacing, feature showcase spacing
   */
  xxxl: 64,
} as const;

/**
 * Border radius values for rounded corners
 * Affects how "sharp" or "soft" your UI feels
 *
 * Small radius (4-8px) = Modern, sharp, professional (fintech apps)
 * Medium radius (12-16px) = Friendly, approachable (social apps)
 * Large radius (24px+) = Playful, casual (gaming, entertainment)
 */
export const borderRadius = {
  /**
   * 4px - Subtle rounding
   * Use for: Small elements, minimal rounding
   * Example: Input fields, small chips
   */
  xs: 4,

  /**
   * 8px - Standard rounding (MOST COMMON)
   * Use for: Buttons, cards, most UI elements
   * Example: Primary buttons, expense cards
   */
  sm: 8,

  /**
   * 12px - Medium rounding
   * Use for: Prominent cards, larger buttons
   * Example: Dashboard cards, FAB buttons
   */
  md: 12,

  /**
   * 16px - Large rounding
   * Use for: Special cards, image containers
   * Example: Profile pictures (when square), feature cards
   */
  lg: 16,

  /**
   * 24px - Extra large rounding
   * Use for: Very soft corners, modern aesthetic
   * Example: Bottom sheets, modals, large cards
   */
  xl: 24,

  /**
   * 32px - Huge rounding
   * Use for: Pill shapes, very rounded elements
   * Example: Floating action buttons with text
   */
  xxl: 32,

  /**
   * 9999px - Full rounding (circular)
   * Use for: Circles, pills, tags
   * Example: Avatar images, round buttons, status badges
   */
  full: 9999,
} as const;

/**
 * Common layout values
 * Pre-defined sizes for common use cases
 */
export const layout = {
  /**
   * Standard screen horizontal padding
   * Keeps content away from screen edges
   */
  screenPadding: spacing.md, // 16px

  /**
   * Standard card padding
   * Inner spacing for cards and containers
   */
  cardPadding: spacing.md, // 16px

  /**
   * Gap between list items
   */
  listItemGap: spacing.sm, // 8px

  /**
   * Gap between form fields
   */
  formFieldGap: spacing.md, // 16px

  /**
   * Section spacing (between major sections)
   */
  sectionGap: spacing.lg, // 24px
} as const;

/**
 * Type exports for type safety
 * Use these in component props to ensure valid spacing values
 */
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type LayoutKey = keyof typeof layout;
