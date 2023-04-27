const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const { sendMail } = require('./views/sendmail.js');

const app = express();
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3002;

const connectDB = require('./server/models/database.js');
connectDB();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);


app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());
app.use(toastr());

const path = require('path');
app.set('layout', path.join(__dirname, 'views', 'layouts', 'main.ejs'));

app.set('view engine','ejs');


app.post('/send-mail', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    sendMail(name, email, message);

    res.redirect('/');
});

//const routes = require('./server/routes/recipeRoutes.js')
//app.use('/', routes);

app.use('/', require('./server/routes/recipeRoutes.js'))


/*app.post('/contact', function(req, res) {
    console.log(req.body);
    // Do something with the form data (e.g. save to database, send email)

    res.status(200).send('Message received! Thank you for contacting us.' );
});*/


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});