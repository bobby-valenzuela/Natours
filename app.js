const express = require('express');
const fs = require('fs');
const { dirname } = require('path');

const app = express();

///// Middleware

// This middle is needed to parse POST request body
app.use(
    express.json()
)


const toursFile = `${__dirname}/dev-data/data/tours-simple.json`;


//////////////////////////////////////////////////////////////////

const tours = JSON.parse(fs.readFileSync(toursFile));

const welcome =  (req, res) => { 
    // res.status(200).send('Welcome!');
    res.status(200).json( { message: "Welcome!", joke: "Dad joke here" });
}
    
const getTours = (req, res) => { 
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
};

const getTour = (req, res) => {
    
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
}

const updateTour =  (req, res) => {
    
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
            tour: '< Updated tour here... >'
        }
    })
}

const deleteTour = (req, res) => {
    
    const tourId = +req.params.id;
    const tour = tours.find(el=> el.id === tourId)

    if (!tour) { 
        return res.status(404).json({
            status: "fail",
            message:"InvalidID"
        })
    }

    // 204 status code = 'no content' because nothing to return
    res.status(204).json({
        status: 'null',
        data: null
    })
}

const createTour = (req, res) => {

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

};

//////////////////////////////////////////////////////////////////
///// Handling requests

// Pre-refactor
// app.get('/', welcome)
// app.get('/api/v1/tours', getTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

app.get('/', welcome)

app.route('/api/v1/tours')
    .get(getTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);



// Start API
const port = 3000;
app.listen(port, () => { 
    console.log(`Running. on port ${port}..`);
})