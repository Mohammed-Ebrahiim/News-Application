//Require express
const express = require("express")
const app = express()

//local host || 3000
const port = process.env.PORT || 3000

//let my application see public folder
const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))


//npm i hbs
//create Template engine to create dynamic html 
//views path...
app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
// //partial Path...
const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//NEWSAPI 
const newsapi = require('./tools/news')
app.get('/',(req,res)=>{
    newsapi((error,data) =>{
        if(error){
            return res.send({
                error: error,
            })
        } res.render('index', {
            data: data, //data => response.body.articles
        })
    })
})

// EL JOKER (*)
app.get('*',(req,res)=>{
    res.render('404Page',{
        title: 'ERROR 404 NOT FOUND!☻',
        name: 'ERROR'
    })
})

//localHost:3000
app.listen(port,()=>{
    console.log("Example App Listening....")
})