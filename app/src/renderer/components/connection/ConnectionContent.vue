<template lang="html">
    <section class="section">
        <connection-driver
            :driver="driver"
            @update-selected="updateSelected"
        ></connection-driver>
        <component v-if="driver" :is="currentForm"></component>
    </section>
</template>

<script>
import settings from 'electron-settings'
import PostgresqlForm from 'components/connection/PostgresqlForm'
import SqliteForm from 'components/connection/SqliteForm'
import ConnectionDriver from 'components/connection/ConnectionDriver'
import { POSTGRESQL } from 'database/driver'

export default {
    name: 'connection-content',
    components: {
        PostgresqlForm,
        SqliteForm,
        ConnectionDriver
    },
    data () {
        return {
            driver: settings.get('database.driver') || POSTGRESQL
        }
    },
    methods: {
        updateSelected (selected) {
            this.driver = selected
        }
    },
    computed: {
        currentForm () {
            return `${this.driver}-form`
        }
    }
}
</script>

<style lang="css">
</style>
