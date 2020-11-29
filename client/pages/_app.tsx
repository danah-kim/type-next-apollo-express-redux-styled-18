import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { ApolloProvider } from '@apollo/client';
import GlobalStyles from 'GlobalStyles';
import useApollo from 'lib/hooks/useApollo';
import useStore from 'lib/hooks/useStore';
import i18next from 'lib/i18n';
import supportLanguages from 'lib/language';
import 'normalize.css';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

type AppProps = {
  Component: () => ReactElement;
  pageProps: Record<string, unknown>;
};

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const client = useApollo(pageProps.initialApolloState);

  if (typeof window !== 'undefined') {
    const language = supportLanguages.getLocale(window.navigator.language);
    i18next.changeLanguage(language);
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
