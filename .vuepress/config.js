module.exports = {
  title: 'iJackUA\'s 🌸 Hanami Cookbook',
  description: 'Receipts for real Hanami projects',
  ga: 'UA-120541194-1',
  themeConfig: {
    serviceWorker: {
      updatePopup: true,
    },
    sidebar: [
      '/',
      '/pages/intro',
      '/pages/docker',
      {
        title: 'DB',
        collapsable: false,
        children: [
          '/pages/db/entity',
          '/pages/db/pagination',
          '/pages/db/soft_delete',
          '/pages/db/enum',
          '/pages/db/rom',
          '/pages/db/sequel',
        ]
      },
      {
        title: 'Background processing',
        collapsable: false,
        children: [
          '/pages/background-processing/sidekiq',
          '/pages/background-processing/rabbitmq',
        ]
      },
      '/pages/dependencies',
      '/pages/cache',
      '/pages/mailing',
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
  },
  markdown: {
    lineNumbers: true
  }
}
