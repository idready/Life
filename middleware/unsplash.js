/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv').config()

import { URLSearchParams } from 'url'
const fetch = require('node-fetch')

// export default function ({context}) {
//     context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
//     console.log('called')
// }

export default async function ({store, redirect}) {

    const params = { count: 30 }
    const urlParams = new URLSearchParams(Object.entries(params))
    const options = {
        method: process.env.unsplashUrls.RANDOM.verb,
        headers: {
            Authorization: `Client-ID ${process.env.APPLICATION_ID}`
        }
    }
    // eslint-disable-next-line
    console.log('** Unsplash middleware **')
    const response = await fetch(
        `${process.env.unsplashUrls.BASE}${process.env.unsplashUrls.RANDOM.url}?${urlParams}`,
        options
    )
    if (response.ok) {
        const json = await response.json()
        let result = Array.isArray(json) ? json : [json]
        result = result.map(
            ({
                categories,
                color, // created_at,
                description,
                id,
                likes, // updated_at,
                urls,
                user,
                views,
                height,
                width
            }) => ({
                categories,
                color,
                // created_at,
                description,
                id,
                likes, // updated_at,
                urls,
                user,
                views,
                height,
                width
            })
        )
        store.commit('add', result)
    } else {
        // eslint-disable-next-line
        console.error('Bro something went wrong ' + response.url)
    }
}
