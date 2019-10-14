/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv').config()

import { URLSearchParams } from 'url'
const fetch = require('node-fetch')


export default function (req, res, next) {

    // const Unsplash = require('unsplash-js').default

    // const unsplashInstance = new Unsplash({
    //     applicationId: `${process.env.APPLICATION_ID}`,
    //     secret: `${process.env.SECRET}`
    // })

    // unsplashInstance.photos.getRandomPhoto({count: 100})
    // .then(toJson)
    // .then((json) => {
    //     console.log('From Api ', json)
    //     return res.end(json);
    // })
    // .catch((error) => {
    //     console.log(error)
    // })
    res.send('Hello world')
    next()
}
