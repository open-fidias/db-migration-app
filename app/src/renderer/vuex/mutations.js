
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
    setDatabaseVersion (state, version) {
        state.database.version = version
    },
    SET_DATABASE_DRIVER (state, driver) {
        state.database.driver = driver
    }
}
