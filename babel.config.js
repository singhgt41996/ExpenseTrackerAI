module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Module resolver for absolute imports (FIRST)
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/navigation': './src/navigation',
          '@/store': './src/store',
          '@/services': './src/services',
          '@/hooks': './src/hooks',
          '@/utils': './src/utils',
          '@/theme': './src/theme',
          '@/types': './src/types',
          '@/assets': './src/assets',
        },
      },
    ],

    // Required by zod v4 (transforms `export * as ns from ...`)
    '@babel/plugin-transform-export-namespace-from',

    // Reanimated plugin (MUST be LAST)
    'react-native-reanimated/plugin',
  ],
};
