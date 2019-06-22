const http = require('http') 
const fs = require('fs') 

const server = http.createServer((req, res) => { 
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  if(req.url === '/'){
      let logfile = fs.createWriteStream('./log.txt') 
      logfile.write(`请求方法：${req.method} \r\n`)
      logfile.write(`请求url：${req.url} \r\n`)
      logfile.write(`请求头对象：${JSON.stringify(req.headers, null, 4)} \r\n`)
      logfile.write(`请求http版本：${req.httpVersion} \r\n`)      
  }
  res.end('Hello World\r\n')
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3000')
})