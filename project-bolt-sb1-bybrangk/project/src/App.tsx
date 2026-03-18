import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewTractorsPage from './pages/NewTractorsPage';
import UsedTractorsPage from './pages/UsedTractorsPage';
import UsedTractorDetail from './pages/UsedTractorDetail';
import ImplementsPage from './pages/ImplementsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/new-tractors" element={<NewTractorsPage />} />
            <Route path="/used-tractors" element={<UsedTractorsPage />} />
            <Route path="/used-tractors/:id" element={<UsedTractorDetail />} />
            <Route path="/implements" element={<ImplementsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
