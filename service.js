var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var todo = require('./routes/todo');
var app = express();
// View 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extend:false
}));
app.use('/',index);
app.use('/api/v1/',todo);
app.listen(3000,function(){
	console.log('server running...')
})
