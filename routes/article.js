const express = require('express')
const router = new express.Router()
const Article = require('../models/article')
const bodyParser = require('body-parser')
const { findOneAndUpdate } = require('../models/article')
router.use(bodyParser.urlencoded({ extended: false }))


router.get('/new', (req, res) => {
    res.render('articles/new', {article : new Article()} )
    })
    router.get('/edit/:slug', async (req, res) => {
        try {
            const article = await Article.findOne({slug : req.params.slug})
            console.log(article)
            res.render('articles/edit', {article} )
        } catch (error) {
            
        }
      
        })
router.patch('/edit/:slug', async(req,res) => {
    try {
        const article = await Article.findOne({slug: req.params.slug})
        Object.keys(req.body).forEach(update => {
            if(req.body[update].trim() !== '') {
                article[update] =req.body[update]
            }
          
        })
        await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (error) {
     res.render('articles/edit', {article}) 
    }

        })
    router.get('/:slug', async (req,res)=> {
const article = await Article.findOne({slug: req.params.slug})
if(article === null) {
    res.redirect('/')
}

res.render('articles/show', {article})
    })
router.post('/',  async (req, res) => {
const article = new Article(req.body)

 try {
 await article.save()

 res.redirect(`/articles/${article.slug}`)
 } catch (e) {
      res.render('articles/new', {article})
 }
})

router.delete('/:id', async(req,res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
    res.redirect('/') 
    } catch (error) {
        
    }
   
})

module.exports = router;