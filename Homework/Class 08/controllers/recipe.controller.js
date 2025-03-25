import Recipe from "../models/recipe.model.js";

const recipeController = {
    async getAllRecipes(req, res) {
        try{
        const { difficulty, category } = req.query
        let query = {}

        if(difficulty) { 
            query.difficulty = difficulty }
        if(category) { 
            query.category = category}
        if(difficulty && category) { 
            query.difficulty = difficulty, query.category = category}
        
        const recipes = await Recipe.find(query)

        res.send(recipes)
    }
    catch(error){
        res.status(500).send({
            errors: [error.message] })
    }
    },

    async getRecipeById(req, res) {
        try{
        const { id } = req.params
        const recipe = await Recipe.findById(id)

        if(!recipe){
            res.status(404).send({
                error: `Recipe with id: ${id} doesn't exist.`
            })
        }
        else
        res.send(recipe)
    }
    catch(error){
        res.status(500).send({
            errors: [error.message]
        })
    }
    },

    async createRecipe(req, res) {
        try{
            const { title, description, ingrediants, instructions, cookingTime, difficulty, isVegetarian, category } = req.body

            const recipe = new Recipe({
                title,
                description,
                ingrediants,
                instructions,
                cookingTime,
                difficulty,
                isVegetarian,
                category
            })

            const createdRecipe = await recipe.save()

            res.status(201).send(createdRecipe)
        }
        catch(error) {
            res.status(500).send({
                errors: [error.message] })
        }
    },

    async updateRecipe(req, res) {
        try{
            const { id } = req.params
            const { body } = req

            const recipe = await Recipe.findByIdAndUpdate(id, body, {
                new: true
            })
            
            if(!recipe){
                res.status(404).send({
                    error: `Recipe with id: ${id} doesn't exist.`
                })
            }
            else
            res.send(recipe)
        }
        catch(error){
            res.status(500).send({
                errors: [error.message]
            })
        }
    },

    async deleteRecipeById(req, res) {
        try{
        const { id } = req.params
        const recipe = await Recipe.findByIdAndDelete(id)

        if(!recipe){
            res.status(404).send({
                error: `You can't delete non existing recipe.`
            })
        }
        else 
        res.sendStatus(204)
    }
    catch (error){
        res.status(500).send({
            errors: [error.message]
        })
    }
    },

    async getRecipeByCategory(req, res) {
        try{
        const recipes = await Recipe.find({
            category: req.params.category
        })

        if(recipes.length <= 0){
            res.status(404).send({
                error: `There are 0 recipes from this category`
            })
        }
        else
        res.send(recipes)
        }
        catch(error){
            res.status(500).send({
                errors: [error.message]
            })
        }
    },

    async getRecipeBySearch(req, res) {
        try{
        const { title } = req.query 
        let query = {}

        if(title){ 
            query.title = title}

        const recipe = await Recipe.find(query)

        res.send(recipe)
    }
    catch(error){
        res.status(500).send({
            errors: [error.message]
        })
    }
    }
}

export default recipeController