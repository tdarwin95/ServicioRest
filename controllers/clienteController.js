const Cliente = require ('../models/cliente')


function getCliente(req, res) {
	var clienteId = req.params.clienteId

	Cliente.findById(clienteId, function (err, cliente) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!cliente) return res.status(404).send({mensaje: 'El cliente no existe'})

		res.status(200).send({cliente:cliente})
	})
}

function getClientes(req, res) {
	Cliente.find({}, function (err, cliente) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!cliente) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({cliente:cliente})
	})
}

function saveCliente(req, res) {
	//imprimir el cuerpo del mensaje en consola
	console.log(req.body)

	//creamos un esquema de tipo Animal
	var cliente = new Cliente()

	//guardamos datos del body del mensaje en el esquema
	cliente.nombre = req.body.nombre
	cliente.cedula = req.body.cedula
	cliente.direccion = req.body.direccion
	cliente.solicitud = req.body.solicitud
	cliente.idAnimal = req.body.idAnimal

	//guardamos en la base de datos
	cliente.save(function(err, clienteStored) {
		if(err) res.status(500).send({mensaje:'Error al insertar cliente'})

		res.status(200).send({cliente: clienteStored})
	})
}

function updateCliente(req, res) {
	var clienteId = req.params.clienteId
	var update = req.body

	Cliente.findByIdAndUpdate(clienteId, update, function (err, clienteUpdated) {
		if (err) res.status(500).send({mensaje:'Error al actualizar el cliente'})

		res.status(200).send({cliente:clienteUpdated})
	})
}

function deleteCliente(req, res) {
	var clienteId = req.params.clienteId

	Cliente.findById(clienteId, function (err, cliente) {
		if(err) res.status(500).send({mensaje:'cliente no existe'})

		cliente.remove(function (err) {
			if (err) res.status(500).send({mensaje:'error al eliminar el cliente'})

			res.status(200).send({mensaje:'cliente eliminado correctamente de la base de datos'})
		})
	})
}


module.exports = {
	getCliente,
	getClientes,
	saveCliente,
	updateCliente,
	deleteCliente
}