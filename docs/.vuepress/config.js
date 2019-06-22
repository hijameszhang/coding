var fs = require("fs");
var path = require("path");

var excluded = ['.vuepress']
function getFileNameList(name){
  var pathName = path.resolve(__dirname, "..", name)

  files = fs.readdirSync(pathName)
  var res = ['']
  files.forEach(element => {
    if(element !== 'README.md') {
      var t = element.replace(/\.md/gi, '')
      res.push(t)
    }
  });
  return res.sort()
}
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
            },
            {
              text: 'Node.js',
              link: '/nodejs/'
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
          children: getFileNameList('css')
        }
      ],
      '/html/': [
        {
          title: 'HTML',
          collapsable: true,
          children: getFileNameList('html')
        }
      ],
      '/js/': [
        {
          title: 'JavaScript',
          collapsable: true,
          children: getFileNameList('js')
        }
      ],
      '/vue/': [
        {
          title: 'Vue',
          collapsable: true,
          children: getFileNameList('vue')
        }
      ],
      '/git/': [
        {
          title: 'Git',
          collapsable: true,
          children: getFileNameList('git')
        },
      ],
      '/nodejs/': [
        {
          title: 'Node.js',
          collapsable: true,
          children: getFileNameList('nodejs')
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