<template>
    <section class="images-container">
        <picture v-for="image in images" :key="image.id" class="image-item">
            <img
                :src="image.urls.regular"
                :alt="image.description || 'Image description'"
                decoding="auto"
            />
            <!-- <span class="debug"
                ><span class="text">{{ index + 1 }}</span></span
            > -->
        </picture>
    </section>
</template>

<style lang="scss" scoped>
.images-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 3px;
    // grid-auto-rows: minmax(100px, auto);
    grid-auto-rows: 40px;
    grid-auto-flow: dense;
}
.image-item {
    // border: 1px solid tomato;
    // overflow: hidden;
    position: relative;
    &,
    img {
        line-height: 0;
    }
    img {
        @include tablet {
            width: 100%;
        }
    }
    .debug {
        align-items: center;
        background: tomato;
        border: 2px solid $white;
        border-radius: 50%;
        display: flex;
        height: 5rem;
        justify-content: center;
        left: 0;
        margin: 0 auto;
        transform: translateY(-50%);
        right: 0;
        top: 50%;
        position: absolute;
        width: 5rem;
    }
    .text {
        color: $white;
        font-size: 2rem;
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
        this.setListeners()
        this.resizeAllGridItems()
        window.dispatchEvent(
            new Event('resize', { bubbles: true, cancelable: false })
        )
        // eslint-disable-next-line
        console.log(this.$store.state.images)
    },
    methods: {
        resizeAllGridItems() {
            const allItems = document.getElementsByClassName('image-item')
            for (let x = 0; x < allItems.length; x++) {
                window.imagesLoaded(allItems[x], this.resizeInstance)
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
            const rowSpan = Math.floor(
                (item.querySelector('img').getBoundingClientRect().height +
                    rowGap) /
                    (rowHeight + rowGap)
            )
            item.style.gridRowEnd = 'span ' + rowSpan // Why -1 ?
            item.style.display = 'flex' // Force image to stretch in parent container and not more
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
