const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipes');

const Auth = require('../auth_protection/auth_middleware');

router.get('/', recipeController.mainPg);

router.get('/chefs' , Auth ,recipeController.getChefs);

router.get('/my-recipes' , Auth ,recipeController.getMyRecipes);

router.get('/add-recipe', Auth ,recipeController.getAddrecipe);

router.post('/add-recipe', Auth ,recipeController.postAddrecipe);

router.post('/delete-recipe' , Auth , recipeController.postDeleteRecipe); 


module.exports = router;