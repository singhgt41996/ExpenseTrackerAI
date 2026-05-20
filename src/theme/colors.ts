export const colors = {
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main brand color
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  secondary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Main secondary
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },

  success: {
    light: '#81C784',
    main: '#4CAF50',
    dark: '#388E3C',
  },

  error: {
    light: '#EF5350',
    main: '#F44336',
    dark: '#C62828',
  },

  warning: {
    light: '#FFB74D',
    main: '#FF9800',
    dark: '#F57C00',
  },

  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },

  semantic: {
    income: '#4CAF50',
    expense: '#F44336',
    savings: '#2196F3',
    investment: '#9C27B0',
  },
} as const;
