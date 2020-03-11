//importar express
const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

require('dotenv').config({path:'variables.env'})


//habilitar pug
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'))

//cargar carpeta estatica
app.use(express.static('public'))

//conectar con la base de datos
const db = require('./config/database')
// db.authenticate()
//     .then(() => console.log('DB Connect'))
//     .catch(error => console.log(error))
//configuracion
const configs = require('./config')

//validar si estamos en produccion o desarrollo 
const config  = configs[app.get('env')]

//creamos la variable para el sitio web

app.locals.titulo = config.nombresitio

//BODY PARSER
app.use(bodyParser.urlencoded({extended: true}))

//muestra el año actual
app.use((req,res,next) =>{
    const fecha = new Date()
    res.locals.fechaActual = fecha.getFullYear()
    res.locals.ruta = req.path
    return next()
})

app.use('/', routes())

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
app.listen(port, host, () =>{
    console.log('EL SERVIDO ESTÁ FUNCIONANDO')
})