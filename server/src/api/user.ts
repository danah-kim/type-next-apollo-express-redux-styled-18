import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const USER_LIST_URL = `${BASE_URL}/users`;

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const getUser = async (id: number) => {
  const { data }: AxiosResponse<User[]> = await axios(USER_LIST_URL, {
    method: 'get',
    params: {
      id,
    },
  });

  return data[0];
};
