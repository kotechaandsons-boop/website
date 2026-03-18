import { Phone, Mail, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-[#367C2B] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+918007291999" className="flex items-center gap-1 hover:text-yellow-300">
              <Phone size={14} />
              <span>+91 8007291999</span>
            </a>
            <a href="tel:+919422331924" className="flex items-center gap-1 hover:text-yellow-300">
              <Phone size={14} />
              <span>+91 9422331924</span>
            </a>
            <a href="mailto:kotechaandsons@gmail.com" className="flex items-center gap-1 hover:text-yellow-300">
              <Mail size={14} />
              <span className="hidden sm:inline">kotechaandsons@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+918007291999"
              className="bg-yellow-400 text-[#367C2B] px-4 py-1 rounded-full font-semibold hover:bg-yellow-300 transition-colors flex items-center gap-1"
            >
              <Phone size={14} />
              Call Now
            </a>
            <a
              href="https://wa.me/918007291999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-4 py-1 rounded-full font-semibold hover:bg-[#20BA5A] transition-colors flex items-center gap-1"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/download.png"
              alt="Kotecha And Sons Logo"
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
            <div className="text-2xl font-bold text-[#367C2B]">
              Kotecha And Sons
            </div>
          </Link>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <li>
              <Link
                to="/"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/about') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/new-tractors"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/new-tractors') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                New Tractors
              </Link>
            </li>
            <li>
              <Link
                to="/used-tractors"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/used-tractors') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Used Tractors
              </Link>
            </li>
            <li>
              <Link
                to="/implements"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/implements') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Implements
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/services') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`hover:text-[#367C2B] transition-colors ${isActive('/contact') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Contact & Locations
              </Link>
            </li>
          </ul>
        </div>

        {mobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-3 font-medium text-gray-700 pb-4">
            <li>
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/about') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/new-tractors"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/new-tractors') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                New Tractors
              </Link>
            </li>
            <li>
              <Link
                to="/used-tractors"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/used-tractors') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Used Tractors
              </Link>
            </li>
            <li>
              <Link
                to="/implements"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/implements') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Implements
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/services') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className={`block w-full text-left py-2 hover:text-[#367C2B] ${isActive('/contact') ? 'text-[#367C2B] font-semibold' : ''}`}
              >
                Contact & Locations
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
