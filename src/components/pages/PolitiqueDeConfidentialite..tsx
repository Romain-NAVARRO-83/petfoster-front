const PrivacyPolicy = () => {
  return (
    <>
      <div>
        <h1 className="title">Politique de confidentialité</h1>
      </div>
      
      {/* Section d'introduction */}
      <div className="section px-5">
        <div className="container">
          <p>
            Chez PetFoster, nous accordons une grande importance à la confidentialité de vos données personnelles. Cette politique de confidentialité décrit les informations que nous collectons, comment nous les utilisons et les options dont vous disposez concernant vos données.
          </p>
        </div>
      </div>
      
      {/* Types de données traitées */}
      <div className="yellow-line px-5">
        <div className="container">
          <h2 className="subtitle">LES TYPES DE DONNÉES TRAITÉES</h2>
          <p>Nous collectons et traitons les données suivantes :</p>
          <ul>
            <li><strong>Informations personnelles :</strong> telles que votre nom, adresse e-mail, numéro de téléphone, et autres informations nécessaires lors de l'inscription ou de la soumission d'un formulaire sur notre site.</li>
            <li><strong>Données d'interaction :</strong> telles que vos interactions avec notre site web, y compris les pages visitées, les liens cliqués et les formulaires remplis.</li>
            <li><strong>Données techniques :</strong> comme l'adresse IP, le type de navigateur, le système d'exploitation et d'autres informations sur votre appareil lorsque vous utilisez notre site.</li>
          </ul>
        </div>
      </div>

      {/* Traitement des données */}
      <div className="section px-5">
        <div className="container">
          <h2 className="subtitle">LES TRAITEMENTS DES DONNÉES</h2>
          <p>Les données que nous collectons sont traitées pour les raisons suivantes :</p>
          <ul>
            <li><strong>Amélioration de nos services :</strong> Nous utilisons vos données pour améliorer l'expérience utilisateur sur notre site, personnaliser les services offerts et répondre à vos demandes.</li>
            <li><strong>Gestion des demandes :</strong> Nous traitons vos informations pour répondre à vos demandes, notamment les formulaires de contact ou d'inscription.</li>
            <li><strong>Communication :</strong> Nous utilisons vos données pour vous contacter, par exemple pour vous informer de mises à jour importantes concernant nos services ou pour répondre à vos questions.</li>
          </ul>
        </div>
      </div>

      {/* Base juridique du traitement */}
      <div className="yellow-line px-5">
        <div className="container">
          <h2 className="subtitle">BASE JURIDIQUE DU TRAITEMENT</h2>
          <p>Le traitement de vos données personnelles repose sur les bases légales suivantes :</p>
          <ul>
            <li><strong>Consentement :</strong> En utilisant notre site et en fournissant vos informations personnelles, vous consentez à ce que nous traitions vos données conformément à cette politique de confidentialité.</li>
            <li><strong>Exécution d'un contrat :</strong> Certaines de vos données sont traitées pour exécuter les obligations contractuelles liées aux services que vous avez demandés.</li>
            <li><strong>Intérêt légitime :</strong> Nous pouvons traiter vos données sur la base de notre intérêt légitime à améliorer nos services, à prévenir la fraude ou à garantir la sécurité de notre site.</li>
          </ul>
        </div>
      </div>

      {/* Durée de conservation */}
      <div className="section px-5">
        <div className="container">
          <h2 className="subtitle">DURÉE DE CONSERVATION</h2>
          <p>
            Vos données personnelles sont conservées aussi longtemps que nécessaire pour les finalités pour lesquelles elles ont été collectées, ou selon ce qui est exigé par la loi. Par exemple, les données relatives à un contrat peuvent être conservées pendant toute la durée de ce contrat et après la fin de celui-ci, conformément aux obligations légales et réglementaires.
          </p>
        </div>
      </div>

      {/* Vos droits */}
      <div className="yellow-line px-5">
        <div className="container">
          <h2 className="subtitle">VOS DROITS</h2>
          <p>Vous disposez de plusieurs droits concernant vos données personnelles, notamment :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> Vous pouvez demander à consulter les données personnelles que nous détenons à votre sujet.</li>
            <li><strong>Droit de rectification :</strong> Si vous constatez que certaines de vos données sont incorrectes ou incomplètes, vous pouvez demander leur correction.</li>
            <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données personnelles dans certaines conditions.</li>
            <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données personnelles dans certaines situations.</li>
          </ul>
          <p>
            Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : <a href="mailto:petfoster@gmail.com">petfoster@gmail.com</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
