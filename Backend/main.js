import express from "express";
import dotenv from "dotenv";
import Joi from "joi";
dotenv.config()

const app = express()
app.use(express.json())

// console.log(`Process running in port ${}`)
function validateSchema(body){
    const schema = Joi.object({
        "name": Joi.string().min(3).pattern(new RegExp('^[A-Za-z]+$')).required()
    })
    //the RegExp only allows english alphabets to be in the name key of the dict    
    return schema.validate(body)
}
console.log(process.env.PORT)

var genres = [
    {id:1,name:'comedy'},
    {id:2,name:'horror'},
    {id:3,name:'drama'},
]

app.get('/api/genre',(req,res)=>{
    res.send(genres)
})

app.get('/api/genre/:id',(req,res)=>{
    const genre = genres.find(genre=>genre.id===Number(req.params.id))
    if(!genre) res.status(404).send({"error":"ID does not exist."})
    else res.send(genre)
})

app.post('/api/genre',(req,res)=>{
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

app.put('/api/genre/:id',(req,res)=>{
    let {error} = validateSchema(req.body)
    const id=Number(req.params.id)
    var genre = genres.find(genre=>genre.id===id)
    if(!genre) res.send({error:"Invalid ID"})
    else if(!error){
        genre.name = req.body.name
        res.send(genres)
    }
    else res.status(404).send(error)
})

app.delete('/api/genre/:id',(req,res)=>{
    const genre = genres.find(genre=>genre.id===Number(req.params.id))
    
    if(genre){
        const index=genres.indexOf(genre)
        res.send(genre)
        genres.splice(index,1)
    }
    else res.status(404).send({"error":"ID does not exist"})
})

const PORT = process.env.PORT_ADDR || 3000
console.log(process.env)
app.listen(PORT, ()=>console.log("Listening on port ", PORT))