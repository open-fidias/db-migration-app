<template lang="html">
    <nav class="nav has-shadow is-inverted">
        <div class="container">
            <div class="nav-left">
                <a href="#" class="nav-item">
                    <img src="./assets/logo.svg" alt="logo">
                </a>
                <router-link
                    class="nav-item is-tab"
                    active-class="is-active"
                    to="/connection">Connection</router-link>
                <router-link
                    class="nav-item is-tab"
                    active-class="is-active"
                    to="/migrations">Migrations</router-link>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'main-menu'
}
</script>

<style lang="css" scoped>
.nav-item img {
    max-height: 2.75rem;
}

.is-inverted {
    background-color: #34495e;
}

a.nav-item.is-tab {
    font-weight: bold;
    color: #fdfdfd;
}
</style>
