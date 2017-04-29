<template lang="html">
    <section class="hero is-dark is-medium">
        <div class="hero-body">
            <div class="container has-text-centered">
                <figure class="image is-128x128 is-centered is-fullwidth">
                    <img src="../components/main/assets/logo.svg" alt="logo">
                </figure>
                <h1 class="title is-2">
                    Welcome to Database Migration App
                </h1>
                <h2 class="subtitle is-4">
                    Developed by Open Fidias Team
                </h2>
                <router-link
                    class="button is-primary is-large is-outlined"
                    to="/connection">Start Connection</router-link>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'home-page'
}
</script>

<style lang="css" scoped>
.is-centered {
    display: block;
    margin: 0 auto;
}
</style>
