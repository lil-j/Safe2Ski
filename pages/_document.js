import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/inter-var-latin.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta content="#ffffff" name="theme-color" />
                    <meta content="#ffffff" name="msapplication-TileColor" />
                </Head>
                <body className="bg-white dark:bg-black text-white dark:text-black">
                <Main />
                <NextScript />
                <script async defer src="https://sa.safe2ski.lilj.dev/latest.js"></script>
                <noscript><img src="https://sa.safe2ski.lilj.dev/noscript.gif" alt=""/></noscript>
                </body>
            </Html>
        );
    }
}

export default MyDocument;