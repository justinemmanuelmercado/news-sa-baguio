/* eslint-env node */
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-nested'),
        require('cssnano'),
        require('postcss-preset-env'),
    ],
}
