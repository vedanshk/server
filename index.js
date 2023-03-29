const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession =  require('cookie-session');
require('dotenv').config();
require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoute');

const key = process.env.COOKIE_KEY;

const app = express();

app.use(cookieSession({
 maxAge: 30*24*60*60*1000,
 keys:[key]

}));

app.use(passport.initialize());
app.use(passport.session())

const PORT = process.env.PORT || 4001;
mongoose.connect(process.env.MONGOOSE_URI);

authRoutes(app);



app.listen(PORT , () =>{

    console.log('listening on port ' + PORT);

});