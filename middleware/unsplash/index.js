/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv').config();
const Unsplash = require('unsplash-js').default

const unsplashInstance = new Unsplash({
    applicationId: `${process.env.APPLICATION_ID}`,
    secret: `${process.env.SECRET}`
})

console.info(process.env.APPLICATION_ID)

unsplashInstance.photos.getRandomPhoto({count: 10})
.then((res) => res.json())
.then((json) => {
    console.info(json)
})
