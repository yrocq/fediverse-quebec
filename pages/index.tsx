import Main from "../layouts/main";
import Link from "next/link";
import Client from '../src/client';
import { Instance } from '../src/models/instance';
import TitleWithIcon from '../src/components/title-with-icon';
import DomainLink from '../src/components/domain-link';

interface Props {
  instances: Instance[];
}

export default function Home({instances}: any): JSX.Element {
  return (
    <Main>
      <>
      <section className="section">
        <TitleWithIcon></TitleWithIcon>
        <div className="block">
          <strong>{instances.length} instances répertoriées</strong>
        </div>
        <div className="columns is-multiline is-vcentered">
          {instances.map((instance: any) => (
            <div className="column is-half" key={instance.domain_name}>
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4" ><Link className=' has-text-black' href={'instances/' + instance.domain_name}>{instance.title}</Link></h2>
                    <h3 className="subtitle is-6">
                      <DomainLink domain={instance.domain_name}></DomainLink>
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
                        <p className="heading">Statuts</p>
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
                      Visiter
                    </a>
                  </div>
                  <div className="card-footer-item">
                    <Link href={'instances/' + instance.domain_name}>Infos</Link>
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
  const client = new Client();

  const instances = await client.fetchAllInstances();

  return {
    props: { instances } as Props
  }
}
