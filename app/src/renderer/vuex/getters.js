
const connection = {
    status: {
        disconnected: 'Disconnect',
        is_connecting: 'Is connecting...',
        connected: 'Connected'
    },
    style: {
        disconnected: 'is-danger',
        is_connecting: 'is-info',
        connected: 'is-success'
    }
}

export default {
    getMigrationsFolder (state) {
        return state.migrations.folder
    },
    isConnected (state) {
        return state.connection.status === 'connected'
    },
    getConnectionParams (state) {
        return state.connection.params
    },
    connectionStatus (state) {
        return connection.status[state.connection.status]
    },
    connectionStatusStyle (state) {
        return connection.style[state.connection.status]
    },
    postgresqlVersion (state) {
        return state.postgresql.version
    }
}
