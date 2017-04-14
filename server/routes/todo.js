var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://viet:viet@ds013182.mlab.com:13182/mean_todo_app',['todos']);
router.get('/todo',function(req,res,next){
	db.todos.find(function(err,todos){
		if (err) {
			res.send(err);
		}else{
			res.json(todos);
		}
	})
});
//Get by id
router.get('/todo/:id',function(req,res,next){
	var id = req.params.id;
	db.todos.findOne({
		_id:mongojs.ObjectId(id)
	},function(err,todo){
		if(err){
			res.send(err);
		}else{
			res.json(todo);
		}
	})
});
// Add new row
router.post('/todo',function(req,res,next){
	var todo = req.body;
	if (!todo.text || !(todo.isCompleted+'')) {
		res.status(400);
		res.json({
			"err":"Invalid input"
		})
	}else{
		db.todos.save(todo,function(err,result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}
		})
	}
});
// Update Row
router.put('/todo/:id',function(req,res,next){
	var todo = req.body;
	var updateObj ={};
	if(todo.isCompleted){
		updateObj.isCompleted = todo.isCompleted;
	}if(todo.text){
		updateObj.text=todo.text;
	}
	if (!updateObj) {
		res.status(400);
		res.json({
			"err":"Invalid Data"
		})
	}else{
		db.todos.update({
			_id : mongojs.ObjectId(req.params.id)
		},updateObj,{},function(err,result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}
		});
	}
});
// Delete Todo
router.delete('/todo/:id',function(req,res,next){
	db.todos.remove({
		_id : mongojs.ObjectId(req.params.id)
	},'',function(err,result){
		if(err){
				res.send(err);
			}else{
				res.json(result);
			}
	})
});
module.exports = router;