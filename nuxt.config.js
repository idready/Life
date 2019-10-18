module.exports = {
    mode: 'universal',
    server: {
        port: 3002
    },
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Satisfy&display=swap'
            }
        ],
        script: [
            {
                src:
                    'https://unpkg.com/imagesloaded@4.1.4/imagesloaded.pkgd.min.js',
                async: false,
                defer: true
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    devModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://buefy.github.io/#/documentation
        'nuxt-buefy',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/dotenv',
        '@nuxtjs/style-resources'
    ],
    env: {
        applicationId: process.env.APPLICATION_ID,
        secret: process.env.SECRET,
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        unsplashUrls: {
            BASE: 'https://api.unsplash.com/',
            RANDOM: { verb: 'GET', url: 'photos/random' },
            SEARCH: { verb: 'GET', url: 'search/photos' }
        }
    },
    /*
     ** Share variables, mixins, functions across all style files (no @import needed)
     ** See https://github.com/nuxt-community/style-resources-module
     */
    styleResources: {
        srcDir: 'client',
        // your settings here
        sass: [],
        scss: ['./assets/scss/*.scss'],
        less: [],
        stylus: []
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    serverMiddleware: [
        {
            path: '/unsplash-api',
            handler: '~/serverMiddleware/unsplash/index.js'
        }
    ],
    // This is configured middleware for any route change event
    // router: {
    //     middleware: ['unsplash']
    // },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            config.node = {
                fs: 'empty',
                net: 'empty'
            }
        }
    }
}
