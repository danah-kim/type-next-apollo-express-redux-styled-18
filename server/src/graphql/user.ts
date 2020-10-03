import { getUser } from '../api/user';

import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

export const typeDef = gql`
  type User {
    id: Int!
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }
  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }
  type Geo {
    lat: String
    lng: String
  }
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }
  extend type Query {
    user(id: Int): User
  }
`;

export const resolvers: IResolvers = {
  Query: {
    async user(_, { id }) {
      return await getUser(id);
    },
  },
};
