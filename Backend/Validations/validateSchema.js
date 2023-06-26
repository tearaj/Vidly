import Joi from "joi"
export default function validateSchema(body){
    const schema = Joi.object({
        "name": Joi.string().min(3).pattern(new RegExp('^[A-Za-z]+$')).required()
    })
    //the RegExp only allows english alphabets to be in the name key of the dict    
    return schema.validate(body)
}