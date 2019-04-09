<template lang="html">
    <nav class="nav has-shadow is-inverted">
        <div class="container">
            <div class="nav-left">
                <router-link :to="{name: 'home-page'}" class="nav-item">
                    <img src="./assets/logo.svg" alt="logo">
                </router-link>
                <router-link
                    class="nav-item is-tab"
                    active-class="is-active"
                    to="/connection">Connection</router-link>
                <router-link
                    class="nav-item is-tab"
                    active-class="is-active"
                    to="/migrations">Migrations</router-link>
            </div>
            <div class="nav-right">
                <div class="nav-item">
                    <connection-status></connection-status>
                </div>
                <div class="nav-item">
                    <database-version v-show="isConnected"></database-version>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

import ConnectionStatus from 'components/connection/ConnectionStatus'
import DatabaseVersion from 'components/connection/DatabaseVersion'
import {mapGetters} from 'vuex'

export default {
    name: 'main-menu',
    components: {
        ConnectionStatus,
        DatabaseVersion
    },
    computed: {
        ...mapGetters([
            'isConnected'
        ])
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
