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
            res.render('timeline.ejs', {dataMood, dataUser})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static findUser(req, res){
        let idUser = req.params.id
        User.findAll({
            include: Post,
            where:{
                id: idUser
            }
        })
        .then(data=>{
            // console.log(data);
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
        // console.log(req.body);
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
            res.send(err)
        })
    }

    static deletePost(req, res) {
        const userId = req.params.id
        const postId = req.params.postId
        Post.destroy({where: {
            id: postId
            }
        })
        .then (data => res.redirect(`/profile/${userId}`))
        .catch (err => res.send(err))
    }



}

module.exports = Controller