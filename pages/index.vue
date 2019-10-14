<template>
    <section class="images-container">
        <picture v-for="image in images" :key="image.id" class="image-item">
            <img
                :src="image.urls.regular"
                :alt="image.description || 'Image description'"
                loading="lazy"
            />
        </picture>
    </section>
</template>

<style lang="scss" scoped>
.images-container {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 0.3rem;
    // grid-auto-rows: minmax(100px, auto);
    grid-auto-rows: 40px;
    grid-auto-flow: dense;
}
.image-item {
    &,
    img {
        line-height: 0;
    }
    img {
        @include tablet {
            width: 100%;
        }
    }
}
</style>
<script>
// import { mapState } from 'vuex'

export default {
    // middleware: 'unsplash',
    layout: 'homepage',
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
        this.resizeAllGridItems()
        this.setListeners()
        // eslint-disable-next-line
        console.log(this.$store.state.images)
    },
    methods: {
        resizeAllGridItems() {
            const allItems = document.getElementsByClassName('image-item')
            for (let x = 0; x < allItems.length; x++) {
                this.resizeGridItem(allItems[x])
            }
        },
        resizeGridItem(item) {
            const grid = document.getElementsByClassName('images-container')[0]
            const rowHeight = parseInt(
                window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
            )
            const rowGap = parseInt(
                window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
            )
            const rowSpan = Math.ceil(
                (item.querySelector('img').getBoundingClientRect().height +
                    rowGap) /
                    (rowHeight + rowGap)
            )
            item.style.gridRowEnd = 'span ' + rowSpan
        },
        resizeInstance(instance) {
            const item = instance.elements[0]
            this.resizeGridItem(item)
        },
        setListeners() {
            window.addEventListener('onload', this.resizeAllGridItems)
            window.addEventListener('resize', this.resizeAllGridItems)
        }
    }
}
</script>
