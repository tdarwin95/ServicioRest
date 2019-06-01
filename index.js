//////////////////////////////////////////////////// LIBRERIAS //////////////////////////////////////////////////
const express = require('express') //servidor
const bodyParser = require('body-parser') //tratar los datos que se encuentran en el cuerpo de las peticiones
const mongoose = require('mongoose') //base de datos

const app = express()
const port = process.env.PORT || 3000


////////////////////////////////////////////////// CONTROLADORES /////////////////////////////////////////////////
const AnimalController = require ('./controllers/animalController')
const ClienteController = require ('./controllers/clienteController')



/////////////////////////////////////////////////// MIDLEWARE //////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



///////////////////////////////////////////////// RUTAS ANIMALES ////////////////////////////////////////////////
//mostrar animales
app.get('/animales', AnimalController.getAnimales)
//mostrar un animal
app.get('/animal/:animalId', AnimalController.getAnimal)
//insertar animal
app.post('/animal', AnimalController.saveAnimal)
//actualizar animal
app.put('/animal/:animalId', AnimalController.updateAnimal)
//eliminar animal
app.delete('/animal/:animalId', AnimalController.deleteAnimal)



///////////////////////////////////////////////// RUTAS CLIENTES //////////////////////////////////////////////////////
//mostrar usuarios
app.get('/clientes', ClienteController.getClientes)
//mostrar un animal
app.get('/cliente/:clienteId', ClienteController.getCliente)
//insertar animal
app.post('/cliente', ClienteController.saveCliente)
//actualizar animal
app.put('/cliente/:clienteId', ClienteController.updateCliente)
//eliminar animal
app.delete('/cliente/:clienteId', ClienteController.deleteCliente)



///////////////////////////////// CONEXION A LA BASE DE DATOS Y INICIO DEL SERVIDOR ///////////////////////////
//conexion a la base de datos
mongoose.connect('mongodb://darwin:admin@mongodb-2867-0.cloudclusters.net:10007/dbServicioRest?authSource=admin', function (err, res) {
	if(err) throw err
	console.log('Conexion a la base de datos exitosa')
	
	//ejecutando el servidor
	app.listen(port, function () {
		console.log(`Servidor corriendo en el puerto: ${port}`)
	})
})



