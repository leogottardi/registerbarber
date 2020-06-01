const server = require('express')
const routes = server.Router()
const barbers = require('./controllers/barbers')
const clients = require('./controllers/clients')


routes.get("/", function(req, res) {
   return res.redirect("/barbers")
})

//Barbers

routes.get("/barbers", barbers.index)
routes.get("/barbers/create", barbers.create)
routes.get('/barbers/:id', barbers.show)
routes.get("/barbers/:id/edit", barbers.edit)
routes.post('/barbers', barbers.post)
routes.put("/barbers", barbers.put)
routes.delete("/barbers", barbers.delete)

//Clients

routes.get("/clients", clients.index)
routes.get("/clients/create", clients.create)
routes.get('/clients/:id', clients.show)
routes.get("/clients/:id/edit", clients.edit)
routes.post('/clients', clients.post)
routes.put("/clients", clients.put)
routes.delete("/clients", clients.delete)


module.exports = routes