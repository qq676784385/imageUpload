/**
 * Created by wangwei on 2017/2/17.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.post('/', function(req, res, next) {
    // res.send('image upload');
    var imgData = req.body.wangwei;
    //图片BASE64 数据
    var base64Data = imgData.replace(/^data:image\/\png+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var _dateSymbol = new Date().toLocaleDateString().split('-').join('');
    var _timeSymbol = new Date().getTime().toString();
    var _port = process.env.PORT || '3000';
    var relPath = 'http://' + req.hostname + (_port !== 80 ? ':' + _port : '') + '/images/' + _dateSymbol + _timeSymbol + '.jpg';
    fs.writeFile("./public/images/" + _dateSymbol + _timeSymbol + '.jpg', dataBuffer, function(err) {
        if(err) {
            res.send(err);
        } else {
            res.status(200).send(relPath);
        }
    });
});

module.exports = router;