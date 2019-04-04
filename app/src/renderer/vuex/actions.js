
import settings from 'electron-settings'

const NOT_ALLOWED = ['password']
const filterParams = (params) => {
    return Object.keys(params)
        .filter(key => !NOT_ALLOWED.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: params[key]
            }
        }, {})
}

export default {
    setMigrationsFolder ({ commit }, folder) {
        settings.set('migrations.folder', folder)
        commit('setMigrationsFolder', folder)
    },
    setConnectionParams ({ commit }, params) {
        settings.set('connection.params', filterParams(params))
        commit('setConnectionParams', params)
    },
    setDatabaseDriver ({ commit }, driver) {
        settings.set('database.driver', driver)
        commit('SET_DATABASE_DRIVER', driver)
    }
}
