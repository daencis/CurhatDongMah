const {User, Post, Mood, Profile} = require('../models/index')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const nodemailer = require('nodemailer')

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
        const {err} = req.query;
        res.render('register.ejs', {err})
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
            Controller.sendEmail(user.email, profile.firstName)
            res.redirect('/login')
        })
        .catch(err=>{
            const message = err.errors.map(el => {
                return el.message
            })
            res.redirect(`/register?err=${message}`)
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
            res.send(err)
        })
    }

    static findUser(req, res){
        const sessionId = req.session.userId
        let idUser = req.params.id
        let user
        User.findByPk(idUser,{
            include: Post
        })
        .then(data =>{
            user = data
            let id = user.id
            return Profile.findOne({
                where:{UserId: id}
            })
        })
        .then(profile=>{
            res.render('userProfile.ejs', {profile, user, sessionId})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addPost(req, res){
        let userId = req.params.id
        Mood.findAll()
        .then(data=>{
            res.render('addPost.ejs', {userId, data})
        })
        .catch(err=>{
            res.send(err)
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
            res.send(err)
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
            res.send(err)
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
            res.send(err)
        })
    }

    static getLogout(req, res) {
        req.session.destroy((err) => {
            if(err) res.send(err)
            else res.redirect('/login')
        })
    }
    static sendEmail(email, name){
        let transporter = nodemailer.createTransport({
          service:'gmail',
          auth: {
              user: 'curhatdongmahapp@gmail.com',
              pass: 'curhatdongmah123$'
          }
      })

        let mailOptions = {
          from: 'curhatdongmahapp@gmail.com',
          to: `${email}`,
          subject: 'Terima Kasih!',
          text: `
        Dear ${name},
        Terima kasih sudah daftar di Curhat Dong Mah! Jika kamu menerima email ini, akun kamu sudah terdaftar di website kami :)  
        Kami sangat berterima kasih kamu sudah mendaftar dan kami tunggu curhatan-curhatan kamu di website.
          
        Sincerely,


        Soon-to-be Devs`
        }

        transporter.sendMail(mailOptions, (err, data)=>{
          if (err){
              console.log(err)
          } else {
              console.log('cek email ya')
          }
        })
    }
}

module.exports = Controller