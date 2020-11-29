import * as user from './user';

import { gql, IResolvers } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

const typeDef = gql`
  type Query {
    _version: String
  }
  type Mutation {
    _empty: String
  }
`;

export const resolvers: IResolvers = {
  Query: {
    _version: () => '1.0',
  },
  Mutation: {},
};

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [typeDef, user.typeDef],
  resolvers: merge(resolvers, user.resolvers),
});

export default schema;
