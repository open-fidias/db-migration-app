<template>
    <tbody>
        <slot :list="list"></slot>
    </tbody>
</template>

<script>
import { mapGetters } from 'vuex'
import { connect, disconnect } from 'database/sqlite'

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
                .then(disconnect)
                .catch((err) => {
                    if (err) {
                        this.$emit('error', err)
                    }
                })
        },
        fetchList (connection) {
            return new Promise((resolve, reject) => {
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
                    return resolve()
                } catch (err) {
                    return reject(err)
                }
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

