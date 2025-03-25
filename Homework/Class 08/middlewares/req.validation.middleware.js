const validateRequest = schema => async (req, res, next) => {
    try{
        await schema.parseAsync(req.body);
        next()
    }
    catch(error){
        res.status(400).send({
            error: error.errors
        })
    }
}

export default validateRequest