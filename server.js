var express=require('express');
var app=express();

var MongoClient = require('mongodb').MongoClient;

var path = require('path');
var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: 'zAwX6KcupBbOakmZ9d3n9KR4g',
    consumer_secret: 'TI9YuM2AohFqD0uS7WYTpoUGeLCsDmS9Bs9jOMnuFoQNEgGBA8',
    token: '237825440-Tp3vt6Un4uVDUtxwAapRGpXx8TWvGhLpmljVVJMn',
    token_secret: 'DLvnEiSQRzaXDCgVsNSChrx0mjF2HIZEDQ064zIyOJqma'
  });

t.on('tweet', function (tweet) {
  //console.log('tweet received', tweet)
  MongoClient.connect('mongodb://localhost:27017/dairyanalytics', function(err, db) {

  	db.collection('tweets').insert(tweet, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted" );

        //return db.close();
    });
});





  	// db.collection('tweets').findAndModify({
   //      query: {'id': 'tweet.id'},
   //      update: { $set: tweet},
   //      upsert: true,
   //      new: true
   //  })


  });


t.on('error', function (err) {
  console.log('Oh no')
})
 
t.track('dairy industry')
t.track('cattle farm')
 
// 5 minutes later
t.track('dairy farm')
t.track('cattle industry')
 
// 10 minutes later
//t.untrack('dairy farming')

require('./router/main')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'views'))); 


// app.get('/',function(req,res){
// res.send("hello world");
// });
var server=app.listen(3000,function(){
	console.log("We have started our server on port 3000");
});


