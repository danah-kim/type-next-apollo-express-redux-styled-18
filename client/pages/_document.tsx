import Document, { DocumentContext } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // render() {
  //     return (
  //         <Html>
  //             <Head>
  //                 <title>Server Title</title>
  //                 <meta charSet="utf-8" />
  //                 <meta
  //                     name="viewport"
  //                     content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
  //                 />
  //             </Head>
  //             <body>
  //                 <Main />
  //                 <NextScript />
  //             </body>
  //         </Html>
  //     );
  // }
}
