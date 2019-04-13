module.exports = {
    base: '/db-migration-app/',
    title: 'DB Migration App',
    description: 'Desktop app to migrate databases',
    themeConfig: {
        repo: 'open-fidias/db-migration-app',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: true,
        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Building', link: '/building/' }
        ]
    },
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.png' }],
    ]
}
