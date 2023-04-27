const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');


const recipeController = require('../controllers/recipeControllers.js');


router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories/:id1', recipeController.exploreCategoriesByID);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 3002,
    secure: false,
    auth: {
    user: 'nohelcse16@gmail.com',
    pass: 'abc'
    }
});


function sendMail(name, email, message) {
    const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com',
    subject: 'New message from contact form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = router;