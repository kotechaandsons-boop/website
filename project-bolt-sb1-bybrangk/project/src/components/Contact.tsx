import { Phone, Mail, MessageCircle, Send, MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeInUp, staggerContainer, cardAnimation, viewportOptions } from '../utils/animations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Name: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/918007291999?text=${whatsappMessage}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" variants={fadeUp}>
            Contact & Locations
          </motion.h2>
          <motion.div className="w-24 h-1 bg-[#367C2B] mx-auto mb-4" variants={fadeInUp}></motion.div>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={fadeInUp}>
            Visit our showrooms or get in touch with us for any inquiries
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h3 className="text-2xl font-bold text-gray-900" variants={fadeUp}>
              Our Showrooms
            </motion.h3>

            <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden" variants={cardAnimation}>
              <div className="bg-[#367C2B] text-white p-4">
                <div className="flex items-center gap-2">
                  <MapPin size={24} />
                  <h4 className="text-xl font-bold">Beed Showroom</h4>
                </div>
              </div>
              <div className="p-4">
                <div className="text-gray-700 mb-4">
                  <div className="font-semibold text-gray-900 mb-1">Kotecha And Sons</div>
                  <div className="text-sm">Beed, Maharashtra</div>
                </div>
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.8!2d75.76!3d18.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU5JzI0LjQiTiA3NcKwNDUnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Beed Location"
                  ></iframe>
                </div>
                <div className="flex gap-2">
                  <motion.a
                    href="tel:+918007291999"
                    className="flex-1 bg-[#367C2B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2d6624] transition-colors flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone size={16} />
                    Call
                  </motion.a>
                  <motion.a
                    href="https://www.google.com/maps/search/John+Deere+Showroom+Beed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation size={16} />
                    Directions
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden" variants={cardAnimation}>
              <div className="bg-[#367C2B] text-white p-4">
                <div className="flex items-center gap-2">
                  <MapPin size={24} />
                  <h4 className="text-xl font-bold">Jalna Showroom</h4>
                </div>
              </div>
              <div className="p-4">
                <div className="text-gray-700 mb-4">
                  <div className="font-semibold text-gray-900 mb-1">Kotecha And Sons</div>
                  <div className="text-sm">Jalna, Maharashtra</div>
                </div>
                <div className="mb-4 rounded-lg overflow-hidden h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3752.783992007506!2d75.87053797522506!3d19.849090681521197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDUwJzU2LjciTiA3NcKwNTInMjMuMiJF!5e0!3m2!1sen!2sin!4v1773296313318!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Jalna Location"
                  ></iframe>
                </div>
                <div className="flex gap-2">
                  <motion.a
                    href="tel:+918007291999"
                    className="flex-1 bg-[#367C2B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2d6624] transition-colors flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone size={16} />
                    Call
                  </motion.a>
                  <motion.a
                    href="https://www.google.com/maps/search/John+Deere+Showroom+Jalna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation size={16} />
                    Directions
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h3 className="text-2xl font-bold text-gray-900" variants={fadeUp}>
              Send us a Message
            </motion.h3>

            <motion.form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg" variants={fadeInUp}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#367C2B] focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#367C2B] focus:border-transparent outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#367C2B] focus:border-transparent outline-none resize-none"
                  placeholder="Tell us about your requirements"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#367C2B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2d6624] transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                Send via WhatsApp
              </motion.button>
            </motion.form>

            <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={cardAnimation}>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Contact Information</h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Phone className="text-[#367C2B]" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">Phone Numbers</div>
                    <a href="tel:+918007291999" className="text-[#367C2B] hover:underline block">
                      +91 8007291999
                    </a>
                    <a href="tel:+919764442407" className="text-[#367C2B] hover:underline block">
                      +91 9764442407
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Mail className="text-[#367C2B]" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">Email</div>
                    <a href="mailto:kotechaandsons@gmail.com" className="text-[#367C2B] hover:underline">
                      kotechaandsons@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <motion.a
                  href="tel:+918007291999"
                  className="flex-1 bg-[#367C2B] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#2d6624] transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={18} />
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/918007291999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
