<template>
    <div id="#app">
        <main-menu></main-menu>
        <router-view></router-view>
        <main-footer></main-footer>
    </div>
</template>

<script>
import store from 'renderer/vuex/store'
import MainMenu from 'components/main/MainMenu'
import MainFooter from 'components/main/MainFooter'

export default {
    store,
    components: {
        MainMenu,
        MainFooter
    }
}
</script>

<style lang="css">
section.section {
    background-color: #fcfcfc;
}
</style>
