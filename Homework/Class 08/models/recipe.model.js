import { Schema, model } from 'mongoose'

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingrediants: {
        type: Array,
        required: true,
        validate: {
            validator: function(array) {
                const checker = array.filter(item => typeof(item) !== typeof("yes"))
                return array.length > 0 && checker.length === 0
            }
        }
    },
    instructions: {
        type: Array,
        required: true,
        validate: {
            validator: function(array) {
                const checker = array.filter(item => typeof(item) !== typeof("yes"))
                return array.length > 0 && checker.length === 0
            }
        }
    },
    cookingTime: {
        type: Number
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
    },
    isVegetarian: {
        type: Boolean
    },
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
    }
})

const Recipe = model('recipes', recipeSchema)

export default Recipe
    