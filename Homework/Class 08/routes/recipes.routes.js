import { Router } from "express";
import recipeController from "../controllers/recipe.controller.js";
import { creatRecipeSchema, updateRecipeSchema } from "../schemas/recipe.schema.js";
import validateRequest from "../middlewares/req.validation.middleware.js";

const router = Router()

router.get('/', recipeController.getAllRecipes)
router.get('/:id', recipeController.getRecipeById)
router.post('/', validateRequest(creatRecipeSchema), recipeController.createRecipe)
router.put('/:id', validateRequest(updateRecipeSchema), recipeController.updateRecipe)
router.delete('/:id', recipeController.deleteRecipeById)

router.get('/category/:category', recipeController.getRecipeByCategory)
router.get('/query/search', recipeController.getRecipeBySearch) 

export default router
