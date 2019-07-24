const productTitle = 'Konvoy'

module.exports = {
  title: productTitle,
  description: 'Connect, Secure and Observe any traffic and Microservices',
  host: 'localhost',
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), {
        root: __dirname
      })
    }
  },
  plugins: {
    '@vuepress/back-to-top': {},
    'clean-urls': {
      normalSuffix: '/',
      indexSuffix: '/'
    }
  },
  themeConfig: {
    repo: 'kong/konvoy',
    logo: '/konvoy-logo.svg',
    footer: `${productTitle} by Kong`,
    docsDir: 'docs',
    editLinks: true,
    search: true,
    searchMaxSuggestions: 10,
    algolia: {
      apiKey: '',
      indexName: ''
    },
    sidebar: 'auto',
    displayAllHeaders: false,
    nav: [
      { name: 'documentation', text: 'Documentation', link: '/docs/' },
      { name: 'usecases', text: 'Use Cases', link: '/use-cases/' },
      { name: 'enterprise', text: 'Enterprise', link: '/enterprise/' },
      { name: 'install', text: 'Install', link: '/install/' }
    ]
  },
  head: [
    [
      'link',
      {
        // TODO change this to a Konvoy-specific one (or move this locally?)
        rel: 'icon',
        href:
          'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,500,700'
      }
    ]
  ],
  postcss: {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer')
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule
      .oneOf('external')
      .resourceQuery(/external/)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: 'public/[name].[hash:7].[ext]'
      })
      .end()
      .end()
      .oneOf('normal')
      .use('raw')
      .loader('raw-loader')
      .end()
      .end();
  }
};
