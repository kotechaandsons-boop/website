import { motion } from 'framer-motion';
import { fadeUp, fadeInUp, staggerContainer, viewportOptions } from '../utils/animations';

export default function UsedTractors() {
  return (
    <section id="used-tractors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" variants={fadeUp}>
            Used Tractors
          </motion.h2>
          <motion.div className="w-24 h-1 bg-[#367C2B] mx-auto mb-4" variants={fadeInUp}></motion.div>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={fadeInUp}>
            Quality certified pre-owned tractors from top brands at competitive prices
          </motion.p>
        </motion.div>

        <div className="text-center">
          <motion.a
            href="https://wa.me/c/917798958499"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-[#1fb855] hover:scale-105 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ delay: 0.2 }}
          >
            View Used Tractor Catalogue
          </motion.a>
        </div>
      </div>
    </section>
  );
}
