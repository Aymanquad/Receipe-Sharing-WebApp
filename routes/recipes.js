const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipes');

const Auth = require('../auth_protection/auth_middleware');

router.get('/', recipeController.mainPg);

router.get('/chefs' , Auth ,recipeController.getChefs);

router.get('/my-recipes' , Auth ,recipeController.getMyRecipes);

router.get('/add-recipe', Auth ,recipeController.getAddrecipe);


module.exports = router;