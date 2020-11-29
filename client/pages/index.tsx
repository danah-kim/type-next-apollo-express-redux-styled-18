import { useQuery } from '@apollo/client';
import Layout from 'components/Layout';
import { GetUserResponse, USER_QUERY } from 'graphql/user';
import initializeApollo from 'lib/apollo';
import i18next from 'lib/i18n';
import { useSelector } from 'react-redux';
import { initializeStore, userActions } from 'store';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  a {
    color: #0070f3;
    text-decoration: none;

    :hover,
    :focus,
    :active {
      text-decoration: underline;
    }
  }
`;

const Description = styled.p`
  line-height: 1.5;
  font-size: 1.5rem;
  text-align: center;
`;

const Code = styled.code`
  background-color: #fafafa;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
    monospace;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Card = styled.a`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-left: 0.5rem;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.img`
  height: 1em;
`;

function Home() {
  const { name } = useSelector((state: RootState) => state.user);
  const { data } = useQuery<GetUserResponse>(USER_QUERY, { variables: { id: 2 } });

  if (data?.user) {
    console.log(data.user);
  }

  return (
    <Layout title="Create Next App">
      <Container>
        <Main>
          <Title>
            {i18next.t('hello')} {name} Welcome to <a href="https://nextjs.org">Next.js!</a>
          </Title>
          <Description>
            Get started by editing <Code>pages/index.js</Code>
          </Description>
          <Grid>
            <Card href="https://nextjs.org/docs">
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </Card>
            <Card href="https://nextjs.org/learn">
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </Card>
            <Card href="https://github.com/vercel/next.js/tree/master/examples">
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </Card>
            <Card href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
              <h3>Deploy &rarr;</h3>
              <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
            </Card>
          </Grid>
        </Main>
        <Footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <Logo src="/vercel.svg" alt="Vercel Logo" />
          </a>
        </Footer>
      </Container>
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

export default Home;
