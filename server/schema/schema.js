// contract defining object types and relationships between them 
const graphql = require ('graphql');
const _ =  require('lodash');
const Book = require('./../models/book')
const Author = require('./../models/author')


// GraphQLObejectType &GraphQLString are destructed from graphQL to be used
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql; 





//object types 
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () =>({
        id: {type :GraphQLID},
        name: {type :GraphQLString},
        genre: {type :GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                console.log(parent); //refers to books
                // return _.find(authors,{id:parent.authorid});
                return Author.findById(parent.authorid)
            }
        }
    }) // fileds is a function to avoid error when linking relationships
});
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () =>({
        id: {type :GraphQLID},
        name: {type :GraphQLString},
        age: {type :GraphQLInt},
        books :{
            type: new GraphQLList(BookType),// the author might have a list of books wrote so we use GraphQLList
            resolve(parent,args){
                // return _.filter(books,{authorid:parent.id})// this looks for the books a specific author wrote by looking through to find matching authorids
                return Book.find({authorid:parent.id});
            }
        }
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
                // return  _.find(books,{id:args.id});
                return Book.findById(args.id);
            }
        },
        // Finds authors 
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id});
                return Author.findById(args.id)
            }
        },
        //Gets list of all the books
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({})
            }
        },
        //Gets list of all the authors 
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({})
            }
        }
          
    
    }
})

//Mutaions 

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{ 
                name: {type : new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({ //author here refers to the model db
                    name: args.name,
                    age: args.age 
                }); 
               return author.save() 
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorid:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid:args.authorid
                });
                return book.save();
            }
        }
       
    }
})

module.exports =  new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation 
})