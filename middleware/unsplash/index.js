/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv').config()

const fetch = require('node-fetch')

export default function ({context}) {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
    console.log('called')
}

// export default function ({store, redirect}) {

//     const body = {
//         count: 30
//     }

//     const options = {
//         method: process.env.unsplashUrls.RANDOM.verb,
//         // body: JSON.stringify(body),
//         headers: { 'Authorization' : `Client-ID ${process.env.APPLICATION_ID}` }
//     }
//     console.log('store')
//     fetch(`${process.env.unsplashUrls.BASE}${process.env.unsplashUrls.RANDOM.url}`, options)
//     .then((res) => res.json())
//     .then((data) => {
//         const response = data
//         if (!process.server) {
//             console.log("middleware from client side")
//             console.log(data)
//         }
//         return store.commit('getUnsplashImages', response)
//     })
//     .catch((error) => console.log(error))
// }

// export default function (req, res, next) {

//     const Unsplash = require('unsplash-js').default

//     const unsplashInstance = new Unsplash({
//         applicationId: `${process.env.APPLICATION_ID}`,
//         secret: `${process.env.SECRET}`
//     })

//     unsplashInstance.photos.getRandomPhoto({count: 100})
//     .then(toJson)
//     .then((json) => {
//         console.log('From Api ', json)
//         return res.end(json);
//     })
//     .catch((error) => {
//         console.log(error)
//     })

//     next()
// }
