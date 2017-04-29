<template lang="html">
    <div>
        <div class="columns">
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Driver</label>
                    <p class="control">
                        <span class="select">
                            <select v-model="form.driver">
                                <option value="postgresql">PostgreSQL</option>
                            </select>
                        </span>
                    </p>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">Hostname</label>
                    <p class="control">
                        <input class="input" v-model="form.host"/>
                    </p>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label for="" class="label">Port</label>
                    <p class="control">
                        <input class="input" v-model="form.port"/>
                    </p>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Database</label>
                    <p class="control">
                        <input class="input" v-model="form.database"/>
                    </p>
                </div>
            </div>
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Username</label>
                    <p class="control">
                        <input class="input" v-model="form.user"/>
                    </p>
                </div>
            </div>
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Password</label>
                    <p class="control">
                        <input type="password" class="input" v-model="form.password"/>
                    </p>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <connection-status></connection-status>
            </div>
            <div class="column">
                <button class="button is-primary is-pulled-right"
                    :class="{'is-loading': database.isConnecting}"
                    @click.prevent="makeConnection">Connect</button>
            </div>
        </div>
        <div class="notification is-info" v-if="database.version">
            Database Version: {{ database.version }}
        </div>
        <div class="notification is-danger" v-show="error.isVisible">
            <button class="delete"
                @click.prevent="error.isVisible = false"></button>
            {{ error.message }}
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ConnectionStatus from 'components/connection/ConnectionStatus'
import settings from 'electron-settings'
import { connect, disconnect } from '../../database.js'

export default {
    name: 'connection-form',
    components: {
        ConnectionStatus
    },
    data () {
        return {
            form: {
                driver: '',
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
            error: {
                message: null,
                isVisible: false
            }
        }
    },
    mounted () {
        settings.get('connection.params')
            .then(values => {
                this.form = values
            })
    },
    methods: {
        ...mapMutations([
            'setConnectionStatus',
            'setConnectionParams'
        ]),
        makeConnection () {
            this.saveConnectionParams(this.form)
            disconnect()
                .then(() => {
                    this.database.version = null
                    this.setConnectionStatus(false)
                    this.database.isConnecting = true
                    return connect(this.form)
                })
                .then((connection) => {
                    this.setConnectionStatus(connection.isConnected)
                    connection.instance.query('SELECT version()', (err, result) => {
                        if (err) return console.error('query:', err)
                        this.database.version = result.rows[0].version
                        this.database.isConnecting = false
                        this.error.isVisible = false
                    })
                })
                .catch((err) => {
                    this.error.message = `${err.severity} - ${err.message} [${err.code}]`
                    this.error.isVisible = true
                    this.database.isConnecting = false
                })
        },
        saveConnectionParams () {
            settings.set('connection.params', {
                driver: this.form.driver,
                host: this.form.host,
                port: this.form.port,
                database: this.form.database,
                user: this.form.user
            })
            this.setConnectionParams(this.form)
        }
    },
    beforeDestroy () {
        disconnect()
            .then(() => {
                this.setConnectionStatus(false)
            })
    }
}
</script>

<style lang="css">
</style>
