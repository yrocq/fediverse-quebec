  import Main from "../layouts/main";
  import Client from '../src/client';
  import { Instance } from '../src/models/instance';
  import { getAllPosts } from '../modules/blog';
  import Post from "../modules/blog/types/post";
  import { MDXRemote } from "next-mdx-remote";
  import { dateFormatLong } from "../src/common/date";
  import { formatNumber } from "../src/common/number";
import Link from "next/link";

  interface Props {
    instances: Instance[];
    posts: Post[];
    statistics: any;
  }

  export default function Home({instances, posts, statistics}: Props): JSX.Element {
    return (
      <Main>
        <>
        <section className="section columns mb-6">
          <div className="column is-half">
          {
            posts.map(post => (
              <div key={post.slug} className="box">
                    <div className="header mb-4">
                      <h2 className="title mb-0">{post.title}</h2>
                      <p><em>{dateFormatLong(new Date(post.created))}, par Yann</em></p>
                    </div>
                  <div className="content has-text-justified">
                  <MDXRemote  {...post.content}  />
                </div>
                </div>
              )
            )}
          </div>
          <div className="column">
            <div className="box">
              <h2 className="title">Statistiques</h2>
              <div className="block">
              <h3 className="subtitle">Québec</h3>
              <p><strong>{formatNumber(statistics.quebec_instances)}</strong> instances québécoises reconnues</p>              
              <p><strong>{formatNumber(statistics.quebec_users)}</strong> utilisateurs actifs</p>
              <p><strong>{formatNumber(statistics.quebec_statuses)}</strong> statuts publiés</p>
              <p className="">Données mises à jour toutes les heures</p>
              <p className="mt-2"><Link href="/instances">Voir les instances</Link></p>
                </div>
                <div className="block">
                <h3 className="subtitle">Fediverse</h3>
              <p><strong>{formatNumber(statistics.instances)}</strong> instances parcourues</p>
              <p><strong>{formatNumber(statistics.users)}</strong> utilisateurs actifs</p>
              <p><strong>{formatNumber(statistics.statuses)}</strong> statuts publiés</p>
              <p>Nombre d&apos;utilisateurs et de statuts au moment de la découverte des instances. Les données ne sont pas mises à jour pour le moment.</p>
                </div>
            </div>
                </div>
          
        </section>
        </>
      </Main>
    )
  }

  export async function getStaticProps(): Promise<{ props: Props }> {
    const client = new Client();

    const instances = await client.fetchAllInstances();
    const posts = await getAllPosts();
    const statistics = await client.getStatistics();

    return {
      props: { instances, posts, statistics }
    }
  }
