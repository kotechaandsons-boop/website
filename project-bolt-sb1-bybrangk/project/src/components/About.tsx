import { Award, Users, MapPin, Calendar, ChevronDown, ChevronUp, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import AnimatedCounter from './AnimatedCounter';
import { fadeUp, fadeInUp, staggerContainer, cardAnimation, viewportOptions } from '../utils/animations';

interface Branch {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
  directionsUrl: string;
}

const branches: Branch[] = [
  {
    id: '1',
    name: 'Beed Branch',
    address: 'Main Road, Beed, Maharashtra 431122',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.123456789!2d75.75!3d18.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU5JzI0LjAiTiA3NcKwNDUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Beed+Maharashtra'
  },
  {
    id: '2',
    name: 'Jalna Branch',
    address: 'Station Road, Jalna, Maharashtra 431203',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.123456789!2d75.88!3d19.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUwJzI0LjAiTiA3NcKwNTInNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Jalna+Maharashtra'
  }
];

export default function About() {
  const [showBranches, setShowBranches] = useState(false);

  return (
    <section id="about" className="py-20 bg-gray-50 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/DJI_20260117165858_0316_D_1.JPG.jpeg)' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-4" variants={fadeUp}>
            About Kotecha And Sons
          </motion.h2>
          <motion.div className="w-24 h-1 bg-[#367C2B] mx-auto" variants={fadeInUp}></motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.p className="text-lg text-white leading-relaxed mb-6" variants={fadeInUp}>
              Kotecha And Sons has been proudly serving the farming community as an authorized John Deere dealer in Beed since 2006 and Jalna since 2026. With over 20+ years of experience in the agricultural machinery industry, we have built a strong reputation based on trust, performance, and service excellence.
            </motion.p>
            <motion.p className="text-lg text-white leading-relaxed mb-6" variants={fadeInUp}>
              Having successfully served more than 10,000+ satisfied customers, we are committed to empowering farmers with advanced tractor technology, genuine spare parts, and reliable after-sales support.
            </motion.p>
            <motion.p className="text-lg text-white leading-relaxed font-semibold" variants={fadeInUp}>
              At Kotecha And Sons, we don't just sell tractors we build long-term partnerships that help farms grow stronger every season.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-md text-center" variants={cardAnimation}>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-[#367C2B]" size={32} />
              </div>
              <AnimatedCounter end={2006} className="text-3xl font-bold text-[#367C2B] mb-2" />
              <div className="text-gray-700">Established</div>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-lg shadow-md text-center" variants={cardAnimation}>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[#367C2B]" size={32} />
              </div>
              <AnimatedCounter end={20} suffix="+" className="text-3xl font-bold text-[#367C2B] mb-2" />
              <div className="text-gray-700">Years Experience</div>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-lg shadow-md text-center" variants={cardAnimation}>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#367C2B]" size={32} />
              </div>
              <AnimatedCounter end={10000} suffix="+" className="text-3xl font-bold text-[#367C2B] mb-2" />
              <div className="text-gray-700">Customers Served</div>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-lg shadow-md text-center" variants={cardAnimation}>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-[#367C2B]" size={32} />
              </div>
              <AnimatedCounter end={2} className="text-3xl font-bold text-[#367C2B] mb-2" />
              <div className="text-gray-700">Main Office</div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow"
              variants={cardAnimation}
              onClick={() => setShowBranches(!showBranches)}
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-[#367C2B]" size={32} />
              </div>
              <div className="text-3xl font-bold text-[#367C2B] mb-2 flex items-center justify-center gap-2">
                {branches.length}
                {showBranches ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
              <div className="text-gray-700 flex items-center justify-center gap-1">
                Our Branches
              </div>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showBranches && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {branches.map((branch, index) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{branch.name}</h3>
                      <p className="text-gray-600 mb-4 flex items-start gap-2">
                        <MapPin size={20} className="text-[#367C2B] flex-shrink-0 mt-1" />
                        <span>{branch.address}</span>
                      </p>

                      <div className="mb-4 rounded-lg overflow-hidden">
                        <iframe
                          src={branch.mapUrl}
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full"
                        ></iframe>
                      </div>

                      <a
                        href={branch.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#367C2B] text-white px-6 py-3 rounded-lg hover:bg-[#2d6623] transition-colors w-full justify-center font-semibold"
                      >
                        <Navigation size={20} />
                        Get Directions
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
