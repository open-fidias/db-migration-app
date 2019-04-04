<template>
    <tbody>
        <slot :list="list"></slot>
    </tbody>
</template>

<script>
import { mapGetters } from 'vuex'
import { connect } from 'database/sqlite'

export default {
    name: 'sqlite-list',
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
            try {
                const rows = connection.instance.prepare(sql).all()
                this.list = rows.map(item => {
                    return {
                        ...item,
                        timestamp: new Date(item.timestamp)
                    }
                })
            } catch (err) {
                this.$emit('error', err)
            }
        }
    },
    computed: {
        ...mapGetters([
            'getConnectionParams'
        ])
    }
}
</script>

