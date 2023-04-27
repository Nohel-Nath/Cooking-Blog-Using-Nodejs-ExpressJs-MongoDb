/**
 * get 
 * homepage
 */
require('../models/database.js');
const Category = require('../models/Category.js');
const Recipe = require('../models/Recipe.js');
const contact = require('../models/Contact.js');


exports.homepage = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);

    const bangladeshi = await Recipe.find({ 'category': 'Bangladeshi' }).limit(limitNumber);
    const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
    const indian = await Recipe.find({ 'category': 'Indian' }).limit(limitNumber);
    const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);
    const spanish = await Recipe.find({ 'category': 'Spanish' }).limit(limitNumber);
    const mexican = await Recipe.find({ 'category': 'Mexican' }).limit(limitNumber);

    const food = { latest, bangladeshi, american, indian, chinese, spanish, mexican };
    res.render('index', { title: 'Cooking Blog - Home', categories, 
        food : food
    });

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}


/*Get Categories*/

exports.exploreCategories = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories' ,{title: 'Cooking Blog - Categories', categories});

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}

//Get-Recipe with id 

exports.exploreRecipe = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe' ,{title: 'Cooking Blog - Recipe', recipe});

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}


//Explore catergories by id'

exports.exploreCategoriesByID = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{
        let categoryId = req.params.id1;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category' : categoryId}).limit(limitNumber);
        res.render('categories' ,{title: 'Cooking Blog - Categories', categoryById});

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}



//Explore search

exports.searchRecipe = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

try{
        let searchTerm = req.body.searchTerm;  
        let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search' ,{title: 'Cooking Blog - Search', recipe});

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}




exports.exploreLatest = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest' ,{title: 'Cooking Blog - Latest Recipe', recipe});

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}



exports.exploreRandom = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('explore-random' ,{title: 'Cooking Blog - Random Recipe', recipe});

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}



exports.submitRecipe = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        res.render('submit-recipe' ,{title: 'Cooking Blog - Submit Your Recipe', infoErrorsObj,
        infoSubmitObj : infoSubmitObj
    });

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}



exports.submitRecipeOnPost = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{



    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
    console.log('No Files was uploaded.');
    } else{
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/img' + newImageName;
        imageUploadFile.mv(uploadPath, function(error){
        if(error) return res.status(500).send(error);
        })
    }

        const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added.');
        res.redirect('/submit-recipe');

    }catch(error)
    {
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');
    }
    
}




exports.submitRecipe = async(req,res)=>{
    //res.render('index' ,{title: 'Cooking Blog - Home'});

    try{

        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        res.render('submit-recipe' ,{title: 'Cooking Blog - Submit Your Recipe', infoErrorsObj,
        infoSubmitObj : infoSubmitObj
    });

    }catch(error)
    {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}







// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();



// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();

/**
 * Dummy Data Example 
*/

/*async function insertDymmyCategoryData(){
    try{
        await Category.insertMany([
            {
                "name": "Bangladeshi",
                "image": "Bangladeshi_Food.jpg"
            },
            {
                "name": "American",
                "image": "american-food.jpg"
            },
            {
                "name": "Indian",
                "image": "indian-food.jpg"
            },
            {
                "name": "Chinese",
                "image": "chinese-food.jpg"
            },
            {
                "name": "Spanish",
                "image": "spanish-food.jpg"
            },
            {
                "name": "Mexican",
                "image": "mexican-food.jpg"
            }       
        ]);

    } catch(error){
        console.log('error', + error)
    }
}

insertDymmyCategoryData();*/


/*async function insertDymmyRecipeData(){
    try{
        await Recipe .insertMany([
            
            {
                "name": "Indian-inspired frittata",
                "description": "This dish is inspired by a trip to Delhi, where I saw street-food vendors doing the most extraordinary things with eggs, breads, and a rainbow of incredible spices. I wanted to bring together a few of those ideas to take the humble egg to a really exciting place. So, in homage to those street-food vendors, this frittata has the sweetness of mango chutney, the crunch of Bombay mix, and the savouriness of spinach, all held together with toasted chapatis – it’s just a joy to eat.",
                "email": "tanita@gmail.com",
                "ingredients":[
                "4 wholemeal chapatis",
                "8 large eggs",
                "2 tablespoons mango chutney",
                "50 g mature Cheddar cheese",
                "200 g baby spinach",
                "olive oil",
                "30 g Bombay mix",
                "½ a small red onion",
                "red wine vinegar",
                "2 tablespoons natural yoghurt"
                ],
                "category":"Indian",
                "image": "indian-food-1.jpg"
            },
            
            {
            "name": "Crab cakes",
            "description": "\n Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.\n        For the pie crust, blend the biscuits, sugar and remaining butter in a food processor until the mixture resembles breadcrumbs.\n        Transfer to the pie dish and spread over the bottom and up the sides, firmly pressing down.\n        Bake for 10 minutes, or until lightly browned. Remove from oven and place the dish on a wire rack to cool.\n        For the filling, whisk the egg yolks in a bowl. Gradually whisk in the condensed milk until smooth.\n        Mix in 6 tablespoons of lime juice, then pour the filling into the pie crust and level over with the back of a spoon.\n        Return to the oven for 15 minutes, then place on a wire rack to cool.\n        Once cooled, refrigerate for 6 hours or overnight.\n        To serve, whip the cream until it just holds stiff peaks. Add dollops of cream to the top of the pie, and grate over some lime zest, for extra zing if you like.\n    \n        Source: https://www.jamieoliver.com/recipes/fruit-recipes/key-lime-pie/",
            "email": "hello@email.com",
            "ingredients": [
            "4 large free-range egg yolks",
            "400 ml condensed milk",
            "5 limes",
            "200 ml double cream"
            ],
            "category": "American",
            "image": "crab-cake.jpg"
            },

            {
                "name": "Thai-Chinese-inspired pinch salad",
                "description": "Peel and very finely chop the ginger and deseed and finely slice the chilli (deseed if you like). Toast the sesame seeds in a dry frying pan until lightly golden, then remove to a bowl.\n        Mix the prawns with the five-spice and ginger, finely grate in the lime zest and add a splash of sesame oil. Toss to coat, then leave to marinate.\n    \n        Source: https://www.jamieoliver.com/recipes/seafood-recipes/asian-pinch-salad/",
                "email": "jim@email.com",
                "ingredients": [
                "5 cm piece of ginger",
                "1 fresh red chilli",
                "25 g sesame seeds",
                "24 raw peeled king prawns , from sustainable sources (defrost first, if using frozen)",
                "1 pinch Chinese five-spice powder"
                ],
                "category": "Chinese",
                "image": "thai-chinese-inspired-pinch-salad.jpg",
            },

            {
                "name": "Mexican breakfast",
                "description": "The Mexican name for this dish is ‘huevos rancheros’ – eggs with chillies, tomatoes and peppers in burritos. It’s absolutely great if you've got a few mates round, and even better if you've got a hangover you’re trying to shake off!",
                "email": "maxwell@gmail.com",
                "ingredients":[
                    "1 onion",
                    "2 cloves of garlic",
                    "2 red peppers",
                    "2 fresh red or orange chillies",
                    "olive oil"
                ],
                "category":"Mexican",
                "image": "mexican-food-1.jpg"
            }
        ]);

    } catch(error){
        console.log('error', + error)
    }
}

insertDymmyRecipeData();*/