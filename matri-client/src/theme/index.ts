// src/theme/index.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Optional: Dark/light mode configuration
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

// Custom color palette, fonts, etc.
const theme = extendTheme({
    config,
    colors: {
        brand: {
            50: '#ffe0ec',
            100: '#fab8d2',
            200: '#f48ab8',
            300: '#ee5c9e',
            400: '#e82e84',
            500: '#cf156b',
            600: '#a11053',
            700: '#730b3b',
            800: '#450523',
            900: '#1c000c',
        },
    },
    fonts: {
        heading: `'Poppins', sans-serif`,
        body: `'Inter', sans-serif`,
    },
});

export default theme;
