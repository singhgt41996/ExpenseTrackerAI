import { TextStyle } from 'react-native';

/**
 * 📝 What is Typography?
 *
 * Typography is the art and technique of arranging text.
 * It controls font sizes, weights, line heights, and text styles.
 *
 * Why typography matters:
 * - Creates visual hierarchy (what to read first, second, third)
 * - Improves readability (easier to scan and understand)
 * - Sets the tone and personality of your app
 * - Ensures consistency across all screens
 * - Makes text accessible (proper sizes, contrast, spacing)
 *
 * Where you'll use typography:
 * - Headings (Dashboard, Settings, Screen Titles)
 * - Body text (Descriptions, paragraphs, instructions)
 * - Labels (Form labels, input labels, button text)
 * - Captions (Timestamps, hints, metadata)
 * - Display text (Hero text, large numbers, amounts)
 *
 * The Type Scale:
 * We use a harmonious scale of font sizes that work well together.
 * Based on a 1.125-1.25 ratio (similar to Material Design)
 *
 * Font Weight Guide:
 * - 300 (Light): Rarely used, very thin
 * - 400 (Regular): Body text, default text
 * - 500 (Medium): Slightly emphasized text
 * - 600 (Semibold): Sub-headings, important labels
 * - 700 (Bold): Headings, primary emphasis
 * - 800 (Extrabold): Display text, hero numbers
 */

/**
 * Font size scale
 * Based on 16px base size (standard web/mobile default)
 */
export const fontSizes = {
  /**
   * 12px - Extra small
   * Use for: Captions, timestamps, small hints, metadata
   * Example: "2 hours ago", "Last updated: ...", fine print
   */
  xs: 12,

  /**
   * 14px - Small
   * Use for: Secondary text, labels, small buttons
   * Example: Form labels, secondary descriptions, tab labels
   */
  sm: 14,

  /**
   * 16px - Medium (BASE SIZE - MOST COMMON)
   * Use for: Body text, default paragraph text, standard buttons
   * Example: Expense descriptions, settings text, button labels
   */
  md: 16,

  /**
   * 18px - Large
   * Use for: Emphasized text, sub-headings, large buttons
   * Example: Card titles, section labels, feature text
   */
  lg: 18,

  /**
   * 20px - Extra large
   * Use for: Sub-headings, important labels
   * Example: Section headings, modal titles
   */
  xl: 20,

  /**
   * 24px - Extra extra large
   * Use for: Page headings, card headings
   * Example: Screen titles, "Dashboard", "Settings"
   */
  xxl: 24,

  /**
   * 32px - Huge
   * Use for: Major headings, hero text
   * Example: Onboarding titles, empty state titles
   */
  xxxl: 32,

  /**
   * 48px - Display
   * Use for: Large numbers, amounts, hero display
   * Example: Total expense amount on dashboard, big stats
   */
  display: 48,
} as const;

/**
 * Line heights
 * Controls vertical spacing between lines of text
 *
 * Good line height = Font size × 1.4 to 1.6
 * Too tight (< 1.3) = Hard to read, text feels cramped
 * Too loose (> 1.8) = Text feels disconnected, harder to follow
 *
 * We use slightly tighter line heights for headings,
 * and looser for body text (better readability)
 */
export const lineHeights = {
  xs: 16, // 12px font → 1.33 ratio (tight for small text)
  sm: 20, // 14px font → 1.43 ratio
  md: 24, // 16px font → 1.5 ratio (comfortable reading)
  lg: 28, // 18px font → 1.56 ratio
  xl: 32, // 20px font → 1.6 ratio
  xxl: 36, // 24px font → 1.5 ratio (headings can be tighter)
  xxxl: 40, // 32px font → 1.25 ratio (tight for big headings)
  display: 56, // 48px font → 1.17 ratio (very tight for display)
} as const;

/**
 * Font weights
 * Controls how thick/bold the text appears
 *
 * iOS supports: 100, 200, 300, 400, 500, 600, 700, 800, 900
 * Android: Depends on font file, typically 400, 700
 *
 * For cross-platform consistency, stick to:
 * 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
 */
