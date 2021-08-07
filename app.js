const express=require("express");
const ejs = require("ejs");
const app=express();
const https = require('https');
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.get("/",function(req,res){
//res.send("server working");
res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){

  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=bc7ebe77692ae447a75eca84e5fb7512&units=metric";
    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
       const stockData = JSON.parse(data);
       //console.log(stockData);
       const temp=stockData.main.temp;
       const speed=stockData.wind.speed;
       const des=stockData.weather[0].description;
       const icon=stockData.weather[0].icon;
       const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
       // res.write("<h1>the temperture is "+temp+"degree celcius in "+query+"</h1>");
       // res.write("the speed is "+speed+"degree celcius");
       // res.write("<img src="+imageURL+">");
       // res.send();
       res.render("info",{
         temp:temp,
         speed:speed,
         des:des,
         icon:icon,
         imageURL:imageURL,
         query:query
       })
     });
    });
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server started on port 3000");
});
