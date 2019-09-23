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
            // eslint-disable-next-line
            console.log('store')
            const response = await fetch(
                `${process.env.unsplashUrls.BASE}${process.env.unsplashUrls.RANDOM.url}?${urlParams}`,
                options
            )
            if (response.ok) {
                const json = await response.json()
                const result = Array.isArray(json) ? json : [json]
                commit('add', result)
                localStorage.setItem('unsplash_images', JSON.stringify(result))
            } else {
                // eslint-disable-next-line
                console.error('Bro something went wrong ' + response.url)
            }
        } catch (err) {
            // eslint-disable-next-line
            console.log('Aiee', err)
            return []
        }
    }
}
