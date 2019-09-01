<template>
    <div>
        <div class="container menu">
            <life-nav></life-nav>
        </div>
        <div class="container column is-10">
            <nuxt />
        </div>
    </div>
</template>

<style lang="scss">
html,
body {
    font-size: 10px;
}

.menu {
    left: 0;
    position: fixed;
    right: 0;
    top: 2rem;
}
</style>

<script>
import LifeNav from '~/components/Nav'

export default {
    components: {
        LifeNav
    },
    data() {
        return {}
    }
}
</script>
