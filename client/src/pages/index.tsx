import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import Layout from 'components/Layout';
import { USER_QUERY, GetUserResponse } from 'graphql/user';
import useTypedSelector from 'hooks/useTypedSelector';
import initializeApollo from 'lib/apollo';
import i18next from 'lib/i18n';
import React, { useEffect } from 'react';
import { initializeStore, userActions } from 'store';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 50px;
`;

function Index() {
  const { name } = useTypedSelector((state) => state.user);
  const { data } = useQuery<GetUserResponse>(USER_QUERY, { variables: { id: 2 } });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.user) {
      const { email, name } = data.user;

      dispatch(userActions.setUser({ id: 2, email, name }));
    }
  }, []);

  return (
    <Layout>
      <Title>
        {i18next.t('hello')} {name}
      </Title>
    </Layout>
  );
}

export async function getStaticProps() {
  const reduxStore = initializeStore();
  const apolloClient = initializeApollo();
  const { dispatch } = reduxStore;

  const { data } = await apolloClient.query({
    query: USER_QUERY,
    variables: { id: 1 },
  });

  if (data?.user) {
    const { email, name } = data.user;
    await dispatch(userActions.setUser({ id: 1, email, name }));
  }

  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Index;
