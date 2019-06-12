var fs = require("fs");
var path = require("path");

var excluded = ['.vuepress']

module.exports = {
  title: 'Web Developer',  // 设置网站标题
  description : 'Web developer[james zhang]',
  base : '/',
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
          text: 'CSS', 
          link: '/css/',
          // items: [
          //   {
          //     text: 'CSS基础',
          //     link: '/css/'
          //   },
          //   {
          //     text: 'CSS进阶',
          //     link: '/css/profess/'
          //   },
          //   {
          //     text: 'Hello',
          //     link: '/demo/'
          //   }
          // ]
        },
        { text: 'HTML', link: '/html/' },
        { text: 'JavaScript', link: '/js/' }
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