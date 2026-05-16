const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Add support for absolute imports (all aliases)
    extraNodeModules: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/screens': path.resolve(__dirname, 'src/screens'),
      '@/navigation': path.resolve(__dirname, 'src/navigation'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/theme': path.resolve(__dirname, 'src/theme'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
    },
    
    // Asset extensions (images, fonts, videos)
    assetExts: [
      // Images
      'png',
      'jpg',
      'jpeg',
      'gif',
      'webp',
      'svg',
      
      // Fonts
      'ttf',
      'otf',
      'woff',
      'woff2',
      
      // Other
      'mp4',
      'mp3',
      'pdf',
    ],
    
    // Source extensions (code files)
    sourceExts: [
      'js',
      'jsx',
      'ts',
      'tsx',
      'json',
    ],
  },
  
  // Watch src folder for changes
  watchFolders: [path.resolve(__dirname, 'src')],
  
  // Transformer optimizations
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Lazy load modules for faster startup
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
