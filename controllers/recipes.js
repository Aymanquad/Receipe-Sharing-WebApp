

exports.mainPg = (req ,res , next)=>{
        res.render('recipe_stuff/index', { 
          pgTitle: 'Recipes',
          path: '/',
        });
}

exports.getChefs = (req ,res , next)=>{
      res.render('recipe_stuff/chefs', { 
        pgTitle: 'Chefs',
        path: '/chefs',
      });
}

exports.getMyRecipes = (req ,res , next)=>{
      res.render('recipe_stuff/my_recipes', { 
        pgTitle: 'My Recipes',
        path: '/my-recipes',
        errorMsg : 'hi',
      });
}

exports.getAddrecipe = (req,res,next)=>{
  res.render('recipe_stuff/add-recipe', { 
    pgTitle: 'Add a Recipe',
    path: '/Add-recipe',
    editing : false,
  });
}