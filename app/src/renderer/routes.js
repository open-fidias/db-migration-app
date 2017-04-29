export default [
    {
        path: '/',
        name: 'home-page',
        component: require('pages/HomePage')
    },
    {
        path: '/connection',
        name: 'connection',
        component: require('components/connection/ConnectionContent')
    },
    {
        path: '/migrations',
        name: 'migrations',
        component: require('components/migration/MigrationContent')
    },
    {
        path: '*',
        redirect: '/'
    }
]
