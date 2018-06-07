module.exports = {
  title: '🌸 iJackUA\'s Hanami Cookbook',
  description: 'Receipts from real projects',
  themeConfig: {
    sidebar: [
      '/',
      '/pages/nested-entity',
      {
        title: 'DB',
        collapsable: false,
        children: [
          '/pages/db/pagination',
          '/pages/db/rom',
          '/pages/db/entity',
        ]
      },

      // '/repository',
      // '/second',
      // '/misconceptions',
      // '/orm-pagination',
      '/pages/sidekiq'
    ],
    nav: [
      { text: 'Hanami', link: 'http://hanamirb.org/' },
      {
        text: 'Languages',
        items: [
          { text: 'English', link: '/' },
          { text: 'Ukrainian', link: '/uk-UA' }
        ]
      }
    ],
    lastUpdated: 'Last Updated',
    repo: 'iJackUA/hanami-cookbook',
    editLinks: true,
    editLinkText: 'Help us improve this receipt!',
    algolia: {
      apiKey: 'e2af62df119e15ab1ca2a432805d43c1',
      indexName: 'hanami_cookbook'
    }
  }
}
