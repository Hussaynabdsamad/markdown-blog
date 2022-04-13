const express = require('express')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()
require('./db/db')
const articleRouter = require('./routes/article.js')

app.use(express.json())
app.use(methodOverride('_method'))
app.use('/articles' , articleRouter)

app.set('view engine', 'ejs')

app.get('/' , async (req, res)=> {
const articles = await Article.find().sort({
    createdAt : 'desc'
})
    res.render('articles/index' , {articles}
    )
})

app.listen('3200', () => {
    console.log('I dey listen')
})