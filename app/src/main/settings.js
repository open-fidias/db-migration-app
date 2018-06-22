import settings from 'electron-settings'

if (! settings.has('connection')) {
    settings.set('connection', {
        params: {
            driver: 'postgresql',
            host: 'localhost',
            port: 5432,
            database: 'postgres',
            user: 'postgres'
        }
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
