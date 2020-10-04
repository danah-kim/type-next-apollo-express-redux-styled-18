import { gql } from '@apollo/client';

export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    user(id: $id) {
      email
      name
    }
  }
`;

export type GetUserResponse = {
  user: User;
};
