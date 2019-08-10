const fs = require("fs");
const path = require("path");
const basePath = './docs/'

/**
 * @description: 根据文件列表添单, 生成sidebar children项
 * @param {Array} files , 读取到文件名列表
 * @returns {Array}
 */
function genSidebarChildren (files) {
  let arr = []
  files.forEach(file => {
    if(file === 'en') {
      return 
    }
    let fileName = file.replace('.md', '')
    if(fileName !== 'README') {
      arr.push(fileName)
    }
  });
  return arr
}
/**
 * @description: 将以splitStr为分割符的字符串首字母大写, 如: hello-world => HelloWorld
 * @param {String} str 
 * @param {String} splitStr 
 * @returns {String}
 */
function stringCapitalize(str, splitStr = '-') {
  var arr = str.split(splitStr)
  arr.forEach((item, index) => {
      if(item.length > 0) {
          var newItem = item[0].toUpperCase() + item.substr(1, )
          arr[index] = newItem
      }
  })
  return arr.join('')
}

const fileNameMaps = {
  css: 'CSS',
  html: 'HTML',
  js: 'JavaScript',
  nodejs: 'Node.js',
  web: 'Web Page',
  trainer: '讲师角色认知'
}
let sidebar = {}

/**
 * @description: 更新sidebar
 */
function updateSlideBar() {
  fs.readdir(basePath, (err, files) => {
    if(err) {
      console.log(err)
      return console.error(err)
    }
    files.forEach(fileName => {
      let navNotsShow = ['.vuepress', 'README.md', 'static']
      if(navNotsShow.indexOf(fileName) !== -1) {
        return 
      }
      fs.readdir(`${basePath}${fileName}`, (err, files) => {
        if(err) {
          return console.error(err)
        }
        let title = fileNameMaps[fileName] ? fileNameMaps[fileName]: stringCapitalize(fileName)
        sidebar[`/${fileName}/`] = [
          {
            title: title,
            collapsable: true,
            children: genSidebarChildren(files).sort()
          }
        ]
      })
    });
  })
}

updateSlideBar()

module.exports = {
  title: 'Web Developer',  // 设置网站标题
  description : 'Web developer',
  base : '/coding/',
  serviceWorker: true,
  head: [
    ['link', { rel: 'shortcut icon', type: "icon", href: `/coding/images/logo/my.jpg` }]
  ],
  themeConfig : {
    logo: '/images/logo/my.jpg',
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
              text: 'TypeScript',
              link: '/typescript/'
            },
            {
              text: 'Vue',
              link: '/vue/'
            },
            {
              text: 'Node.js',
              link: '/nodejs/'
            },
            {
              text: 'Web',
              link: '/web/'
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
          text: 'BusinessManagement', 
          link: '/',
          items: [
            {
              text: '讲师',
              link: '/trainer/'
            }
          ]
        },
        {
          text: 'Github',
          link: 'https://github.com/hijameszhang/coding'
        }
    ],
    sidebar: sidebar,
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