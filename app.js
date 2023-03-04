



const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => { 
    // res.status(200).send('Welcome!');
    res.status(200).json(
        { message: "Welcome!", joke: "Dad joke here" }
    );
})

    

app.get('/api/v1/tours', (req, res) => { 

});

const port = 3000;
app.listen(port, () => { 
    console.log(`Running. on port ${port}..`);
})