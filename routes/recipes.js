const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipes');

router.get('/', recipeController.mainPg);

router.get('/chefs' , recipeController.getChefs);

router.get('/my-recipes' , recipeController.getMyRecipes);

router.get('/add-recipe',recipeController.getAddrecipe);


module.exports = router;