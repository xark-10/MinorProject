const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const authStringConstant = require('../constants/strings')
const httpStatusCode = require('../constants/httpStatusCodes')
const User = require('../models/user')
const Result = require('../models/student')
const authActions = {
    // Ping route
    pingRoute: async function (req, res) {
        res.status(httpStatusCode.OK).send({
            success: true,
            message: StringConstant.SUCCESSFUL_PING,
        })
    },
    newStudent: async function (req, res) {
        console.log(req.body)
        User.register({
            name: req.body.name,
            registerNo: req.body.registerNo,
            username: req.body.username,
            yearofStudy:req.body.yearofStudy,
        },
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("newStudent");
                } else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("admin-home");
                    });
                }
            }
        );
    }, StudentLogin:  function (req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        req.login(user,  function (err) {
            if (err) {
                console.log(err);
                res.send("not logged in ")
            } else {
                if(req.body.username === 'tts112'){
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("admin-home");
                    })
                    
                }else{
                    passport.authenticate("local")(req, res, function () {
                        User.findOne({username:req.body.username},function(err,foundUser){
                        res.render('stud-home',{username:foundUser.name,userId:foundUser.username,registerNo:foundUser.registerNo,yearofStudy:foundUser.yearofStudy});
                        })
                    })
                    
                }
                
            }
        });
    },
    newStudentGetRoute: function (req,res){
        res.render("admin-newstud")

    },
    loginStudentGetRoute:function (req,res){
        res.render("login")

    },
    studentResultEntryRouteGet: function(req,res){
        res.render("admin-update")

    },
    adminHome: function(req,res){
        res.render('admin-home')
    },
    studentResultEntryRoute: async function(req,res){
        User.findOne({username:req.body.username},function(err,user){
        if(!user){
            res.send('No such student')
            console.log(user);
        }else if(err){
            res.send('Error contact admin')
            console.log(err);
        }else{
            const result = new Result({
                studentId: req.body.username,
                subject1Id:req.body.subject1Id,
                subject2Id: req.body.subject2Id,
                subject3Id: req.body.subject3Id,
                subject4Id: req.body.subject4Id,
                subject5Id: req.body.subject5Id,
                subject6Id: req.body.subject6Id,
                subject1mark: req.body.subject1mark,
                subject2mark: req.body.subject2mark,
                subject3mark: req.body.subject3mark,
                subject4mark: req.body.subject4mark,
                subject5mark: req.body.subject5mark,
                subject6mark: req.body.subject6mark,
            })
            if(result.save()){
                res.redirect("admin-home")
            }else {
                res.redirect('admin-update')
            }
            

        }
    })

    },
    studentResultRoute:  function (req, res) {
        const userId = req.body.username
        Result.findOne({"studentId":userId}, function(err, user) {
            if(!user){
                res.redirect('loginStudent')
            }else if(err){
                res.send("technical error")
                console.log(err)
            }else{
                res.render('stud-result',{
                    studentId: user.studentId,
                    subject1Id:user.subject1Id,
                    subject2Id:user.subject2Id,
                    subject3Id:user.subject3Id,
                    subject4Id:user.subject4Id,
                    subject5Id:user.subject5Id,
                    subject6Id:user.subject6Id,
                    subject1mark: user.subject1mark,
                    subject2mark: user.subject2mark,
                    subject3mark: user.subject3mark,
                    subject4mark: user.subject4mark,
                    subject5mark: user.subject5mark,
                    subject6mark: user.subject6mark,
                })
            }
        })
    },
    // Unidentified route
    errorPageRoute: async function (req, res) {
        res.status(httpStatusCode.NOT_FOUND).json({
            success: 'false',
            message: StringConstant.PAGE_NOT_FOUND
        })
    },
}




module.exports = authActions
