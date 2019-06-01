const mongoose = require('mongoose')
const Schema = mongoose.Schema


const animalSchema = Schema({
	descripcion: String,
	condicionFisica: String,
	UbicacionRescate: String
})

module.exports = mongoose.model('Animal', animalSchema)