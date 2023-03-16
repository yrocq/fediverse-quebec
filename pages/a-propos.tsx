import Link from "next/link"
import Main from "../layouts/main"

export default function About()  {
  return (
    <Main>
        <section className="section">
        <div className="container box">
          <h1 className="title">À propos</h1>
          <div className="block content">
            <p>Ce site a pour vocation de promouvoir le Fédiverse, une approche décentralisée des réseaux sociaux, dont le plus célèbre représentant est <a href="https://joinmastodon.org/fr">Mastodon</a>.</p>
            <p>
              Il propose une liste d&apos;<Link href="/instances">instances</Link> Mastodon s&apos;identifiant au Québec, avec des informations  mises à jour à chaque heure.
            </p>
            <p>
              D&apos;autres fonctionnalités sont en cours de développement.
            </p>
            <p>N&apos;hésitez pas à me contacter pour toute question ou suggestion.</p>
            </div>
            <div className="block">
            <p><strong>Me contacter</strong></p>
            <p>Yann Rocq</p>
            <ul className="list">
              <li className="list-item"><a href="https://mastodonte.quebec/@yann" rel="me">Mon profil Mastodon</a></li>
              <li className="list-item"><a href="https://form.jotform.com/230093323011236">Formulaire</a></li>
            </ul>
            </div>
          </div>
        </section>        
    </Main>
  )
}