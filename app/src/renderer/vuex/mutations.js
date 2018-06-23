
export default {
    setMigrationsFolder (state, folder) {
        state.migrations.folder = folder
    },
    setConnectionStatus (state, status) {
        state.connection.status = status
    },
    setConnectionParams (state, params) {
        state.connection.params = params
    },
    setPostgresqlVersion (state, version) {
        state.postgresql.version = version
    }
}
