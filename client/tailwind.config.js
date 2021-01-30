// tailwind.config.js
/* eslint-env node */
module.exports = {
    theme: {
        extend: {
            gridTemplateColumns: {
                main: '20rem minmax(20rem, 1fr) 1fr',
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            blue: {
                500: '#4545B8',
                400: '#6868F7',
                300: '#9393F0',
                200: '#B5B5FF',
                100: '#D6D9FF',
            },
            green: {
                500: '#0BB68B',
                400: '#23CFA4',
                300: '#5ADCBB',
                200: '#8EE9D2',
                100: '#C4F2E7',
            },
            gray: {
                600: '#2B2B2B',
                500: '#545454',
                400: '#686868',
                300: '#CCCCCC',
                200: '#F7F7F7',
                100: '#FFFFFF',
            },
        },
    },
}
