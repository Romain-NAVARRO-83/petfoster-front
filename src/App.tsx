import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';  // ✅ Importation ajoutée

// Composants
import Footer from './components/Footer';
import Header from './components/Header';
import TrouverAnimal from './components/pages/TrouverAnimal';
import Error404 from './components/pages/404';
import Accueil from './components/pages/Accueil';
import Information from './components/pages/Information';
import PolitiqueDeConfidentialite from './components/pages/PolitiqueDeConfidentialite.';
import MesAnimaux from './components/pages/MesAnimaux';
import MesDemandes from './components/pages/MesDemandes';
import Contact from './components/pages/Contact';
import ProfilAnimal from './components/pages/ProfilAnimal';
import ProfilUtilisateur from './components/pages/ProfilUtilisateur';
import Connexion from './components/pages/Connexion';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/partials/ScrollToTop';

function App() {
  return (
    <>
      <HelmetProvider> {/* ✅ Ajout du HelmetProvider */}
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/information" element={<Information />} />
            <Route
              path="/politique-de-confidentialite"
              element={<PolitiqueDeConfidentialite />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mes-animaux" element={<MesAnimaux />} />
            <Route path="/mes-demandes" element={<MesDemandes />} />
            <Route path="/trouver-animal" element={<TrouverAnimal />} />
            <Route path="/animal/:id" element={<ProfilAnimal />} />
            <Route path="/profil/:id" element={<ProfilUtilisateur />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>

        <Footer />
        <ToastContainer />
      </HelmetProvider> {/* ✅ HelmetProvider encapsule toute l'application */}
    </>
  );
}

export default App;
