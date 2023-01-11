import Head from "next/head";
import config from "../config"
import Link from "next/link";

interface Props {
  children: JSX.Element
}

export default function Main({children}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.tag_line} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero has-background-link-dark">
        <div className="hero-body">
          <h1 className="title is-2 has-text-white">{config.site.title}</h1>
          <div className="subtitle has-text-white">{config.site.tag_line}</div>
        </div>
      </div>
      {children}
    </>
  );
}
