import settings from 'electron-settings'
import { POSTGRESQL } from '../renderer/database/driver'

if (! settings.has('connection')) {
    settings.set('connection', {
        params: {
            host: 'localhost',
            port: 5432,
            database: 'postgres',
            user: 'postgres'
        }
    })
}

if (!settings.has('database')) {
    settings.set('database', {
        driver: POSTGRESQL
    })
}

if (! settings.has('migrations')) {
    settings.set('migrations', {
        folder: ''
    })
}

if (! settings.has('preferences')) {
    settings.set('preferences', {
        goToMigrationsAfterConnect: true
    })
}

console.log('Settings file:', settings.file())
