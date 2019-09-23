<template>
    <section class="section">
        <h2 class="title is-3 has-text-grey">
            "Just start <b-icon icon="rocket" size="is-large" />"
        </h2>
        <h3 class="subtitle is-6 has-text-grey">
            Author:
            <a href="https://github.com/anteriovieira">
                Antério Vieira
            </a>
        </h3>
    </section>
</template>

<script>
// import { mapState } from 'vuex'

export default {
    head() {
        return {
            title: 'Life, enjoy Life!',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'A playground with nuxt framework'
                }
            ]
        }
    },
    // computed: mapState(['images']),
    async fetch({ store, params }) {
        await store.dispatch('getUnsplashImages')
    },
    mounted() {
        // eslint-disable-next-line
        console.log(this.$store.state.images)
    }
}
</script>
