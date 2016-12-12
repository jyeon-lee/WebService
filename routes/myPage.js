/**
 * Created by kmj on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');
var session = require('express-session');

router.get('/:menu?', function(req, res, next){
    var menu = req.params.menu;
    if(menu == 'incorrect'){
        db.getUserIncorrectQuestion(req.session.userInfo.userID, function(list){
            res.render('myincorrect', {'title': 'user incorrect list', qList: list, l: 'logout'});
        });
    }else if(menu == 'myquestion'){
        db.getUserQuestion(req.session.userInfo.userID, function(list){
            res.render('myquestion', {'title': 'user question', qList: list, l: 'logout'});
        });
    }else next();
});

router.get('/', function(req, res, next) {
    if(req.session.userInfo == undefined){
        res.redirect('/member/login');
    }else{
        res.render('myPage', {l:'logout'});
    }
});

router.post('/modify', function(req, res, next){
    var newPwd = req.body.pwd;
    var newName = req.body.name;
    var newGender = req.body.chk_info;
    db.updateUserInfo(req.session.userInfo.userID, newPwd, newName, req.session.userInfo.userID, req.session.userInfo.birth_date, newGender, function (result) {
        req.session.userInfo.password = newPwd;
        req.session.userInfo.name = newName;
        req.session.userInfo.gender = newGender;
        res.redirect('/myPage');
    });
   //회원 정보 수정
});

module.exports = router;