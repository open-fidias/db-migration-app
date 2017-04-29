
export default {
    getMigrationsFolder (state) {
        return state.migrations.folder
    },
    isConnected (state) {
        return state.connection.isConnected
    },
    getConnectionParams (state) {
        return state.connection.params
    }
}
