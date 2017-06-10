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
import ConnectionStatus from 'components/connection/ConnectionStatus'
import Notification from 'components/main/Notification'
import settings from 'electron-settings'
import { connect, disconnect } from '../../database.js'

export default {
    name: 'connection-form',
    components: {
        ConnectionStatus,
        Notification
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
            notification: {
                message: '',
                isVisible: false,
                modifier: ''
            }
        }
    },
    mounted () {
        settings.get('connection.params')
            .then(values => {
                this.form = values
                this.form.password = this.getConnectionParams.password
            })
    },
    methods: {
        ...mapMutations([
            'setConnectionStatus'
        ]),
        ...mapActions([
            'setConnectionParams'
        ]),
        makeConnection () {
            this.setConnectionParams(this.form)
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
                        if (err) {
                            return this.showErrorMessage(err)
                        }
                        this.database.version = result.rows[0].version
                        this.database.isConnecting = false
                        this.notification.isVisible = false
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
        }
    },
    computed: {
        ...mapGetters([
            'getMigrationsFolder',
            'getConnectionParams'
        ])
    }
}
</script>

<style lang="css">
</style>
