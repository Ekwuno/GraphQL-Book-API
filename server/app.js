const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');// imported from other components 
const mongoose = require('mongoose')// imported from other components 
const cors = require('cors')

//middleware for understanding graphql with express, each time a requests hits the url the function fires 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// allow cross-origin requests
app.use(cors());



//connect to mlab database 
mongoose.connect("mongodb://Ekwuno:Souljaboy97@ds159184.mlab.com:59184/graphql-db");// mlab link 
mongoose.connection.once('open',()=>{
    console.log('connected to database')
});

app.listen(4000, ()=>{
    console.log('now listening for requests on port 4000');
})