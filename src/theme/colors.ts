/**
 * 🎨 What are Colors in UI Design?
 *
 * Colors are the foundation of your app's visual identity.
 * They create mood, convey meaning, and guide user attention.
 *
 * Why color matters:
 * - Creates emotional connection (green = positive, red = warning)
 * - Establishes brand identity (your app's unique personality)
 * - Improves usability (color-coded categories, status indicators)
 * - Ensures accessibility (proper contrast for readability)
 * - Guides user actions (primary button = main action)
 *
 * Where you'll use colors:
 * - Backgrounds (screens, cards, containers)
 * - Text (headings, body, hints, links)
 * - Buttons (primary, secondary, danger actions)
 * - Status indicators (success, error, warning messages)
 * - Charts & graphs (income/expense visualization)
 * - Icons & illustrations (category icons, empty states)
 *
 * The 50-900 Scale:
 * We use Material Design's color scale (50 = lightest, 900 = darkest)
 * - 50-100: Very light (backgrounds, highlights)
 * - 200-300: Light (disabled states, subtle accents)
 * - 400-600: Medium (main colors, standard use) ← MOST USED
 * - 700-800: Dark (hover states, emphasis)
 * - 900: Very dark (maximum emphasis)
 *
 * Color Psychology for Finance Apps:
 * - GREEN: Money, growth, positive, success, income
 * - RED: Warning, loss, danger, expense, debt
 * - BLUE: Trust, stability, neutral, information, savings
 * - PURPLE: Premium, investment, future, growth
 * - GRAY: Neutral, professional, secondary information
 *
 * Accessibility Tip:
 * - Text on white needs minimum 4.5:1 contrast ratio
 * - Our gray.900 (#212121) on white = 16.1:1 ✅ Excellent!
 * - Never rely on color alone (use icons + text for color-blind users)
 */

export const colors = {
  /**
   * PRIMARY COLOR (Green)
   *
   * Why Green for Finance App?
   * - Universal symbol of money and prosperity
   * - Positive, optimistic feeling
   * - Associated with growth and stability
   * - Used by: Mint, Robinhood, Cash App
   *
   * Where to use:
   * - Primary buttons (Add Expense, Save, Submit)
   * - Active states (selected tab, focused input)
   * - Success messages
   * - Income indicators
   * - Positive trends in charts
   */
  primary: {
    50: '#E8F5E9', // Lightest - Background tints, hover states
    100: '#C8E6C9', // Very light - Disabled button backgrounds
    200: '#A5D6A7', // Light - Subtle accents
    300: '#81C784', // Light-medium - Icons, secondary elements
    400: '#66BB6A', // Medium-light - Hover states
    500: '#4CAF50', // ⭐ MAIN BRAND COLOR - Primary buttons, main actions
    600: '#43A047', // Medium-dark - Button pressed state
    700: '#388E3C', // Dark - Darker accents, income text
    800: '#2E7D32', // Very dark - Strong emphasis
    900: '#1B5E20', // Darkest - Maximum contrast
  },

  /**
   * SECONDARY COLOR (Blue)
   *
   * Why Blue?
   * - Trust and reliability (banking, finance)
   * - Professional and calm
   * - Good contrast with green
   * - Used by: PayPal, Venmo, Chase
   *
   * Where to use:
   * - Secondary buttons (Edit, Cancel, Back)
   * - Information messages
   * - Links and clickable text
   * - Savings indicators
   * - Charts (second data series)
   */
  secondary: {
    50: '#E3F2FD', // Lightest - Info backgrounds
    100: '#BBDEFB', // Very light - Subtle highlights
    200: '#90CAF9', // Light - Disabled states
    300: '#64B5F6', // Light-medium - Icons
    400: '#42A5F5', // Medium-light - Hover states
    500: '#2196F3', // ⭐ MAIN SECONDARY - Secondary actions
    600: '#1E88E5', // Medium-dark - Active states
    700: '#1976D2', // Dark - Links, clickable text
    800: '#1565C0', // Very dark - Strong emphasis
    900: '#0D47A1', // Darkest - Maximum contrast
  },

  /**
   * SUCCESS COLOR
   *
   * Use for:
   * - Success toast messages
   * - Form validation (✓ Email valid)
   * - Positive confirmations
   * - Income transactions
   */
  success: {
    light: '#81C784', // Light success (backgrounds)
    main: '#4CAF50', // Standard success (same as primary)
    dark: '#388E3C', // Dark success (text on light backgrounds)
  },

  /**
   * ERROR COLOR (Red)
   *
   * Use for:
   * - Error messages and alerts
   * - Form validation errors
   * - Delete/destructive actions
   * - Expense transactions (money going out)
   * - Negative trends
   */
  error: {
    light: '#EF5350', // Light error (backgrounds, highlights)
    main: '#F44336', // Standard error (main error color)
    dark: '#C62828', // Dark error (text, strong emphasis)
  },

  /**
   * WARNING COLOR (Orange)
   *
   * Use for:
   * - Warning messages
   * - Budget limit approaching
   * - Attention needed (but not critical)
   * - Pending states
   */
  warning: {
    light: '#FFB74D', // Light warning (backgrounds)
    main: '#FF9800', // Standard warning
    dark: '#F57C00', // Dark warning (text)
  },

  /**
   * NEUTRAL COLORS (Grays, Black, White)
   *
   * The backbone of your UI!
   * Used for 80% of your interface:
   * - Text (primary, secondary, disabled)
   * - Backgrounds (screens, cards, surfaces)
   * - Borders and dividers
   * - Icons and illustrations
   *
   * Gray Scale Guide:
   * - 50-100: Backgrounds, very subtle elements
   * - 200-300: Borders, dividers, disabled backgrounds
   * - 400-600: Secondary text, placeholder text, disabled text
   * - 700-900: Primary text, icons, important content
   */
  neutral: {
    white: '#FFFFFF', // Pure white - Light mode backgrounds
    black: '#000000', // Pure black - Shadows, overlays

    gray: {
      50: '#FAFAFA', // Almost white - Screen backgrounds (light mode)
      100: '#F5F5F5', // Very light - Card backgrounds, surfaces
      200: '#EEEEEE', // Light - Disabled button backgrounds
      300: '#E0E0E0', // Medium-light - Borders, dividers, input borders
      400: '#BDBDBD', // Medium - Disabled text, placeholders
      500: '#9E9E9E', // Medium - Secondary text, hints, labels
      600: '#757575', // Medium-dark - Secondary text (better contrast)
      700: '#616161', // Dark - Icons, emphasis text
      800: '#424242', // Very dark - Dark mode borders, surfaces
      900: '#212121', // Almost black - Primary text, headings
    },
  },

  /**
   * SEMANTIC COLORS (Finance-Specific)
   *
   * These colors have specific MEANING in your app.
   * They help users instantly understand transaction types.
   *
   * Color-Blind Considerations:
   * - Always pair colors with icons (✓, ✗, $, 📊)
   * - Use different shades/brightness for distinction
   * - Add text labels alongside colors
   */
  semantic: {
    /**
     * INCOME - Green
     * Money coming IN (positive)
     * Use for: Salary, freelance income, refunds
     */
    income: '#4CAF50',

    /**
     * EXPENSE - Red
     * Money going OUT (negative)
     * Use for: Bills, purchases, subscriptions
     */
    expense: '#F44336',

    /**
     * SAVINGS - Blue
     * Money stored/saved (neutral/positive)
     * Use for: Savings goals, emergency fund
     */
    savings: '#2196F3',

    /**
     * INVESTMENT - Purple
     * Money invested for future (growth)
     * Use for: Stocks, mutual funds, crypto
     */
    investment: '#9C27B0',
  },
} as const;

