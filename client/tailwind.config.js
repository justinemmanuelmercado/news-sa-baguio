// tailwind.config.js
/* eslint-env node */
module.exports = {
    purge: {
        content: ['./src/**/*.tsx'],
    },
    plugins: [require('@tailwindcss/typography')],
    theme: {
        gridTemplateRows: {
            app: 'max-content 1fr',
        },
        gridTemplateColumns: {
            'main-list': '15rem 1.2fr 0.8fr',
            'main-content': '15rem 0.8fr 1.2fr',
            'mobile-main-content': '0vw 100vw',
            'mobile-main-list': '100vw 0vw',
        },
        transitionProperty: {
            'max-height': 'max-height',
            'grid-cols': 'grid-template-columns',
            width: 'width',
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
