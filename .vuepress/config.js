module.exports = {
  title: '🌸 Hanami Cookbook',
  description: 'Recipes for real Hanami projects',
  themeConfig: {
    serviceWorker: {
      updatePopup: true,
    },
    sidebar: [
      '/pages/getting-started',
      '/pages/docker',
      '/pages/dependencies',
      {
        title: 'Entity / Repository',
        collapsable: false,
        children: [
          '/pages/entity-repo/entity',
          '/pages/entity-repo/pagination',
          '/pages/entity-repo/soft_delete',
          '/pages/entity-repo/enum',
          '/pages/entity-repo/rom',
          '/pages/entity-repo/sequel',
        ]
      },
      {
        title: 'Databases',
        collapsable: false,
        children: [
          '/pages/databases/sequel',
          '/pages/databases/cassandra',
          '/pages/databases/janusgraph',
          '/pages/databases/influxdb',
        ]
      },
      {
        title: 'Business logic',
        collapsable: false,
        children: [
          '/pages/business-logic/overview',
          '/pages/business-logic/interactors',
          '/pages/business-logic/trailblazer'
        ]
      },
      {
        title: 'Building APIs',
        collapsable: false,
        children: [
          '/pages/api/rest.md',
          '/pages/api/graphql.md'
        ]
      },
      {
        title: 'Access Control',
        collapsable: false,
        children: [
          '/pages/access-control/authentication.md',
          '/pages/access-control/authorization.md'
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
      '/pages/webpack',
      '/pages/websockets',
      '/pages/cache',
      '/pages/mailing',
      '/pages/misconceptions'
    ],
    nav: [
      { text: 'About', link: '/pages/about' },
      { text: 'Hanami', link: 'http://hanamirb.org/' },
      { text: 'Guides', link: 'https://guides.hanamirb.org/' },
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
  },
  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-120541194-1'
    }],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
      headerTopOffset: 120
    }],
    ['@vuepress/back-to-top']
  ]
}
