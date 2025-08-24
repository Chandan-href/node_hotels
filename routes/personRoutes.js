const express = require("express");
const router = express.Router();
const Person = require("../models/person");

//POST method to add a person in db
router.post('/', async (req, res) => {
    try{
        const data = req.body;  //Assuming the request body conatins the person data

        //Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to database
        const response = await newPerson.save();
        console.log("data Saved");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

//Get method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data Feched Successfully");
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;   //Exctract the work from the URL parameter
        if(workType == 'Chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work: workType});
            console.log("response fatched");
            res.status(200).json(response);
        }
        else{
            res.status(500).json({error: "invalid work type"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})


router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;     //extract the id from the URL parameter
        const updatedPersonData = req.body;   //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,  //Ruturn the updated document
            runValidators: true,  //Run Mongoose Validation
        })

        if (!response) {
            return res.status(404).json({error: 'Person NOt Found'});
        }

        console.log("data Updated");
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const personId = req. params.id;

        //Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
         if (!response) {
            return res.status(404).json({error: 'Person NOt Found'});
        }
        console.log("data deleted");
        res.status(200).json({message: "Person Deleted Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})


module.exports = router;