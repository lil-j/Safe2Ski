import "../styles/globals.css"
import 'react-circular-progressbar/dist/styles.css';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return <>
      <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
      />
      <Component {...pageProps} />
    </>
}

export default MyApp
