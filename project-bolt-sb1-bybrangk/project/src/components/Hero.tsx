import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { fadeUp, fadeInUp, staggerContainer } from '../utils/animations';

export default function Hero() {

  return (
    <section
      id="home"
      className="relative bg-cover bg-center min-h-screen flex items-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(/Screenshot_2026-03-09_144737.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-20 text-white">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight drop-shadow-lg"
            variants={fadeUp}
          >
            Authorized John Deere Dealer in Beed & Jalna
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md"
            variants={fadeUp}
          >
            (Beed since 2006 & Jalna since 2026)
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-100 drop-shadow-md"
            variants={fadeInUp}
          >
            Trusted by thousands of farmers for powerful tractors, reliable service, and advanced farming solutions.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
            <motion.a
              href="tel:+918007291999"
              className="bg-yellow-400 text-[#367C2B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={24} />
              Call Now
            </motion.a>
            <motion.a
              href="https://wa.me/918007291999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#20BA5A] transition-all flex items-center gap-2 shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
              WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={20} suffix="+" className="text-3xl font-bold text-[#367C2B]" />
              <div className="text-sm text-gray-600 mt-1">Years of Experience</div>
            </div>
            <div className="border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={10000} suffix="+" className="text-3xl font-bold text-[#367C2B]" />
              <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
            </div>
            <div className="border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={2} suffix=" Districts" className="text-3xl font-bold text-[#367C2B]" />
              <div className="text-sm text-gray-600 mt-1">Serving Beed And Jalna</div>
            </div>
            <div className="border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={100} suffix="%" className="text-3xl font-bold text-[#367C2B]" />
              <div className="text-sm text-gray-600 mt-1">Genuine Spare Parts</div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold text-[#367C2B]"
              >
                Easy
              </motion.div>
              <div className="text-sm text-gray-600 mt-1">Finance Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
