// tailwind.config.js
/* eslint-env node */
module.exports = {
    theme: {
        extend: {
            gridTemplateColumns: {
                main: '12rem minmax(20rem, 1fr) 1fr',
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            blue: {
                500: '#177390',
                400: '#23B0DC',
                300: '#23B0DC',
                200: '#29CCFF',
                100: '#29CCFF',
            },
            green: {
                500: '#1e6e30',
                400: '#287439',
                300: '#218639',
                200: '#269f42',
                100: '#23bb47',
            },
            gray: {
                900: '#0F0F0F',
                800: '#2B2B2B',
                700: '#474747',
                600: '#636363',
                500: '#7F7F7F',
                400: '#9C9C9C',
                300: '#B8B8B8',
                200: '#D4D4D4',
                100: '#F0F0F0',
                50: '#FAFAFA',
            },
            black: '#000000',
            white: '#ffffff',
        },
    },
    variants: {
        extend: {
            backgroundColor: ['odd'],
        },
    },
}
