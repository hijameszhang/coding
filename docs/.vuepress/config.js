var fs = require("fs");
var path = require("path");

var excluded = ['.vuepress']

module.exports = {
  title: 'Web Developer',  // 设置网站标题
  description : 'Web developer',
  base : '/coding/',
  themeConfig : {
    header: {
      background: {
        // url: '/assets/img/bg.jpg',
        useGeo: true,
      },
      showTitle: true,
    },

    lastUpdated: true,

    nav : [
        { 
          text: 'Web', 
          link: '/css/',
          items: [
            {
              text: 'CSS',
              link: '/css/'
            },
            {
              text: 'HTML',
              link: '/html/'
            },
            {
              text: 'JavaScript',
              link: '/js/'
            },
            {
              text: 'Vue',
              link: '/vue/'
            }
          ]
        },
        { 
          text: 'Tools', 
          link: '/',
          items: [
            {
              text: 'Git',
              link: '/git/'
            }
          ]
        },
        {
          text: 'Github',
          link: 'https://github.com/hijameszhang/coding'
        }
    ],
    sidebar: {
      '/css/': [
        {
          title: 'CSS',
          collapsable: true,
          children: [
            '',
            'basis',
            'layout'
          ]
        }
      ],
      '/html/': [
        {
          title: 'HTML',
          collapsable: true,
          children: [
            '',
            'demo'
          ]
        }
      ],
      '/js/': [
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            '',
            'ifElseRefactor'
          ]
        }
      ],
      '/vue/': [
        {
          title: 'Vue',
          collapsable: true,
          children: [
            '',
            'vuepressToGithub'
          ]
        }
      ],
      '/git/': [
        {
          title: 'Git',
          collapsable: true,
          children: [
            '',
            'github',
            'gitCommit'
          ]
        }
      ]
    },
    sidebarDepth : 6
  },

  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    config: md => {
      // 使用更多 markdown-it 插件！
      md.use(require('markdown-it-toc'))
    }
  }
}