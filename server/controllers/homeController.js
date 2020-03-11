const Viajes = require('../models/Viajes')
const Testimonial = require('../models/Testimoniales')

exports.consultasHomepage = async(req,res)=>{

const viajes = await Viajes.findAll({limit: 3})

const testimoniales =await Testimonial.findAll({limit: 3})

res.render('inicio',{
    pagina: 'Próximos Viajes',
    viajes,    
    testimoniales,
    clase: 'home'
})
}