const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");


//POst method for adding menu in Db
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newItem = new MenuItem(data);

        const response = await newItem.save();
        console.log("Item Data saved");
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"}); 
    }
})



//GET method to get items 

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data Feched Successfully");
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})


router.get("/:tasteType", async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == "sweet" || tasteType == "spicy" || tasteType == 'sour') {
            const response = await MenuItem.find({taste: tasteType});
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

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, 
            runValidators: true,
        })
        if(!response) {
            return res.status(404).json({error: "PAGE NOT FOUND"});
        }

        console.log("data updated");
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req. params.id;

        //Assuming you have a Menu model
        const response = await MenuItem.findByIdAndDelete(menuId);
         if (!response) {
            return res.status(404).json({error: 'Menu NOt Found'});
        }
        console.log("data deleted");
        res.status(200).json({message: "Menu Deleted Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;