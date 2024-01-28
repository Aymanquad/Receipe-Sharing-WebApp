

exports.mainPg = (req ,res , next)=>{
    // console.log("Inside diss");
        res.render('index', { 
          pgTitle: 'Receipes',
          path: '/',
        });
}