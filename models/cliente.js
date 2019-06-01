const mongoose = require('mongoose')
const Schema = mongoose.Schema


const clienteSchema = Schema({
	nombre: String,
	cedula: String,
	direccion: String,
	solicitud: {type: String, enum: ['aprovada', 'declinada', 'en proceso']},
	idAnimal: String
})

module.exports = mongoose.model('Cliente', clienteSchema)