import Main from "../../layouts/main"
import Client from "../../src/client"
import { Instance } from "../../src/models/instance";

import sanitizeHtml from 'sanitize-html';
import DomainLink from "../../src/components/domain-link";

interface Props {
  instance: Instance
}

export default function InstancePage({instance}:Props)  {
  return (
    <Main>
      <div className="section">
        <div className="block">
        <h1 className="title">
        <i className="fab fa-mastodon"></i> {instance.title}
        </h1>
        </div>
        <div className="label">
          <div className="control">Domaine</div>
        </div>
        <div className="columns">
            <div className="column is-half">
            <DomainLink domain={instance.domain_name} />
            </div>
          </div>
        <div>

        </div>
        <div className="block">
          <div className="field">
            <div className="label">
              Description courte
            </div>
            <div className="columns">
              <div className="column is-half content" dangerouslySetInnerHTML={{__html: sanitizeHtml(instance.short_description) }}></div>
            </div>
          </div>
        </div>
        <div className="block">
        <div className="field">
          <h2 className="label">
            Description longue
          </h2>
          <div className="columns">
            <div className="column is-half content" dangerouslySetInnerHTML={{__html: sanitizeHtml(instance.description) }}>
            </div>
          </div>
        </div>
        </div>
        <div className="block">
          <div className="field">
            <div className="label">Nombe d&apos;utilisateurs actifs</div>
            <div>{instance.user_count}</div>
          </div>
        </div>
        <div className="block">
          <div className="field">
            <div className="label">Nombe de status</div>
            <div>{instance.status_count}</div>
          </div>
        </div>
        <div className="block">
          <div className="field">
            <div className="label">Inscriptions</div>
            <div>{instance.registrations?'Ouvertes':'Fermées'}</div>
          </div>
        </div>
        <div className="block">
          <div className="field">
            <div className="label">Date de découverte</div>
            <div>{instance.created_at}</div>
          </div>
        </div>
        <div className="block">
          <div className="field">
            <div className="label">Date de dernière mise à jour</div>
            <div>{instance.updated_at}</div>
          </div>
        </div>
      </div>         
    </Main>
  )
}

type StaticProps = {params: {domain: string}}

export async function getStaticProps({params}: StaticProps) {
  const client = new Client();
  const instance = await client.fetchInstanceByDomain(params.domain);
  return {
    props: { instance }
  }
}

export async function getStaticPaths() {
  const client = new Client();
  const instances = await client.fetchAllInstances();
  const paths = instances.map(
    (instance) => 
       ({
        params: {
          domain: instance.domain_name
        }
      })
  
  );
  return {
    paths,
    fallback: false,
  }
}