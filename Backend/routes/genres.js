import express from 'express'
//genresR->genres Router
export const genresRoute = express.Router()
import validateSchema from '../Validations/validateSchema.js'

var genres = [
    {id:1,name:'comedy'},
    {id:2,name:'horror'},
    {id:3,name:'drama'},
]

genresRoute.get('/',(req,res)=>{
    res.send(genres)
})

genresRoute.get('/:id',(req,res)=>{
    const genre = genres.find(genre=>genre.id===Number(req.params.id))
    if(!genre) res.status(404).send({"error":"ID does not exist."})
    else res.send(genre)
})

genresRoute.post('/',(req,res)=>{
    const {error} = validateSchema(req.body)

    if(!error){
        const genre = {id:genres.length+1,name:req.body.name}
        genres.push(genre)
        res.send(genres)
    }
    
    else {
        res.status(403).send(error.details[0].message)
    }
})

genresRoute.put('/:id',(req,res)=>{
    let {error} = validateSchema(req.body)
    const id=Number(req.params.id)
    var genre = genres.find(genre=>genre.id===id)
    if(!genre) res.send({error:"Invalid ID"})
    else if(!error){
        genre.name = req.body.name
        res.send(genres)
    }
    else res.status(404).send(error.details[0].message)
})

genresRoute.delete('/:id',(req,res)=>{
    const genre = genres.find(genre=>genre.id===Number(req.params.id))
    
    if(genre){
        const index=genres.indexOf(genre)
        res.send(genre)
        genres.splice(index,1)
    }
    else res.status(404).send({"error":"ID does not exist"})
})
