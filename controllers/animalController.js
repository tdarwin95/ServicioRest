const Animal = require ('../models/animal')


function getAnimal(req, res) {
	var animalId = req.params.animalId

	Animal.findById(animalId, function (err, animal) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!animal) return res.status(404).send({mensaje: 'El animal no existe'})

		res.status(200).send({animal:animal})
	})
}

function getAnimales(req, res) {
	Animal.find({}, function (err, animal) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!animal) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({animal:animal})
	})
}

function saveAnimal(req, res) {
	//imprimir el cuerpo del mensaje en consola
	console.log(req.body)

	//creamos un esquema de tipo Animal
	var animal = new Animal()

	//guardamos datos del body del mensaje en el esquema
	animal.descripcion = req.body.descripcion
	animal.condicionFisica = req.body.condicionFisica
	animal.UbicacionRescate = req.body.UbicacionRescate

	//guardamos en la base de datos
	animal.save(function(err, animalStored) {
		if(err) res.status(500).send({mensaje:'Error al insertar animal'})

		res.status(200).send({animal: animalStored})
	})
}

function updateAnimal(req, res) {
	var animalId = req.params.animalId
	var update = req.body

	Animal.findByIdAndUpdate(animalId, update, function (err, animalUpdated) {
		if (err) res.status(500).send({mensaje:'Error al actualizar el animal'})

		res.status(200).send({animal:animalUpdated})
	})
}

function deleteAnimal(req, res) {
	var animalId = req.params.animalId

	Animal.findById(animalId, function (err, animal) {
		if(err) res.status(500).send({mensaje:'animal no existe'})

		animal.remove(function (err) {
			if (err) res.status(500).send({mensaje:'error al eliminar el animal'})

			res.status(200).send({mensaje:'Animal eliminado correctamente de la base de datos'})
		})
	})
}

module.exports = {

	getAnimal,
	getAnimales,
	saveAnimal,
	updateAnimal,
	deleteAnimal

}