<template lang="html">
    <div>
        <div class="columns">
            <div class="column is-4-desktop is-offset-2-desktop is-5-tablet is-offset-1-tablet">
                <div class="field">
                    <label for="" class="label">Hostname</label>
                    <p class="control">
                        <input class="input" v-model="form.host"/>
                    </p>
                </div>
            </div>
            <div class="column is-1-desktop is-2-tablet">
                <div class="field">
                    <label for="" class="label">Port</label>
                    <p class="control">
                        <input class="input" v-model="form.port"/>
                    </p>
                </div>
            </div>
            <div class="column is-3-desktop is-3-tablet">
                <div class="field">
                    <label for="" class="label">Database</label>
                    <p class="control">
                        <input class="input" v-model="form.database"/>
                    </p>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-2-desktop is-offset-2-desktop is-4-tablet is-offset-1-tablet">
                <div class="field">
                    <label for="" class="label">Username</label>
                    <p class="control">
                        <input class="input" v-model="form.user"/>
                    </p>
                </div>
            </div>
            <div class="column is-2-desktop is-4-tablet">
                <div class="field">
                    <label for="" class="label">Password</label>
                    <p class="control">
                        <input type="password" class="input" v-model="form.password"/>
                    </p>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-4-desktop is-offset-2-desktop is-5-tablet is-offset-1-tablet">
                <label class="checkbox">
                    <input type="checkbox"
                    v-model="goToMigrationsAfterConnect">
                    Go to Migrations after Connect
                </label>
            </div>
            <div class="column is-4-desktop is-5-tablet">
                <button class="button is-primary is-medium is-pulled-right"
                    :class="{'is-loading': database.isConnecting}"
                    @click.prevent="makeConnection">Connect</button>
            </div>
        </div>
        <div class="notification is-info" v-if="database.version">
            Database Version: {{ database.version }}
        </div>
        <notification :message="notification.message"
            :isVisible="notification.isVisible"
            :modifier="notification.modifier"
            @close="notification.isVisible = false"
        ></notification>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Notification from 'components/main/Notification'
import settings from 'electron-settings'
import { connect, disconnect } from 'database/postgresql.js'
import { POSTGRESQL } from 'database/driver'

export default {
    name: 'postgresql-form',
    components: {
        Notification
    },
    data () {
        return {
            form: {
                host: '',
                port: 0,
                database: '',
                user: '',
                password: ''
            },
            database: {
                version: null,
                isConnecting: false
            },
            notification: {
                message: '',
                isVisible: false,
                modifier: ''
            },
            goToMigrationsAfterConnect: false
        }
    },
    mounted () {
        this.setDefaultConnectionParams()
        this.goToMigrationsAfterConnect = settings.get('preferences.goToMigrationsAfterConnect', true)
        this.setDatabaseDriver(POSTGRESQL)
    },
    methods: {
        ...mapMutations([
            'setConnectionStatus',
            'setDatabaseVersion'
        ]),
        ...mapActions([
            'setConnectionParams',
            'setDatabaseDriver'
        ]),
        makeConnection () {
            this.setConnectionParams(this.form)
            this.setDatabaseVersion(null)
            disconnect()
                .then(() => {
                    this.database.version = null
                    this.setConnectionStatus('is_connecting')
                    this.database.isConnecting = true
                    return connect(this.form)
                })
                .then((connection) => {
                    this.setConnectionStatus(connection.isConnected ? 'connected' : 'disconnected')
                    connection.instance.query('show server_version', (err, result) => {
                        if (err) {
                            return this.showErrorMessage(err)
                        }
                        this.database.version = result.rows[0].server_version
                        this.setDatabaseVersion(this.database.version)
                        this.database.isConnecting = false
                        this.notification.isVisible = false
                        if (this.goToMigrationsAfterConnect) {
                            this.$router.push({name: 'migrations'})
                        }
                    })
                })
                .catch((err) => {
                    this.showErrorMessage(err)
                    this.database.isConnecting = false
                })
        },
        showErrorMessage (err) {
            this.notification.message = `${err.severity} - ${err.message} [${err.code}]`
            this.notification.isVisible = true
            this.notification.modifier = 'is-danger'
        },
        setDefaultConnectionParams () {
            const driver = settings.get('database.driver')
            if (driver === POSTGRESQL) {
                this.form = settings.get('connection.params')
                this.form.password = this.getConnectionParams.password
            }
        }
    },
    computed: {
        ...mapGetters([
            'getConnectionParams'
        ])/* ,
        generateName: function () {
            return `${this.form.user} on ${this.form.host}:${this.form.port}/${this.form.database}`
        } */
    },
    watch: {
        goToMigrationsAfterConnect (newValue) {
            settings.set('preferences.goToMigrationsAfterConnect', newValue)
        }
    }
}
</script>
<style scoped>
.input[readonly] {
    background-color: whitesmoke;
    border-color: whitesmoke;
    box-shadow: none;
    color: #7a7a7a;
}
</style>
