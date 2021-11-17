const {User, Post, Mood} = require('../models/index')

class Controller {
    static landingPage(req, res){
        res.render('home.ejs')
    }

    static allPost(req, res){
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
            res.render('timeline.ejs', {dataMood , dataUser})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static findUser(req, res){
        let idUser = req.params.id
        Post.findAll({
            include: User,
            where:{
                id: idUser
            }
        })
        .then(data=>{
            res.render('userProfile.ejs', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addPost(req, res){
        let data = req.params.id
       res.render('addPost.ejs', {data})
    }

    static postPost(req, res){
        console.log(req.body);
    }

}

module.exports = Controller