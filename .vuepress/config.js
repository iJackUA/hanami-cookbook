module.exports = {
  title: '🌸 iJackUA\'s Hanami Cookbook',
  description: 'Receipts from real Hanami projects',
  themeConfig: {
    sidebar: [
      '/',
      '/pages/intro',
      {
        title: 'DB',
        collapsable: false,
        children: [
          '/pages/db/entity',
          '/pages/db/pagination',
          '/pages/db/rom',
          '/pages/db/sequel',
        ]
      },
      '/pages/dependencies',
      '/pages/cache',
      '/pages/sidekiq',
      '/pages/misconceptions'
    ],
    nav: [
      { text: 'About', link: 'about' },
      { text: 'Hanami', link: 'http://hanamirb.org/' },
      // {
      //   text: 'Languages',
      //   items: [
      //     { text: 'English', link: '/' },
      //     { text: 'Ukrainian', link: '/uk-UA' }
      //   ]
      // }
    ],
    lastUpdated: 'Last Updated',
    repo: 'iJackUA/hanami-cookbook',
    editLinks: true,
    editLinkText: 'Edit this page (help us to improve it!)',
    ga: 'UA-120541194-1',
    algolia: {
      apiKey: 'd83390aab06391dde571b6e39e12d507',
      indexName: 'hanami',
      autocompleteOptions: {
        // See https://github.com/algolia/autocomplete.js#options
        openOnFocus: true,
        debug: false
      },
      algoliaOptions: {
        hitsPerPage: 10
      }
    }
  }
}
