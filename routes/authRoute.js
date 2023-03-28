const passport = require('passport');
module.exports = (app) =>{

    app.get('/auth/google' , passport.authenticate('google' , {
        scope:['profile' , 'email']
    }) ,  ( req , res) =>{
    
    
    
    });
    
    app.get('/auth/google/callback' , passport.authenticate('google') ,  (req , res) =>{
    
    
        res.send({"message":"back from google" })
        
    
    });

    app.get('/api/current_user'  , (req , res ) =>{


            res.send(req.user);

    });
}