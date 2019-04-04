<template>
    <div>
        <div class="columns">
            <div class="column is-6 is-offset-2">
                <div class="field">
                    <label for="" class="label">Path of main database</label>
                    <div class="field has-addons">
                        <p class="control is-expanded">
                            <input class="input" v-model="form.path"/>
                        </p>
                        <p class="control">
                            <button class="button is-info"
                                @click.prevent="chooseMainDb">
                                Browse...
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="attach-database">
            <div class="columns">
                <div class="column is-4 is-offset-2">
                    <h4 class="subtitle">Opcional</h4>
                </div>
            </div>
            <div class="columns">
                <div class="column is-5 is-offset-2">
                    <div class="field">
                        <label for="" class="label">Attach database</label>
                        <div class="field has-addons">
                            <p class="control is-expanded">
                                <input class="input" v-model="dbForm.path"/>
                            </p>
                            <p class="control">
                                <button class="button is-info"
                                    @click.prevent="chooseAuxDb">
                                    Browse...
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="column is-2">
                    <div class="field">
                        <label for="" class="label">As (Schema)</label>
                        <p class="control">
                            <input class="input" v-model="dbForm.schema"/>
                        </p>
                    </div>
                </div>
                <div class="column is-2"
                    style="display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start;">
                    <button class="button is-default"
                        @click.prevent="addDatabase">
                        Attach
                    </button>
                </div>
            </div>

            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Database</th>
                                <th style="width: 30%">As (Schema)</th>
                                <th style="width: 100px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="aux in form.databases"
                                :key="aux.as">
                                <td>{{ aux.path }}</td>
                                <td>{{ aux.schema }}</td>
                                <td>
                                    <button class="delete is-medium is-pulled-right"
                                        @click.prevent="removeDatabase(aux.schema)">
                                    </button>
                                </td>
                            </tr>
                            <tr v-show="form.databases.length === 0">
                                <td colspan="3">No databases attached.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column is-4 is-offset-2">
                <label class="checkbox">
                    <input type="checkbox"
                    v-model="goToMigrationsAfterConnect">
                    Go to Migrations after Connect
                </label>
            </div>
            <div class="column is-4">
                <button class="button is-primary is-medium is-pulled-right"
                    :class="{'is-loading': database.isConnecting}"
                    @click.prevent="makeConnection">Connect</button>
            </div>
        </div>

        <notification :message="notification.message"
            :isVisible="notification.isVisible"
            :modifier="notification.modifier"
            @close="notification.isVisible = false"
        ></notification>
    </div>
</template>

<script>
import { mapMutations/* , mapGetters */, mapActions } from 'vuex'
import Notification from 'components/main/Notification'
import settings from 'electron-settings'
import { remote } from 'electron'
import { SQLITE } from 'database/driver'
import { connect, disconnect } from 'database/sqlite'

const dialog = remote.dialog

export default {
    name: 'sqlite-form',
    components: {
        Notification
    },
    data () {
        return {
            form: {
                path: '',
                databases: []
            },
            dbForm: {
                path: '',
                schema: ''
            },
            database: {
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
        this.setDefaultConnectionParams(settings.get('connection.params'))
        this.goToMigrationsAfterConnect = settings.get('preferences.goToMigrationsAfterConnect', true)
        this.setDatabaseDriver(SQLITE)
    },
    methods: {
        chooseFile (cb) {
            dialog.showOpenDialog({
                title: 'Choose SQLite Database...',
                properties: ['openFile'],
                filters: [
                    {name: 'SQLite databases', extensions: ['sqlite', 'sqlite3', 'db']},
                    {name: 'All Files', extensions: ['*']}
                ]
            }, cb)
        },
        chooseMainDb () {
            this.chooseFile((filenames) => {
                if (filenames) {
                    this.form.path = filenames[0]
                }
            })
        },
        chooseAuxDb () {
            this.chooseFile((filenames) => {
                if (filenames) {
                    this.dbForm.path = filenames[0]
                }
            })
        },
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
                    this.setConnectionStatus('is_connecting')
                    this.database.isConnecting = true
                    return connect(this.form)
                })
                .then((connection) => {
                    this.setConnectionStatus(connection.isConnected ? 'connected' : 'disconnected')
                    const result = connection.instance.prepare('select sqlite_version() as version;').get()
                    console.log('version', result.version)
                    this.setDatabaseVersion(result.version)
                    this.database.isConnecting = false
                    this.notification.isVisible = false
                    if (this.goToMigrationsAfterConnect) {
                        this.$router.push({name: 'migrations'})
                    }
                })
                .catch((err) => {
                    this.showErrorMessage(err)
                    this.database.isConnecting = false
                })
        },
        addDatabase () {
            const path = this.dbForm.path.trim()
            const schema = this.dbForm.schema.trim()
            if (path && schema) {
                this.form.databases.push({
                    path,
                    schema
                })
                this.dbForm.path = ''
                this.dbForm.schema = ''
            }
        },
        removeDatabase (schema) {
            this.form.databases = this.form.databases.filter(db => {
                return db.schema !== schema
            })
        },
        showErrorMessage (err) {
            this.notification.message = `${err.severity} - ${err.message} [${err.code}]`
            this.notification.isVisible = true
            this.notification.modifier = 'is-danger'
        },
        setDefaultConnectionParams (values) {
            this.form = values
        }
    }
}
</script>

<style scoped>
.attach-database {
    background-color: whitesmoke;
    margin-bottom: 16px;
}
</style>
