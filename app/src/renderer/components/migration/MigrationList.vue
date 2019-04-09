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
                <span v-if="migrations.length === 0">
                    No migrations files
                </span>
                <span v-else-if="migrations.length === 1">
                    <strong>One</strong> migration file
                </span>
                <span v-else="migrations.length > 1">
                    <strong>{{ migrations.length }}</strong> migrations files
                </span>
                found in folder.
            </div>
            <div class="column">
                <div class="is-pulled-right">
                    Elapsed time: <strong>{{ elapsed }}s</strong>
                </div>
            </div>
        </div>

        <notification :message="notification.message"
            :isVisible="notification.isVisible"
            :modifier="notification.modifier"
            :stack="notification.stack"
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
            <component
                v-if="databaseDriver"
                :is="driverListComponent"
                :key="driverKey"
                @error="showErrorMessage">
                <template slot-scope="{ list }">
                    <tr v-for="item in list">
                        <td><strong>{{ item.level }}</strong></td>
                        <td>{{ item.comment }}</td>
                        <td :title="item.timestamp">
                            {{ item.timestamp | fromNow }}
                        </td>
                        <td>{{ item.checksum }}</td>
                    </tr>
                </template>
            </component>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import marv from 'marv'
import postgresqlDriver from 'marv-pg-driver'
import sqliteDriver from '@open-fidias/marv-better-sqlite3-driver'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Notification from 'components/main/Notification'
import { EventBus } from 'renderer/event-bus'
import hirestime from 'hirestime'
import PostgresqlList from 'components/migration/PostgresqlList'
import SqliteList from 'components/migration/SqliteList'
import { POSTGRESQL, SQLITE } from 'database/driver'

export default {
    name: 'migration-list',
    components: {
        Notification,
        PostgresqlList,
        SqliteList
    },
    data () {
        return {
            driverKey: 0, // trigger re-render
            notification: {
                isVisible: false,
                message: '',
                modifier: '',
                stack: ''
            },
            migrations: [],
            isMigrating: false,
            elapsed: 0
        }
    },
    mounted () {
        EventBus.$on('scan-migrations-folder', this.scan)
        if (this.getMigrationsFolder) {
            this.scan()
        }
    },
    methods: {
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
            this.notification.isVisible = false
            const getElapsed = hirestime()
            this.isMigrating = true
            const options = {
                connection: this.getConnectionParams
            }
            marv.migrate(this.migrations, this.currentDriver(options), (err) => {
                this.elapsed = getElapsed(hirestime.S)
                this.isMigrating = false
                if (err) {
                    console.log(err)
                    return this.showErrorMessage(err)
                }
                this.showSuccessMessage('Database migration done with success.')
                this.driverKey++
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
            this.notification.stack = `${err.stack}`
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
            'getConnectionParams',
            'databaseDriver'
        ]),
        disabled () {
            return this.getMigrationsFolder === ''
        },
        driverListComponent () {
            return `${this.databaseDriver}-list`
        },
        currentDriver () {
            switch (this.databaseDriver) {
            case POSTGRESQL:
                return postgresqlDriver
            case SQLITE:
                return sqliteDriver
            default:
                break
            }
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
