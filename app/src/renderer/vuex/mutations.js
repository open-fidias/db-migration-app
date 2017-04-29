
export default {
    setMigrationsFolder (state, folder) {
        state.migrations.folder = folder
    },
    setConnectionStatus (state, isConnected) {
        state.connection.isConnected = isConnected
    },
    setConnectionParams (state, params) {
        state.connection.params = params
    }
}
