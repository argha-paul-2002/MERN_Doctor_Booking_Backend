const express = require('express');
const router = express.Router();
const Note = require('../models/Bookings');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');



//ROUTE 1: ========== Get All the notes using: GET "/api/notes/getuser". Login required  =============

router.get('/fetchallbookings',fetchuser,async (req,res)=>{

    try {
        // Fetch all the notes where user id matches and store it to notes variable
        const notes = await Note.find({user: req.user.id})
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


//ROUTE 2: ========== Add a new Note using: POST "/api/notes/addnote". Login required  =============

router.post('/booking',fetchuser,async (req,res)=>{

    try {
        const {fname,lname,email,age,country,address,city,state,dist,pincode,phone,department,book_date,time_slot,venue,hospital} = req.body;
        // If there are errors, return bad request ans the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            fname,lname,email,age,country,address,city,state,dist,pincode,phone,department,book_date,time_slot,venue,hospital, user: req.user.id
        })
        const savedNote = await note.save();
        
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: ==========Update an Existing Note using: PUT "/api/notes/updatenote". Login required  =============

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title, description, tag} = req.body;
    try {
        // Create a newNote object
        const newNote={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not Found")}

        // Check , whether the author is changing the notes, If anyone else is trying to do so....send error
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


//ROUTE 4: ==========Delete an Existing Note using: DELETE "/api/notes/deletenote". Login required  =============

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not Found")}

        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports = router ;