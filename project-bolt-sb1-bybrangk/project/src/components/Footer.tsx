import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Kotecha And Sons</h3>
            <p className="text-gray-300 mb-4">
              Authorized John Deere Dealer in Beed since 2006 And Jalna since 2026. Your trusted partner for quality tractors and agricultural solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('new-tractors')} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  New Tractors
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('used-tractors')} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Used Tractors
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                <div>
                  <a href="tel:+918007291999" className="text-gray-300 hover:text-yellow-400">
                    +91 8007291999
                  </a>
                  <br />
                  <a href="tel:+919422331924" className="text-gray-300 hover:text-yellow-400">
                    +91 9422331924
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                <a href="mailto:kotechaandsons@gmail.com" className="text-gray-300 hover:text-yellow-400">
                  kotechaandsons@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Main Offices</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-semibold text-yellow-400">Beed Showroom</div>
                  <div className="text-gray-300 text-sm">John Deere Showroom – Beed</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                <div>
                  <div className="font-semibold text-yellow-400">Jalna Showroom</div>
                  <div className="text-gray-300 text-sm">John Deere Showroom – Jalna</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Kotecha And Sons. All rights reserved. Authorized John Deere Dealer.
            </p>
            <p className="text-gray-400 text-sm">
              Beed since 2006 | Jalna since 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
