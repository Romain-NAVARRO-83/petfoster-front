function Error404() {
  return (
    <>
      <div className="has-text-centered">
        <h1 className="title">Page non trouvée</h1>
      </div>

      <section className="section">
        <div className="container has-text-centered">
          <p>Oups ! La page que vous recherchez n'existe pas.</p>
          <a href="/" className="button is-primary">
            Retour à l'accueil
          </a>
        </div>
      </section>
    </>
  );
}

export default Error404;
