<template>
    <div>
        <div class="container menu">
            <life-nav></life-nav>
        </div>
        <div class="container-fluid is-paddingless column is-12">
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
    z-index: 2;
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
