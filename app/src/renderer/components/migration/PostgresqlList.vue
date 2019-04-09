<template>
    <tbody>
        <slot :list="list"></slot>
    </tbody>
</template>

<script>
import { mapGetters } from 'vuex'
import { connect } from 'database/postgresql'

export default {
    name: 'postgresql-list',
    data () {
        return {
            list: []
        }
    },
    mounted () {
        this.renderList()
    },
    methods: {
        renderList () {
            connect(this.getConnectionParams)
                .then(this.fetchList)
                .catch((err) => {
                    if (err) {
                        this.$emit('error', err)
                    }
                })
        },
        fetchList (connection) {
            const sql = `SELECT level, comment, "timestamp", checksum
                FROM migrations ORDER BY level DESC LIMIT 50`
            connection.instance.query(sql, (err, result) => {
                if (err) {
                    this.$emit('error', err)
                    return
                }
                this.list = result.rows
            })
        }
    },
    computed: {
        ...mapGetters([
            'getConnectionParams'
        ])
    }
}
</script>

