import Head from "next/head";
import config from "../config"
import Link from "next/link";
import Script from 'next/script';

interface Props {
  children: JSX.Element
}

export default function Main({children}: Props): JSX.Element {
  return (
    <>
      <Script src="https://kit.fontawesome.com/6e1c818815.js"></Script>
      <Head>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.tag_line} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero has-background-link-dark">
        <div className="hero-body">
        <Link href='/'><h1 className="title is-2 has-text-white">{config.site.title}</h1></Link>
          <div className="subtitle has-text-white">{config.site.tag_line}</div>
        </div>
      </div>
      {children}
    </>
  );
}
