const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  age:{
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  dist:{
    type: String,
    required: true
  },
  pincode:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },


  department:{
    type: String,
    required: true
  },
  book_date:{
    type: String,
    required: true
  },
  time_slot:{
    type: String,
    required: true
  },
  venue:{
    type: String,
    required: true
  },
  hospital:{
    type: String,
    required: true
  },
  

  date:{
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('bookings', NotesSchema);