const mongoose = require('mongoose');


const recipeSchema  = new mongoose.Schema({

    name: {
        type: String,
        required: 'This field is required.'
},
    description: {
        type: String,
        required: 'This field is required.'
},
    email: {
        type: String,
        required:'This field is required.'
},
    ingredients: {
        type: Array,
        required: 'This field is required.'
},
    category: {
        type: String,
        enum: ['Bangladeshi', 'American', 'Indian', 'Chinese', 'Spanish','Mexican' ],
        required: 'This field is required.'
},
    image: {
        type: String,
        required: 'This field is required & photo should be 330*218px'
}
});

recipeSchema.index({ name: 'text', category: 'text' });

// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });


module.exports = mongoose.model('Recipe', recipeSchema );






