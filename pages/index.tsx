import { AppProps } from 'next/app';
import Head from 'next/head'
import {Client} from "pg"
import punycode from 'punycode/';
import config from "../config"

interface Props {
  instances: string[];
}

export default function Home({instances}: any): JSX.Element {
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
          <div className='title is-2 has-text-white'>{config.site.title}</div>
          <div className='subtitle has-text-white'>{config.site.tag_line}</div>
        </div>
      </div>

      <section className='section'>

        <h1 className='title'>Mastodon</h1>
        <div className='block'><strong>{instances.length} instances répertoriées</strong></div>
        <div className="columns is-multiline is-vcentered">
        {
          instances.map(
            (instance: any) => <div className="column is-half" key={instance.domain_name}><div className='card' >
              <div className="card-content">
                  <div className='content'>
                  <h2 className='title is-4'>{instance.title}</h2>
                  <h3 className='subtitle is-6'><a href={`https://${instance.domain_name}`}>{punycode.toUnicode(instance.domain_name)}</a></h3>
                    <p className='three-lines'>{instance.short_description}</p>
                  </div>
                  <div>
                    
                  </div>
                  <div className='level'>
                  <div className="level-item has-text-centered">
                    <div>
                    <p className="heading">Utilisateurs</p>
      <p className="title is-4">{instance.user_count}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                    <p className="heading">Status</p>
      <p className="title is-4">{instance.status_count}</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                    <p className="heading">Inscriptions</p>
      <p className="title is-4">{instance.registrations?'Ouvertes':"Fermées"}</p>
                    </div>
                  </div>                    
                  </div>
                  </div>
                  <div className="card-footer">
                    <div className="card-footer-item">
                    <a href={`https://${instance.domain_name}`}>Visiter l&apos;instance</a>
                    </div>
                  </div>
            </div></div>
          )
        } 
        </div>
        <div className='block'><strong>Algorithme:</strong> Retourne toutes les instances Mastodon connues dont le nom de domaine ou la description contient le mot <em>&quot;Québec&quot;</em>.
        Tolérance pour l&apos;absence d&apos;accents, les variantes de minuscules/majuscules, et les mots dérivés, tels que <em>&quot;Québécoise&quot;</em> ou <em>&quot;Québécois&quot;</em>. Modération manuelle des nouvelles entrées, afin de filtrer les spammeurs et les sites haineux.</div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect()
  const query = `SELECT title, domain_name, short_description, description, user_count, status_count, registrations FROM instances WHERE domain_name like '%quebec%' OR title LIKE '%Qu_b_c%' OR short_description LIKE '%Qu_b_c%' OR description LIKE '%Qu_bec%' OR title LIKE '%Montr_eal%' OR short_description LIKE '%Montr_eal%' OR description LIKE '%Montr_eal%'  ORDER BY user_count DESC;`
  const result = await client.query(query);
  const instances = result.rows as string[];
  return {
    props: { instances } as Props
  }
}
