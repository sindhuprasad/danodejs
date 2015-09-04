var MongoClient = require('mongodb').MongoClient;

module.exports=function(app)
{
app.get('/',function(req,res){
res.render('index.html')
});
app.get('/about',function(req,res){
res.render('about.html');
});


app.get('/words',function(req,res){
	//res.json({ 'msgId': 'msg.fileName' })

	MongoClient.connect("mongodb://localhost:27017/dairyanalytics", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
   var query = {'value' : { '$gt' : 3} };

   //var operator = {$rename:{"_id":"text", "value":"size"}};

   //var options = {"multi":true};


  // db.foo.update({}, {$rename:{"name.additional":"name.last"}}, false, true);


      db.collection('mroutput').find(query).toArray(
    	function(err, docs) {
        if(err) throw err;
        console.dir(docs);
        console.log("Prinitng somthing string");

        var jsonString = JSON.stringify(docs);
        console.log(jsonString);

        console.log("replacing");

       

        //jsonString = jsonString.replaceAll("\"_id\":", "\"text\":");

        jsonString = replaceAll(jsonString, "_id", "text");
        jsonString = replaceAll(jsonString, "value", "size");

         function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        console.log(jsonString);
        // docs = docs.replace("\"_id\":", "\"text\":");
        // console.log(docs);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
       // res.json({ 'resp': docs });
       // res.json({ 'resp': jsonString });
        res.json(JSON.parse(jsonString));

        db.close();
    	}
    );


  } );


});


}