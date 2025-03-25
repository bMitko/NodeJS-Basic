import { z } from 'zod'

export const creatRecipeSchema = z.object({
    title: z.string().min(3).max(30),
    description: z.string().min(10).max(50),
    ingrediants: z.array(z.string().min(3).max(15)),
    instructions: z.array(z.string()),
    cookingTime: z.number().optional(),
    difficulty: z.string('easy', 'medium', 'hard').optional(),
    isVegetarian: z.boolean().optional(),
    category: z.string('breakfast', 'lunch', 'dinner', 'dessert').optional()
})

export const updateRecipeSchema = creatRecipeSchema.partial()
