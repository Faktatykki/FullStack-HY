require('dotenv').config()

const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const url = process.env.MONGODB_URI
const JWT_SECRET = 'SECRET_KEY'

//SEURAAVAKS 8.18
mongoose.connect(url)
.then(() => {
  console.log(`connected to ${url}`)
})
.catch(e => {
  console.log(e.message)
})

const typeDefs = gql`
  type User {
      username: String!
      favoriteGenre: String!
      id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
      name: String!
      born: Int
      bookCount: Int!
  }
  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
  }
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }
  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: async () => await Book.collection.countDocuments(),
      authorCount: async () => await Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.genre) {
          return await Book.find( { genres: { $in: args.genre }} )
        }
        return await Book.find({}).populate('author')
      },
      allAuthors: async () => await Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Author: {
      name: (root) => root.name,
      bookCount: async (root) => {
        const authorBooks = await Book.find({ author: { $in: root.id } })
        return authorBooks.length
      }
  },
  Book: {
    author: async (book) => {
      const author = await Author.findById(book.author)
      return {
        name: author.name,
        id: author.id,
      }
    }
  },
  Mutation: {
      createUser: (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        return user.save()
          .catch(e => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args, context) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError('Wrong credentials!')
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError('You must be logged in order to add book')
        }

        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author, born: null, bookCount: 1 })
        }

        const book = new Book({ 
          title: args.title,
          published: args.published,
          author: author.id,
          genres: args.genres })

        try {
          await author.save()
          book.populate('author')
          await book.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        
        return book
      },
      editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError('You must be logged in order to edit author')
        }

        const author = await Author.findOne({ name: args.name })

        if (!author) {
          return null
        }

        author.born = args.setBornTo

        return author.save()
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)
      
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Eavesdropping subs at ${subscriptionsUrl}`)
})