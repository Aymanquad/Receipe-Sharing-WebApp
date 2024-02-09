

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
  const recipes = req.session.user.my_recipes ;

      res.render('recipe_stuff/my_recipes', { 
        pgTitle: 'My Recipes',
        path: '/my-recipes',
        recipe_arr : recipes ,
      });
}

exports.getAddrecipe = (req,res,next)=>{
  const recipe_id = req.user._id.toString() ;
  const recipe_arr_length = req.user.my_recipes.length + 1;

  const calculation = parseInt(recipe_id, 16) * recipe_arr_length ;
  const recipeId = calculation.toPrecision(5);
  // console.log(recipeId);

  res.render('recipe_stuff/add-recipe', { 
    pgTitle: 'Add a Recipe',
    path: '/Add-recipe',
    editing : false,
    recipeId : recipeId,
  });
}



exports.postAddrecipe = (req,res,next)=>{
  const title = req.body.title ;
  const image= req.body.imageUrl;
  const time= req.body.time ;
  const ingredients= req.body.ingredients
  const recipe= req.body.recipe ;
  const visibility = req.body.visibility;
  const recipe_id = req.body.recipeid ;

  // console.log(recipe_id);
  
  const recipe_data = { title : title , imageUrl : image , time_req : time , ingredients : ingredients , recipe : recipe , visibility : visibility  , id : recipe_id};
  //console.log(req.user.my_recipes);
  req.user.my_recipes.push(recipe_data);
  req.user.save() 
    .then(result => {
      req.session.user = req.user ;
      res.redirect('/my-recipes');
    })
    .catch(err => {
        console.log(err);
        
    });
}



exports.postDeleteRecipe = (req, res, next) => {
  const recipe_id = req.body.recipeId;
  const recipes = req.user.my_recipes;

  for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === recipe_id) {
          recipes.splice(i, 1); 
          req.user.save()
              .then(result => {
                  req.session.user = req.user ;
                  console.log("Recipe removed!");
                  return res.redirect('/my-recipes');
              })
              .catch(err => {
                  console.log(err);
                  return res.redirect('/');
              });
          return; // Exit the loop after removing the recipe
      }
  }

  return res.redirect('/');
}


exports.getEditRecipe = (req ,res, next)=>{
  const recipeId = req.params.recipeId ;
  const recipes = req.user.my_recipes;

  // console.log("Inside diss");


  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === recipeId) {
        req.user.save()
            .then(result => {
              console.log("found recipe!");
              res.render('recipe_stuff/add-recipe', { 
                pgTitle: 'Update a Recipe',
                path: '/edit-recipe',
                editing : true,
                recipeId : recipeId,
              });
            })
            .catch(err => {
                console.log(err);
                return res.redirect('/');
            });
        return; // Exit the loop after removing the recipe
    }
  }

  return res.redirect('/');
};


exports.postEditRecipe = (req ,res, next) =>{
  const recipes = req.user.my_recipes;
  
  const title = req.body.title ;
  const image= req.body.imageUrl;
  const time= req.body.time ;
  const ingredients= req.body.ingredients
  const recipe= req.body.recipe ;
  const visibility = req.body.visibility;
  const recipe_id = req.body.recipeId ;

  // console.log(recipe_id);
  
  const recipe_data = { title : title , imageUrl : image , time_req : time , ingredients : ingredients , recipe : recipe , visibility : visibility  , id : recipe_id};

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === recipe_id) {
        recipes[i] = recipe_data;
        req.user.save()
          .then(result => {
            req.session.user = req.user ;
            return res.redirect('/my-recipes');
          })
          .catch(err => {
              console.log(err);              
          });
        return; // Exit the loop after removing the recipe
    }
  } 
  res.redirect('/');
}


exports.getDetailsOfRecipe = (req ,res , next) =>{
  const recipeId = req.params.recipeId ;
  const recipes = req.user.my_recipes;
  let recipeObj ;

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === recipeId) {
      recipeObj = recipes[i];
      // console.log("recipe obj sent !");
    }
  }
  res.render('recipe_stuff/recipe-details', { 
    pgTitle: 'Recipe Details',
    path: '/details',
    recipeId : recipeId,
    recipeObj : recipeObj,
  });
}

// add public factor when perfoming Crud operations on my_recipes . Also add stars/rating factor somewhere in recipes .
