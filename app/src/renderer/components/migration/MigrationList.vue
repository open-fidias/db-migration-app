<template lang="html">
    <div class="container">
        <div class="columns has-margin-top">
            <div class="column">
                <h3 class="title is-3">Migrations</h3>
            </div>
            <div class="column">
                <button class="button is-primary is-pulled-right"
                    :disabled="disabled">
                    Migrate
                </button>
            </div>
        </div>

        <notification :message="notification.message"
            :isVisible="notification.isVisible"
            :modifier="notification.modifier"
            @close="notification.isVisible = false"
        ></notification>

        <table class="table table is-striped has-margin-top">
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
import { connect } from '../../database.js'
import { mapGetters } from 'vuex'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Notification from 'components/main/Notification'

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
            }
        }
    },
    mounted () {
        connect(this.getConnectionParams)
            .then(this.fetchList)
            .catch((err) => {
                if (err) {
                    this.showErrorMessage(err)
                }
            })
    },
    methods: {
        fetchList (connection) {
            const sql = 'SELECT level, comment, "timestamp", checksum FROM migrations ORDER BY "timestamp" DESC LIMIT 50'
            connection.instance.query(sql, (err, result) => {
                if (err) {
                    return this.showErrorMessage(err)
                }
                this.list = result.rows
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
        ]),
        disabled () {
            return this.getMigrationsFolder === ''
        }
    },
    filters: {
        fromNow (value) {
            return distanceInWordsToNow(value)
        }
    }
}
</script>

<style lang="css">
</style>
