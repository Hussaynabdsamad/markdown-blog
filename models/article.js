const mongoose = require('mongoose')
const {marked }= require('marked')
// console.log(marked)
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title : {
        required: true,
        type : String
    },
    description : {
        type : String
    },
    markdown : {
        required: true,
        type : String
    },
    slug : {
        type:  String,
        required: true,
        unique: true 
    }, 
    sanitizedHtml : {
        type: String,
        required : true
    } 
},
{
    timestamps : true
})

articleSchema.pre('validate' , function (next) {
    const artic = this
    if(artic.title) {
        const slug = slugify(artic.title, {lower: true, strict: true})
        this.slug = slug
    }

    if(artic.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next() 
})


const Article = mongoose.model('Article', articleSchema )
module.exports = Article; 