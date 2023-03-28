const express = require('express');


const app =  express();

const PORT = process.env.PORT || 4001;
app.get('/' , (req , res ) =>{

    res.send({"hi" : 'hi there'});

});


app.listen(PORT , () =>{

    console.log('listening on port 4001');

});