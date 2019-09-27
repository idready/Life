<template>
    <section class="section">
        <picture v-for="image in images" v-bind:key="image.id">
            <img :src="image.urls.regular" :alt="image.description" />
        </picture>
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
    data() {
        return {
            images: []
        }
    },
    // computed: mapState(['images']),
    async fetch({ store, params }) {
        await store.dispatch('getUnsplashImages')
    },
    mounted() {
        if (this.$store.state.images.length) {
            localStorage.setItem(
                'unsplash_images',
                JSON.stringify(this.$store.state.images)
            )
            this.images = this.$store.state.images
        } else {
            this.images = JSON.parse(localStorage.getItem('unsplash_images'))
        }
        // eslint-disable-next-line
        console.log(this.$store.state.images)
    }
}
</script>
