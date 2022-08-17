const express = require("express");
const app = express();
const Articles = require("./models/article.js")

//Import the mongoose module
const mongoose = require("mongoose");

app.listen(8000);
app.set('view engine', 'ejs');
//get css
app.use(express.static('public'))

//get form data
app.use(express.urlencoded());

const articlesRouter = require("./routes/articles.js")

//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1:27017/blog";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
        console.log(`Connected to DB`)

    })
    .catch(err => console.log(err))



app.use("/articles", articlesRouter)

app.get("/", async (req, res) => {
    const articles = await Articles.find({})
    console.log(articles.length)
    res.render('index.ejs', { articles: articles })
})