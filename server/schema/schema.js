// contract defining object types and relationships between them 
const graphql = require ('graphql');
const _ =  require('lodash')

// GraphQLObejectType &GraphQLString are destructed from graphQL to be used
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
    } = graphql; 


//dummy data to test resolver functions 
var books = [
    {name:'Name of the Wind', genre:'Fantasy',id:'1'},
    {name:'The Final Empire', genre:'Fantasy',id:'2'},
    {name:'The Long Earth', genre:'Sci-Fi',id:'3'}
];

//dummy data for authors 
var authors = [
    {name:'Patrick yams',age:44,id:'1'},
    {name:'Ekwuno Obinna',age:22,id:'2'},
    {name:'chinyere Nnaji',age:21,id:'3'}
];


//object types 
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () =>({
        id: {type :GraphQLID},
        name: {type :GraphQLString},
        genre: {type :GraphQLString}
    }) // fileds is a function to avoid error when linking relationships
});
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () =>({
        id: {type :GraphQLID},
        name: {type :GraphQLString},
        age: {type :GraphQLInt}
    }) // fileds is a function to avoid error when linking relationships
});



//Root queries are how we describe a user can jump into the graph and get data
//rootquery 
const RootQuery =  new GraphQLObjectType({
    name:'RootQueryType',
    fields : {
        //entry points into the grphql rootquery 
        book:{
                type: BookType,
                args:{ id:{type:GraphQLID}},
                resolve(parent,args){
                //code to get data from db 
                return  _.find(books,{id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id});
            }
        },
          
    
    }
})

module.exports =  new GraphQLSchema({
    query : RootQuery
})