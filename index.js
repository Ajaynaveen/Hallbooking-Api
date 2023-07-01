const http=require('http');
const notes=[{
    id:1,title:'note 1',content:"this note has some content"
},{
    id:2, title:'note 2', content:"another interesting thing to say about this"
},{
    id:3, title:'note 3', content:"yet another one here!"
}]
const app=http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'application.json'})
    response.end(JSON.stringify(notes))
})
const port=3000;
app.listen(port)
console.log("server is running")