export const fontWeights = {
  light: '300' as TextStyle['fontWeight'],
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
} as const;

/**
 * Font families
 *
 * IMPORTANT: These are placeholders!
 * Replace with your actual custom fonts after integration.
 *
 * For now, using 'System' = uses device's default font
 * iOS: San Francisco
 * Android: Roboto
 *
 * Week 2-3: You'll add custom fonts like:
 * - Inter, Poppins, Manrope (modern, clean)
 * - For finance apps: Inter, Work Sans, IBM Plex Sans
 */
export const fontFamilies = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',

  // After custom font integration, it'll look like:
  // regular: 'Inter-Regular',
  // medium: 'Inter-Medium',
  // semibold: 'Inter-SemiBold',
  // bold: 'Inter-Bold',
} as const;

/**
 * Text Variants
 * Pre-defined text styles for common use cases
 *
 * Instead of manually setting fontSize, fontWeight, lineHeight every time,
 * just use a variant!
 *
 * Usage:
 * <Text style={textVariants.h1}>Dashboard</Text>
 * <Text style={textVariants.bodyMedium}>Your expenses</Text>
 */
export const textVariants: Record<string, TextStyle> = {
  /**
   * DISPLAY STYLES
   * For hero sections, large numbers, splash screens
   */
  displayLarge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.display, // 48px
    lineHeight: lineHeights.display, // 56px
    fontWeight: fontWeights.bold,
  },
  displayMedium: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.xxxl, // 32px
    lineHeight: lineHeights.xxxl, // 40px
    fontWeight: fontWeights.bold,
  },

  /**
   * HEADING STYLES
   * For screen titles, section headings, card titles
   */
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.xxl, // 24px
    lineHeight: lineHeights.xxl, // 36px
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes.xl, // 20px
    lineHeight: lineHeights.xl, // 32px
    fontWeight: fontWeights.semibold,
  },
  h3: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes.lg, // 18px
    lineHeight: lineHeights.lg, // 28px
    fontWeight: fontWeights.semibold,
  },

  /**
   * BODY STYLES
   * For paragraphs, descriptions, main content
   */
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md, // 16px
    lineHeight: lineHeights.md, // 24px
    fontWeight: fontWeights.regular,
  },
  bodyMedium: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm, // 14px
    lineHeight: lineHeights.sm, // 20px
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.xs, // 12px
    lineHeight: lineHeights.xs, // 16px
    fontWeight: fontWeights.regular,
  },

  /**
   * LABEL STYLES
   * For form labels, input labels, emphasized text
   */
  labelLarge: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.md, // 16px
    lineHeight: lineHeights.md, // 24px
    fontWeight: fontWeights.medium,
  },
  labelMedium: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.sm, // 14px
    lineHeight: lineHeights.sm, // 20px
    fontWeight: fontWeights.medium,
  },
  labelSmall: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.xs, // 12px
    lineHeight: lineHeights.xs, // 16px
    fontWeight: fontWeights.medium,
  },

  /**
   * BUTTON TEXT
   * For all button labels
   */
  button: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes.md, // 16px
    lineHeight: lineHeights.md, // 24px
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.5, // Slight spacing for readability
  },

  /**
   * CAPTION
   * For timestamps, hints, metadata, secondary info
   */
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.xs, // 12px
    lineHeight: lineHeights.xs, // 16px
    fontWeight: fontWeights.regular,
  },

  /**
   * OVERLINE
   * For small uppercase labels, categories, tags
   */
  overline: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.xs, // 12px
    lineHeight: lineHeights.xs, // 16px
    fontWeight: fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1.5, // Wide spacing for uppercase
  },
} as const;

/**
 * Type exports for type safety
 * Use these in component props
 */
export type FontSizeKey = keyof typeof fontSizes;
export type LineHeightKey = keyof typeof lineHeights;
export type FontWeightKey = keyof typeof fontWeights;
export type FontFamilyKey = keyof typeof fontFamilies;
export type TextVariantKey = keyof typeof textVariants;
