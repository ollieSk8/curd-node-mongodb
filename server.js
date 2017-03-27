var express = require('express');
var path = require('path');
var app = express();
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/quotes';
var db;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.get('/',(req, res) => {
    var cursor = db.collection('quotes').find().toArray(function(err, results) {
        // send HTML file populated with quotes here
        res.render('index',{quotes: results});
    });

});
//添加
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        //console.log('saved to database')
        res.redirect('/')
    })
});
//删除
app.post('/delete', (req, res) => {
    db.collection('quotes').findOneAndDelete(req.body,(err,result) => {
        if (err){
            res.send(err);
        }
        res.json({'err':0,'ok':result.ok});
    });
});
//编辑
app.post('/edit', (req, res) => {
    db.collection('quotes').findOneAndUpdate({name:req.body.query}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.json({'err':0,'ok':result.ok});
    })
});
//链接数据库
MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})