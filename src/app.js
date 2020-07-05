const path= require('path')
const express= require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


console.log(path.join(__dirname,'../public/'))



const app=express()
//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup static server to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        name:'Nanda Navaneetharan',
        message:"Worry no more, you've come to the right place for help!"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Nanda Navaneetharan'
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Nanda Navaneetharan'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            errMessage:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}= {})=>{         //Destructuring, setting default ={} enalbles undefined
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'Sunny Day',
    //     location:'Philidephia',
    //     address : req.query.address
    // })
})

//example
// app.get('/products',(req,res)=>{
//     if(!req.query.search) {
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }

//     console.log(req.query.search);
//     res.send({
//         products:[]
//     }
//     )
// })

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:404,
        errMessage:"Help article not found",
        name:'Nanda Navaneetharan'
    })
})
//must be last
app.get('*',(req,res)=>{
    res.render('error',{
        title:404,
        errMessage:"Page not found",
        name:'Nanda Navaneetharan'
    })
})

//to start the server

app.listen(3000,()=>{
    console.log('Server is running in port 3000')
})



// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!<h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name : 'Nanda',
//         age : 24
//     },{
//         name: 'Siddeshwar',
//         age:21
//     }]
//     )
// })
// app.get('/about',(req,res) => {
//     res.send('<h1>ABOUT PAGE</h1>')
// })