import { POSTGRESQL, SQLITE } from 'database/driver'

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
    databaseVersion (state) {
        return state.database.version
    },
    databaseName (state) {
        const { driver } = state.database
        switch (driver) {
        case POSTGRESQL:
            return 'PostgreSQL'
        case SQLITE:
            return 'SQLite'
        default:
            return 'Unknow'
        }
    },
    databaseDriver (state) {
        return state.database.driver
    }
}
