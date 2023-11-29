const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config()

//*Create express server
const app = express();

//*Database
dbConnection()

//*CORS
app.use(cors())

//*Directory public
app.use( express.static('public') );

//*Reading & Parse of the body
app.use( express.json() );

//*Routes
app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/event', require('./routes/events') )
//TODO: CRUD: Events

//*Listen requests
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});