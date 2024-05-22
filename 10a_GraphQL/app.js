import { ApolloServer, gql } from 'apollo-server';
import { PubSub } from 'graphql-subscriptions';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));


//adding data to the graphql, just so it it possible to get data
let authors = [
  { id: '1', name: 'Author One' },
  { id: '2', name: 'Author Two' }
];

let books = [
  { id: '1', title: 'Book One', releaseYear: 2001, authorId: '1' },
  { id: '2', title: 'Book Two', releaseYear: 2002, authorId: '2' }
];

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find(author => author.id === id),
  },
  Mutation: {
    createBook: (_, { authorId, title, releaseYear }) => {
      const book = {
        id: `${books.length + 1}`,
        authorId,
        title,
        releaseYear,
        author: authors.find(author => author.id === authorId)
      };
      books.push(book);
      pubsub.publish(BOOK_ADDED, { bookAdded: book });
      return book;
    },
    updateBook: (_, { id, authorId, title, releaseYear }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) return null;
      const updatedBook = { ...books[bookIndex], authorId, title, releaseYear };
      books[bookIndex] = updatedBook;
      return updatedBook;
    },
    deleteBook: (_, { id }) => {
      books = books.filter(book => book.id !== id);
      return { message: 'Book deleted successfully' };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
  Book: {
    author: (book) => authors.find(author => author.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter(book => book.authorId === author.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
