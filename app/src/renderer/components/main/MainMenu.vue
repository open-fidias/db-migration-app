<template lang="html">
    <div>
        <nav class="nav has-shadow is-inverted">
            <div class="container">
                <div class="nav-left">
                    <a href="#" class="nav-item">
                        <img src="./assets/logo.svg" alt="RP">
                    </a>
                    <a href="#"
                        class="nav-item is-tab"
                        :class="{ 'is-active': nav.isActive }"
                        @click="selectContent(index)"
                        v-for="(nav, index) in navs">
                        {{nav.label}}
                    </a>
                </div>
            </div>
        </nav>
        <div>
            <slot></slot>
        </div>
        <versions></versions>
    </div>
</template>

<script>
import Versions from 'components/main/Versions'

export default {
    name: 'main-menu',
    components: {
        Versions
    },
    data () {
        return {
            navs: []
        }
    },
    methods: {
        selectContent (selectedNav) {
            this.navs.forEach((nav, index) => {
                nav.isActive = (index === selectedNav)
            })
        },
        registerTab (tab) {
            this.navs.push(tab)
        },
        removeTab (index) {
            this.navs.splice(index, 1)
        }
    }
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
