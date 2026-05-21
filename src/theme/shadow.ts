import { ViewStyle } from 'react-native';
import { Platform } from 'react-native';

/**
 🌑 What are Shadows?
    * Shadows create depth and elevation in your UI. 
    They make elements look like they're floating above the background.
    Where you'll use shadows:
    Cards (expense cards, dashboard cards)
    Buttons (elevated buttons)
    Modals (pop-ups, dialogs)
    FAB (Floating Action Button - "Add Expense" button)
    Bottom sheets (slide-up menus)

    iOS vs Android Shadows
    Important: React Native handles shadows differently on each platform!

    
    iOS:
    Uses these props:
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
       
    Android:
    Uses this single prop:
        elevation: 5,
*/

/**
 * Shadow presets for different elevation levels
 * Automatically handles iOS (shadowColor, shadowOffset, etc.) and Android (elevation)
 */

export const shadows = {
  /**
   * No shadow - flat appearance
   */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,

  /**
   * Small shadow - subtle depth
   * Use for: Small cards, chips, tags
   */
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  } as ViewStyle,

  /**
   * Medium shadow - standard elevation
   * Use for: Cards, list items, input fields
   */
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  } as ViewStyle,

  /**
   * Large shadow - prominent elevation
   * Use for: Floating action buttons, bottom navigation
   */
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  } as ViewStyle,

  /**
   * Extra large shadow - maximum elevation
   * Use for: Modals, dialogs, bottom sheets
   */
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  } as ViewStyle,

  /**
   * Extra extra large shadow - dramatic elevation
   * Use for: Pop-ups, important modals
   */
  xxl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  } as ViewStyle,
} as const;

/**
 * Helper function to get shadow based on platform
 * On Android, only elevation is needed
 * On iOS, all shadow properties are needed
 */

export const getShadows = (level: keyof typeof shadows): ViewStyle => {
  const shadow = shadows[level];

  if (Platform.OS === 'android') {
    return { elevation: shadow.elevation };
  }
  return shadow;
};

export type ShadowLevel = keyof typeof shadows;
