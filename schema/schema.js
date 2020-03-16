const graphql = require('graphql');
const _ = require('lodash');
const book = require('../models/book');
const author = require('../models/author');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

/* var books = [
    {name: 'Name of the Wind', genre:'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre:'Fantasy', id: '2', authorId: '2'},
    {name: 'Shawshank Redemption', genre:'Fiction', id: '3', authorId: '3'},
    {name: 'The Hero of Age', genre:'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre:'Fantasy', id: '5', authorId: '2'},
    {name: 'The Light Fantastic', genre:'Fantasy', id: '6', authorId: '1'},
    
];

var authors = [
    {name: 'Patrick Rothfuss', age:44, id: '1'},
    {name: 'Brandon Sanderson', age:44, id: '2'},
    {name: 'Stephen King', age:72, id: '3'},
];
    
 */
const BookType = new GraphQLObjectType ({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                //return _.find(authors, {id: parent.authorId});
            }
        }

    })
});

const AuthorType = new GraphQLObjectType ({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent);
               // return _.filter(books, {authorId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args) {
                console.log(typeof(args.id));
               // return _.find(books,{id:args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args) {
              //  return _.find(authors,{id:args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
            //return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
              //  return authors
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});