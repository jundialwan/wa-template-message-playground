import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