/**
 * LIGHT THEME
 *
 * Used when user's device is in light mode
 * or user manually selects light theme in settings
 *
 * Characteristics:
 * - White/light backgrounds
 * - Dark text for contrast
 * - Subtle shadows for depth
 * - Higher brightness overall
 *
 * Best for:
 * - Daytime use
 * - Well-lit environments
 * - Users who prefer traditional light UIs
 */
export const lightTheme = {
  background: '#FFFFFF', // Pure white - Main screen background
  surface: '#F5F5F5', // Light gray - Card/container backgrounds
  text: {
    primary: '#212121', // Almost black - Main text, headings
    secondary: '#757575', // Medium gray - Secondary text, descriptions
    disabled: '#BDBDBD', // Light gray - Disabled text, placeholders
  },
  border: '#E0E0E0', // Light gray - Borders, dividers
} as const;

/**
 * DARK THEME
 *
 * Used when user's device is in dark mode
 * or user manually selects dark theme in settings
 *
 * Characteristics:
 * - Dark backgrounds (not pure black - easier on eyes)
 * - Light text for contrast
 * - Subtle elevation (lighter surfaces = higher elevation)
 * - Lower brightness overall
 *
 * Best for:
 * - Nighttime use
 * - Low-light environments
 * - Reduced eye strain
 * - OLED battery saving (darker pixels use less power)
 *
 * Dark Theme Rules:
 * - DON'T use pure black (#000000) for backgrounds
 * - Use #121212 instead (easier on eyes, better for OLED)
 * - Elevation = lighter surface (Material Design principle)
 * - Reduce white text to #FFFFFF or #F5F5F5 (less harsh)
 */
export const darkTheme = {
  background: '#121212', // Very dark gray (not pure black) - Main background
  surface: '#1E1E1E', // Slightly lighter - Elevated surfaces (cards)
  text: {
    primary: '#FFFFFF', // White - Main text, headings
    secondary: '#B0B0B0', // Light gray - Secondary text
    disabled: '#6E6E6E', // Medium gray - Disabled text
  },
  border: '#424242', // Medium-dark gray - Borders, dividers
} as const;
