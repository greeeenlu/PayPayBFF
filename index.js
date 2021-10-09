const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    email: "asdf@paypay.com",
    name: "user-1",
    level: 0,
    reviewIds: [1, 2]
  },
  {
    id: 2,
    email: "qwer@paypay.com",
    name: "user-2",
    level: 0,
    reviewIds: [3, 4]
  },
  {
    id: 3,
    email: "zxcv@paypay.com",
    name: "user-3",
    level: 0,
    reviewIds: [5, 6]
  }
];

const reviews = [
  {
    id: 1,
    reviewerId: 2,
    revieweeId: 1,
    feedback: "good!",
    createdAt: "2021/10/10"
  },
  {
    id: 2,
    reviewerId: 2,
    revieweeId: 1,
    feedback: "good!",
    createdAt: "2021/10/10"
  },
  {
    id: 3,
    reviewerId: 1,
    revieweeId: 2,
    feedback: "good!",
    createdAt: "2021/10/10"
  },
  {
    id: 4,
    reviewerId: 1,
    revieweeId: 2,
    feedback: "good!",
    createdAt: "2021/10/10"
  },
  {
    id: 5,
    reviewerId: 1,
    revieweeId: 3,
    feedback: "good!",
    createdAt: "2021/10/10"
  },
  {
    id: 6,
    reviewerId: 2,
    revieweeId: 3,
    feedback: "good!",
    createdAt: "2021/10/10"
  }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    level: Int
    reviews: [Review]
  }

  type Review {
    id: ID!
    reviewer: User
    reviewee: User
    feedback: String
    createdAt: String
  }

  type Query {
    hello: String
    user: User
    employees: [User]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!",
    user: (root, args, context) => users[0],
    employees: (root, args, context) => users
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
