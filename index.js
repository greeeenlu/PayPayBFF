const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    password: "1234",
    email: "asdf@paypay.com",
    name: "user-1",
    role: 0,
    reviewIds: [1, 2],
    revieweeIds: [2, 3]
  },
  {
    id: 2,
    password: "5678",
    email: "qwer@paypay.com",
    name: "user-2",
    role: 0,
    reviewIds: [3, 4],
    revieweeIds: [1]
  },
  {
    id: 3,
    password: "9012",
    email: "zxcv@paypay.com",
    name: "user-3",
    role: 0,
    reviewIds: [5, 6],
    revieweeIds: []
  },
  {
    id: 4,
    password: "9999",
    email: "admin@paypay.com",
    name: "admin",
    role: 1024,
    reviewIds: [],
    revieweeIds: [1, 2, 3]
  }
];

const reviews = [
  {
    id: 1,
    reviewerId: 2,
    revieweeId: 1,
    feedback: "good!",
    createdAt: "2018-10-22T01:40:14.941Z"
  },
  {
    id: 2,
    reviewerId: 2,
    revieweeId: 1,
    feedback: "good!",
    createdAt: "2018-10-22T01:40:24.941Z"
  },
  {
    id: 3,
    reviewerId: 1,
    revieweeId: 2,
    feedback: "good!",
    createdAt: "2018-10-22T01:40:34.941Z"
  },
  {
    id: 4,
    reviewerId: 1,
    revieweeId: 2,
    feedback: "good!",
    createdAt: "2018-10-22T01:41:14.941Z"
  },
  {
    id: 5,
    reviewerId: 1,
    revieweeId: 3,
    feedback: "good!",
    createdAt: "2018-10-22T01:42:14.941Z"
  },
  {
    id: 6,
    reviewerId: 2,
    revieweeId: 3,
    feedback: "good!",
    createdAt: "2018-10-22T01:43:14.941Z"
  }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    role: Int
    reviews: [Review]
    reviewees: [User]
  }

  type Review {
    id: ID!
    reviewer: User
    reviewee: User
    feedback: String
    createdAt: String
  }

  type Query {
    user: User
    employees: [User]
  }
`;

//helper functions
const filterReviewsByIds = (reviewIds) =>
  reviews.filter((review) => reviewIds.includes(review.id));
const filterRevieweesByIds = (revieweeIds) =>
  users.filter((user) => revieweeIds.includes(user.id));

const findUserByUserId = (userId) =>
  users.find((user) => user.id === Number(userId));

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (root, args, context) => users[3],
    employees: (root, args, context) => users
  },
  User: {
    reviews: (parent, args, context) =>
      filterReviewsByIds(parent.reviewIds || []),
    reviewees: (parent, args, context) =>
      filterRevieweesByIds(parent.revieweeIds || [])
  },
  Review: {
    reviewer: (parent, args, context) => findUserByUserId(parent.reviewerId),
    reviewee: (parent, args, context) => findUserByUserId(parent.revieweeId)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
