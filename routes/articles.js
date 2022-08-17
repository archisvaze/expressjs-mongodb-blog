const express = require("express");
const article = require("../models/article");
const Article = require("../models/article");
const router = express.Router();


router.get("/new", (req, res) => {
    res.render('new.ejs')
})

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const article = await Article.findById(req.params.id);
    res.render('info', { article })
})

router.get('/edit/:id', async (req, res) => {
    console.log(req.params.id);
    const article = await Article.findById(req.params.id);
    res.render('edit', { article })
})

router.get('/delete/:id', async (req, res) => {
    console.log("deleting " + req.params.id);
    const article = await Article.deleteOne({ _id: req.params.id });
    res.redirect("/")
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    let article = new Article({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        content: req.body.content
    });
    await article.save();
    res.redirect("/")

})

router.post('/edit', async (req, res) => {
    console.log(req.body)
    const articleref = await Article.findOneAndUpdate({ _id: req.body.id }, {
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        content: req.body.content
    });
    res.redirect("/")

})
module.exports = router