<template>
    <div class="logo-container">
        <p class="text">Life</p>
    </div>
</template>

<style lang="scss" scoped>
.logo-container {
    align-items: center;
    background: #4a90e2;
    border-radius: 50%;
    border: 1px solid white;
    color: $white;
    display: flex;
    justify-content: center;
    height: 11.5rem;
    font-size: 2rem;
    width: 11.5rem;
}
.text {
    font-family: 'Satisfy', cursive;
    font-size: 4rem;
}
</style>

<script>
export default {
    name: 'LifeLogo'
}
</script>
