
import settings from 'electron-settings'

export default {
    setMigrationsFolder ({ commit }, folder) {
        settings.set('migrations.folder', folder)
        commit('setMigrationsFolder', folder)
    },
    setConnectionParams ({ commit }, params) {
        const aux = {
            driver: params.driver,
            host: params.host,
            port: params.port,
            database: params.database,
            user: params.user
        }
        settings.set('connection.params', aux)
        aux.password = params.password
        commit('setConnectionParams', aux)
    }
}
