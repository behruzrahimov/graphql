const express = require("express");

const { graphqlHTTP } = require("express-graphql");

const cors = require("cors");

const app = express();

app.use(cors());

const schema = require("./schema");

const users = [{ id: 1, username: "Hello world", age: 25 }];

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },

  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },

  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

const port = 8080;

app.listen(port, () =>
  console.log(`server started on port http://localhost:${port}`)
);
