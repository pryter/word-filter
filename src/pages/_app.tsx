import '../styles/tailwind.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <div>
    <Head>
      <title>รับบริจาคคำหยาบงับ</title>
    </Head>
    <Component {...pageProps} />
  </div>
}

export default MyApp
