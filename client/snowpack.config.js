/** @type {import("snowpack").SnowpackUserConfig } */
/* eslint-env node */
module.exports = {
    mount: {
        public: '/',
        src: '/dist',
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-postcss',
    ],
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2018',
        treeshake: true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        /* ... */
    },
}
