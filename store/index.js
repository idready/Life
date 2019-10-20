/* eslint camelcase: ["error", {properties: "never"}] */
import { URLSearchParams } from 'url'

export const state = () => ({
    images: []
})

export const mutations = {
    add(state, payload) {
        state.images = payload
    }
}

export const actions = {
    async getUnsplashImages({ state, commit }) {
        if (state.images.length > 0) return
        try {
            const params = { count: 30 }
            const urlParams = new URLSearchParams(Object.entries(params))
            const options = {
                method: process.env.unsplashUrls.RANDOM.verb,
                headers: {
                    Authorization: `Client-ID ${process.env.APPLICATION_ID}`
                }
            }
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
                commit('add', result)
                await fetch(`${process.env.baseUrl}/unsplash-api`, {
                    method: 'POST',
                    body: JSON.stringify(result),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const response = await fetch(
                    `${process.env.baseUrl}/unsplash-api`,
                    {
                        method: 'GET'
                    }
                )
                if (response.ok) {
                    const json = await response.json()
                    const result = Array.isArray(json) ? json : [json]
                    commit('add', result.splice(state.images.length, 30))
                } else {
                    // eslint-disable-next-line
                    console.error(`Can't read ${process.env.CATALOG_PATH}`)
                }
            }
        } catch (err) {
            // eslint-disable-next-line
            console.log('Store Catch Error ', err)
            return []
        }
    }
}
