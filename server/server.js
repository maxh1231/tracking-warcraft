require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
const db = require('./config/connection');
const authRouter = require('./controllers')
const passport = require('./passport/setup');
const { authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
};

startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/turtle',
  })
}))

app.use(passport.initialize());
app.use(passport.session());

// set url to allow origin (client URL)
if (process.env.NODE_ENV === 'production') {
  var corsOptions = {
      origin: 'http://localhost:3000',
  };
} else {
  var corsOptions = {
      origin: 'http://localhost:3000',
  };
}
app.use(cors(corsOptions));

app.use('/', authRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});