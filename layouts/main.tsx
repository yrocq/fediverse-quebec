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
      <nav className="navbar has-background-white-ter" role="navigation" aria-label="main navigation">
      <div className="navbar-brand navbar-end">
        <div className="navbar-end">
        <Link href='/' className="navbar-item">Accueil</Link>
        <Link href='/instances' className="navbar-item">Instances</Link>
          <Link href='/a-propos' className="navbar-item">À propos</Link></div>
      </div>
      </nav>
      <div className="has-background-white-ter">
      {children}
      </div>
      <footer className="footer">
        <div className="content">
          &copy; Yann Rocq. Sauf mention contraire, tous les textes de ce site sont publiés sous licence <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr">Creative Commons BY-SA 4.0</a>.    
        </div>
      </footer>

            
    </>
  );
}
