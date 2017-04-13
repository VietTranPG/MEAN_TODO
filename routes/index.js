var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next){
	res.send('Helloo, hay lam, d mmm');
});
module.exports = router;