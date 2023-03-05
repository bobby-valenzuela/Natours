const express = require('express');
const fs = require('fs');
const { dirname } = require('path');

const app = express();

///// Middleware

// This middle is needed to parse POST request body
app.use(
    express.json()
)


///// Handling requests
const toursFile = `${__dirname}/dev-data/data/tours-simple.json`;
    
app.get('/', (req, res) => { 
    // res.status(200).send('Welcome!');
    res.status(200).json(
        { message: "Welcome!", joke: "Dad joke here" }
    );
})

const tours = JSON.parse(fs.readFileSync(toursFile));

// Get all tours
app.get('/api/v1/tours', (req, res) => { 
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
});

// Get tour by id
app.get('/api/v1/tours/:id', (req, res) => {
    
    const tourId = +req.params.id;
    const tour = tours.find(el=> el.id === tourId)

    if (!tour) { 
        return res.status(404).json({
            status: "fail",
            message:"InvalidID"
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
});

// Create tour
app.post('/api/v1/tours', (req, res) => { 

    const nextId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: nextId }, req.body);
    console.log(newTour);
    tours.push(newTour);
    fs.writeFile(toursFile, JSON.stringify(tours), err => { 

        if (err) console.err(err)

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })

});


// Start API
const port = 3000;
app.listen(port, () => { 
    console.log(`Running. on port ${port}..`);
})