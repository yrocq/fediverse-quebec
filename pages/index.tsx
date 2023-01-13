import {Client} from "pg"
import punycode from 'punycode/';
import {format} from "date-fns";
import Main from "../layouts/main";
interface Props {
  instances: string[];
}

export default function Home({instances}: any): JSX.Element {
  return (
    <Main>
      <>
        <section className="section">
          <div className="container">
          <article className="message">
            <div className="message-header">
              À propos
            </div>
            <div className="message-body">
              <div className="block">
              <p>Ce site a pour vocation de promouvoir le Fédiverse, une approche décentralisée des réseaux sociaux, dont le plus célèbre représentant est <a href="https://joinmastodon.org/fr">Mastodon</a>.</p>
            <p>Vous trouverez ci-dessous des instances de cette application, destinées au public québécois. J&apos;ajouterai d&apos;autres informations au fil du temps.</p>
            <p>Idées, commentaires, et questions bienvenus</p></div>
            <p><strong>Me contacter</strong></p>
            <ul className="list">
              <li className="list-item"><a href="https://mastodonte.quebec/@yann">Mon profil Mastodon</a></li>
              <li className="list-item"><a href="https://form.jotform.com/230093323011236">Formulaire</a></li>
            </ul>
            </div>
          </article>
          </div>
        </section>
      <section className="section">
        <h1 className="title">Mastodon</h1>
        <div className="block">
          <strong>{instances.length} instances répertoriées</strong>
        </div>
        <div className="columns is-multiline is-vcentered">
          {instances.map((instance: any) => (
            <div className="column is-half" key={instance.domain_name}>
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4">{instance.title}</h2>
                    <h3 className="subtitle is-6">
                      <a href={`https://${instance.domain_name}`}>
                        {punycode.toUnicode(instance.domain_name)}
                      </a>
                    </h3>
                    <p className="three-lines">{instance.short_description}</p>
                  </div>
                  <div></div>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Utilisateurs</p>
                        <p className="title is-4">{instance.user_count}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Statut</p>
                        <p className="title is-4">{instance.status_count}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Inscriptions</p>
                        <p className="title is-4">
                          {instance.registrations ? "Ouvertes" : "Fermées"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="card-footer-item">
                    MAJ: {instance.updated_at}
                  </div>
                  <div className="card-footer-item">
                    <a href={`https://${instance.domain_name}`}>
                      Visiter l&apos;instance
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="block">
          <strong>Algorithme:</strong> Retourne toutes les instances Mastodon
          connues dont le nom de domaine ou la description contient le mot{" "}
          <em>&quot;Québec&quot;</em>. Tolérance pour l&apos;absence
          d&apos;accents, les variantes de minuscules/majuscules, et les mots
          dérivés, tels que <em>&quot;Québécoise&quot;</em> ou{" "}
          <em>&quot;Québécois&quot;</em>. Modération manuelle des nouvelles
          entrées, afin de filtrer les spammeurs et les sites haineux.
        </div>
      </section>
      </>
    </Main>
  )
}

export async function getStaticProps() {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect()
  const query = `SELECT
    title, domain_name, short_description, description, user_count, status_count, registrations, updated_at
    FROM instances WHERE domain_name like '%quebec%' OR title LIKE '%Qu_b_c%' OR short_description LIKE '%Qu_b_c%' OR description LIKE '%Qu_bec%' OR title LIKE '%Montr_eal%' OR short_description LIKE '%Montr_eal%' OR description LIKE '%Montr_eal%'  ORDER BY user_count DESC;`
  const result = await client.query(query);
  const instances = result.rows.map(
    (row) => {
      return {
        ...row, ...{updated_at: format(row.updated_at, `dd/MM/yyyy HH'h'mm`)}
      }
    }
  );
  return {
    props: { instances } as Props
  }
}
