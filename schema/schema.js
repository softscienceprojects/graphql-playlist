const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = graphql;

const books = [
    {name: 'Name of the Wind', genre: 'fantasy', id: '1', authorId: '1'},
    {name: 'The final empire', genre: 'sci fi', id: '2', authorId: '2'},
    {name: 'The long earth', genre: 'sci fi', id: '3', authorId: '2'}
];

const authors = [
    {name: 'patrick rothfuss', age: 44, id: '1'},
    {name: 'erin nicole johnson', age: 38, id: '2'},
    {name: 'ben burney', age: 39, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { type: AuthorType,
            resolve(parent, args) {
                return authors.find(n=> parent.authorId == n.id)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    // has to be a function so it's not executed straight away - e.g. if running top to bottom
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        // a GraphQLList of type BookType
        books: { type: new GraphQLList(BookType), 
            resolve(parent, args) {
                return books.filter(n=> n.authorId == parent.id)
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    // how we initially jump into the graph
    name: "RootQueryType",
    // each of these is a type of 'root query' - different options/ different 'root queries'
    fields: {
        book: { //name of the query
            type: BookType,
            /* Query on front end would then look something like this
                book(id: 123){
                    name
                    genre
                }
            */
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db/other source
                return books.find(n=> n.id == args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return authors.find(n=> n.id == args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // what will be the query of this schema
    query: RootQuery
})