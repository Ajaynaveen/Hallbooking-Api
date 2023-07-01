const http=require('http');

const app=http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'text/plain'})
    response.end('hello world')
})
const port=3000;
app.listen(port)
console.log("server is running")