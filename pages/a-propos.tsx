import Main from "../layouts/main"

export default function About()  {
  return (
    <Main>
        <section className="section">
        <div className="container">
          <h1 className="title">À propos</h1>
          <div className="block">
            <p>Ce site a pour vocation de promouvoir le Fédiverse, une approche décentralisée des réseaux sociaux, dont le plus célèbre représentant est <a href="https://joinmastodon.org/fr">Mastodon</a>.</p>
            <p>Vous trouverez ci-dessous des instances de cette application, destinées au public québécois. J&apos;ajouterai d&apos;autres informations au fil du temps.</p>
            <p>Idées, commentaires, et questions bienvenus</p>
            </div>
            <div className="block">
            <p><strong>Me contacter</strong></p>
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