const {User, Post, Mood, Profile} = require('../models/index')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const user = require('../models/user')


class Controller {
    static landingPage(req, res){
        res.render('home.ejs')
    }

    static login(req, res){
        if(req.query.err){
            res.send(req.query.err)
        }else{
            res.render('login.ejs')
        }
    }

    static checkLogin(req, res){
        let nameUser = req.body.username
        let passUser = req.body.password
        User.findOne({
            where:{username: nameUser}
        })
        .then(data=>{
            if(data){
                const isValidPass = bcrypt.compareSync(passUser, data.password)

                if(isValidPass){
                    req.session.userId = data.id
                   return res.redirect('/timeline') 
                } else{
                    const error = "invalid username/password"
                    return res.redirect(`/login?err=${error}`)
                }
            }
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static register(req, res){
        res.render('register.ejs')
    }

    static postRegister(req, res){
        let user
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(data =>{
            user = data
            return Profile.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                UserId: user.id
            })
        })
        .then(profile=>{
            res.redirect('/login')
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static allPost(req, res){
        const sessionId = req.session.userId
        let dataUser
        Post.findAll({
            include: User
        })
        .then(data=>{
            dataUser = data
            return Post.findAll({
                include: Mood
            })
        })
        .then(dataMood =>{
            res.render('timeline.ejs', {dataMood, dataUser, sessionId})
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static findUser(req, res){
        const sessionId = req.session.userId
        let idUser = req.params.id
        User.findAll({
            include: Post,
            where:{
                id: idUser
            }
        })
        .then(data=>{
            res.render('userProfile.ejs', {data, sessionId})
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static addPost(req, res){
        let userId = req.params.id
        Mood.findAll()
        .then(data=>{
            res.render('addPost.ejs', {userId, data})
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static postPost(req, res){
        Post.create({
            content: req.body.content,
            UserId: req.body.UserId,
            MoodId: req.body.MoodId,
            like:0,
            dislike:0
        })
        .then(()=>{
            res.redirect(`/timeline`)
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static deletePost(req, res) {
        const userId = req.params.id
        const postId = req.params.postId
        Post.destroy({where: {
            id: +postId
            }
        })
        .then (data => res.redirect(`/profile/${userId}`))
        .catch (err => {
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static updateLike(req,res){
        Post.increment(
            'like',
            {where:{
                id: req.params.postId
            }}
        )
        .then(()=>{
            res.redirect('/timeline')
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

    static updateDislike(req, res){
        Post.increment(
            'dislike',
            {where:{
                id: req.params.postId
            }}
        )
        .then(()=>{
            res.redirect('/timeline')
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.render('error.ejs', {message})
        })
    }

}

module.exports = Controller