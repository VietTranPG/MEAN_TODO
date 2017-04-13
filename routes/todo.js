var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://viettran:nguyentuanh2604@ds013182.mlab.com:13182/mean_todo_app',['todo']);
router.get('/todos',function(req,res,next){
	db.todo.find(function(err,todos){
		if (err) {
			res.send(err);
		}else{
			res.json(todos);
		}
	})
});
module.exports = router;