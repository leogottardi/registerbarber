const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

//Index
exports.index =  function(req, res) {
    return res.render("clients/index", { clients: data.clients })
}

// Post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for(key of keys){
        if(req.body[key] == "")
        return res.send("Você precisa preencher todos os dados!")
    }
    
    
    
    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastClient = data.clients[data.clients.length -1]
    
    if(lastClient) {
        id = lastClient.id + 1
    }
    
    data.clients.push({
        ...req.body,
        id,
        birth
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file Error!")
        return res.redirect(`/clients/${id}`)
    })
} 

//Create
exports.create = function(req, res) {
    return res.render("clients/create")
}

//Show
exports.show = function(req, res) {
    const { id } = req.params

    const foundClient = data.clients.find(function(client) {
        return client.id == id
    })
    
    if(!foundClient) return res.send("Client not found!")


    const client = {
        ...foundClient,
        birth: date(foundClient.birth).birthDay
    }

    return res.render("clients/show", { client })
}

//Edit
exports.edit = function(req, res) {
    
    const { id } = req.params
    
    const foundClient = data.clients.find(function(client) {
        return client.id == id
    })
    
    if(!foundClient) return res.send("Client not found!")
    
    
    const client = {
        ...foundClient,
        birth: date(foundClient.birth).iso
    }
    
    
    return res.render("clients/edit", { client })
}

//Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundClient = data.clients.find(function(client, foundIndex) {
        if(id == client.id){
            index = foundIndex
            return true
        }
        
    })
    
    if(!foundClient) return res.send("Client not found!")
    
    const client = {
        ...foundClient,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    
    data.clients[index] = client
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/clients/${id}`)
    })
}

//Delete
exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredClients = data.clients.filter(function(client) {
        return client.id != id 
    })


    data.clients = filteredClients

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error!")

        return res.redirect("/clients")
    })
}