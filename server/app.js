const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');

//middleware for understanding graphql with express, each time a requests hits the url the function fires 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log('now listening for requests on port 4000');
})