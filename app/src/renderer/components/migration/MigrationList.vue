<template lang="html">
    <div class="container">
        <div class="columns has-margin-top">
            <div class="column">
                <h3 class="title is-3">Migrations</h3>

            </div>
            <div class="column">
                <button class="button is-primary is-medium is-pulled-right"
                    :disabled="disabled"
                    :class="{'is-loading': isMigrating}"
                    @click.prevent="migrate">
                    Migrate
                </button>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <span v-show="migrations.length > 0">
                    Total Migrations found: {{ migrations.length }}
                </span>
            </div>
            <div class="column">
                <div class="is-pulled-right">
                    Elapsed time: {{ elapsed }}s
                </div>
            </div>
        </div>

        <notification :message="notification.message"
            :isVisible="notification.isVisible"
            :modifier="notification.modifier"
            @close="notification.isVisible = false"
        ></notification>

        <table class="table table is-striped">
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Checksum</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list">
                    <td><strong>{{ item.level }}</strong></td>
                    <td>{{ item.comment }}</td>
                    <td :title="item.timestamp">
                        {{ item.timestamp | fromNow }}
                    </td>
                    <td>{{ item.checksum }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import marv from 'marv'
import driver from 'marv-pg-driver'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Notification from 'components/main/Notification'
import { EventBus } from 'renderer/event-bus'
import { connect } from 'renderer/database'
import hirestime from 'hirestime'

export default {
    name: 'migration-list',
    components: {
        Notification
    },
    data () {
        return {
            list: [],
            notification: {
                isVisible: false,
                message: '',
                modifier: ''
            },
            migrations: [],
            isMigrating: false,
            elapsed: 0
        }
    },
    mounted () {
        this.renderList()

        EventBus.$on('scan-migrations-folder', this.scan)
        if (this.getMigrationsFolder) {
            this.scan()
        }
    },
    methods: {
        renderList () {
            connect(this.getConnectionParams)
                .then(this.fetchList)
                .catch((err) => {
                    if (err) {
                        this.showErrorMessage(err)
                    }
                })
        },
        fetchList (connection) {
            const sql = `SELECT level, comment, "timestamp", checksum
                FROM migrations ORDER BY level DESC LIMIT 50`
            connection.instance.query(sql, (err, result) => {
                if (err) {
                    return this.showErrorMessage(err)
                }
                this.list = result.rows
            })
        },
        scan () {
            this.elapsed = 0
            marv.scan(this.getMigrationsFolder, (err, migrations) => {
                if (err) {
                    this.showErrorMessage(err)
                }
                this.migrations = migrations || []
            })
        },
        migrate () {
            const getElapsed = hirestime()
            this.isMigrating = true
            const options = {
                connection: this.getConnectionParams
            }
            marv.migrate(this.migrations, driver(options), (err) => {
                this.elapsed = getElapsed(hirestime.S)
                this.isMigrating = false
                if (err) {
                    return this.showErrorMessage(err)
                }
                this.showSuccessMessage('Database migration done with success.')
                this.renderList()
            })
        },
        showErrorMessage (err) {
            if (err.severity) {
                this.notification.message = `${err.severity} - ${err.message} [${err.code}]`
                if (err.migration) {
                    this.notification.message += `<br><br>Error on migration: ${err.migration.comment} [LEVEL ${err.migration.level}]`
                }
            } else {
                this.notification.message = `${err.message}`
            }
            this.notification.isVisible = true
            this.notification.modifier = 'is-danger'
        },
        showSuccessMessage (message) {
            this.notification.message = message
            this.notification.isVisible = true
            this.notification.modifier = 'is-success'
        }
    },
    computed: {
        ...mapGetters([
            'getMigrationsFolder',
            'getConnectionParams'
        ]),
        disabled () {
            return this.getMigrationsFolder === ''
        }
    },
    filters: {
        fromNow (value) {
            return distanceInWordsToNow(value)
        }
    },
    beforeDestroy () {
        EventBus.$off('scan-migrations-folder')
    }
}
</script>

<style lang="css">
</style>
