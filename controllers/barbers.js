const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

//Index
exports.index =  function(req, res) {
    return res.render("barbers/index", { barbers: data.barbers })
}



//Post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
 
    for(key of keys){
       if(req.body[key] == "")
          return res.send("Você precisa preencher todos os dados!")
    }

    let {avatar_url, name, birth, specialtys} = req.body

    birth = Date.parse(req.body.birth)
    const id = Number(data.barbers.length + 1)
    const create_at = Date.now()

    data.barbers.push({
        id,
        avatar_url,
        name,
        birth,
        specialtys,
        create_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file Error!")
        return res.redirect("/barbers")
    })
} 

//Create
exports.create =  function(req, res) {
    return res.render("barbers/create")
 }
 
 //Show
exports.show = function(req, res) {
    const { id } = req.params

    const foundBarber = data.barbers.find(function(barber) {
        return barber.id == id
    })
    
    if(!foundBarber) return res.send("Barber not found!")


    const barber = {
        ...foundBarber,
        age: age(foundBarber.birth),
        specialtys: foundBarber.specialtys.split(","),
        create_at: new Intl.DateTimeFormat('pt-BR').format(foundBarber.create_at)
    }

    return res.render("barbers/show", { barber })
}

//Edit
exports.edit = function(req, res) {
    
    const { id } = req.params

    const foundBarber = data.barbers.find(function(barber) {
        return barber.id == id
    })
    
    if(!foundBarber) return res.send("Barber not found!")


    const barber = {
        ...foundBarber,
        birth: date(foundBarber.birth).iso
    }


    return res.render("barbers/edit", { barber })
 }

//Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundBarber = data.barbers.find(function(barber, foundIndex) {
        if(id == barber.id){
            index = foundIndex
            return true
        }

    })
    
    if(!foundBarber) return res.send("Barber not found!")

    const barber = {
        ...foundBarber,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.barbers[index] = barber

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/barbers/${id}`)
    })
}

//Delete
exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredBarbers = data.barbers.filter(function(barber) {
        return barber.id != id 
    })


    data.barbers = filteredBarbers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error!")

        return res.redirect("/barbers")
    })
}