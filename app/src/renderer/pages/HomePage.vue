<template lang="html">
    <main-menu>
        <main-content label="Connection" :selected="true">
            <section class="section">
                <keep-alive>
                    <connection-content></connection-content>
                </keep-alive>
            </section>
        </main-content>
        <main-content label="Migrations">
            <section class="section">
                <keep-alive>
                    <migration-content></migration-content>
                </keep-alive>
            </section>
        </main-content>
    </main-menu>
</template>

<script>
import MainMenu from 'components/main/MainMenu'
import MainContent from 'components/main/MainContent'
import ConnectionContent from 'components/connection/ConnectionContent'
import MigrationContent from 'components/migration/MigrationContent'

export default {
    name: 'home-page',
    components: {
        MainMenu,
        MainContent,
        ConnectionContent,
        MigrationContent
    }
}
</script>

<style lang="css" scoped>
</style>
