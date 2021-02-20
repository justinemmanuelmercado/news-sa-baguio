/** @type {import("snowpack").SnowpackUserConfig } */
/* eslint-env node */
module.exports = {
    routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
    mount: {
        public: '/',
        src: '/dist',
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-postcss',
        '@snowpack/plugin-dotenv',
    ],
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2020',
        treeshake: true,
        splitting: true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        sourcemap: true,
    },
}
