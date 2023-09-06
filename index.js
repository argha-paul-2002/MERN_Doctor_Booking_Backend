const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.get('/', (req, res) => {
  res.send('Hello Argha!')
})
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));


app.listen(port, () => {
  console.log(`medico app listening on port http://localhost:${port}`)
})
