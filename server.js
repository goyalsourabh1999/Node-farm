var http=require('http');
var fs=require('fs')
var url=require('url');
var json=fs.readFileSync('./data.json');
pjson=JSON.parse(json);
var product=fs.readFileSync('./product.html')
product+=""
// console.log(product);
// var reader=stream.createReadStream("data.json");
//replace 

var server=http.createServer(function(req,res){
    var newurl=url.parse(req.url,true);
    // console.log(newurl)
     var id =newurl.query.id
     console.log(id)
    var path=newurl.pathname
    console.log(path)
  if(path=="/home"||path=="/"||path=="")
  {
      res.write("HOme Page")
  }
  else if(path==`/product`)
  {  
    //   console.log(json+"");
    
      var item=pjson[id];
      var myfile=replace(item,product)
      res.write(myfile);
  }
  else if(path=="/api"){
    //   console.log(json)
    
      res.write(json);
  }
  else{
      res.write("error page 404 page not found");
  }
  res.end();
});
server.listen(2000,function()
{
    console.log("server created ")
})
function replace(Item,productfile){
    var myfile=productfile.replace(/{%productName%}/g,Item["productName"])
      myfile=myfile.replace(/{%image%}/g,Item["image"])
      myfile=myfile.replace(/{%from%}/g,Item["from"])
     myfile= myfile.replace(/{%nutrients%}/g,Item["nutrients"])
     myfile= myfile.replace(/{%quantity%}/g,Item["quantity"])
     myfile= myfile.replace(/{%price%}/g,Item["price"])
     myfile= myfile.replace(/{%description%}/g,Item["description"])
     return myfile;
}