import { Wrench, Package, CreditCard, RefreshCw, Headphones, Truck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, fadeInUp, staggerContainer, cardAnimation, viewportOptions } from '../utils/animations';

const services = [
  {
    icon: Wrench,
    title: 'Tractor Servicing',
    description: 'Expert maintenance and repair services by certified technicians for all tractor models.',
  },
  {
    icon: Package,
    title: 'Genuine Spare Parts',
    description: '100% authentic John Deere spare parts with warranty and guaranteed quality.',
  },
  {
    icon: CreditCard,
    title: 'Finance Assistance',
    description: 'Easy loan and EMI options through leading banks with minimal documentation.',
  },
  {
    icon: RefreshCw,
    title: 'Exchange Offers',
    description: 'Best value for your old tractor with hassle-free exchange and upgrade options.',
  },
  {
    icon: MapPin,
    title: 'On-Field Support',
    description: 'Emergency breakdown service and on-site repairs across Beed and Jalna districts.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick tractor delivery to your location with complete documentation support.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: '24/7 customer assistance for service queries, spare parts, and technical guidance.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/image.png)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-4" variants={fadeUp}>
            Our Services
          </motion.h2>
          <motion.div className="w-24 h-1 bg-yellow-400 mx-auto mb-4" variants={fadeInUp}></motion.div>
          <motion.p className="text-lg text-gray-100 max-w-2xl mx-auto" variants={fadeInUp}>
            Comprehensive support for all your agricultural machinery needs
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm p-8 rounded-lg shadow-md border border-gray-200 group"
                variants={cardAnimation}
                whileHover={{
                  scale: 1.03,
                  borderColor: '#367C2B',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <Icon className="text-[#367C2B]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 bg-[#367C2B] text-white p-8 rounded-lg text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          <motion.h3 className="text-2xl font-bold mb-4" variants={fadeUp}>
            Need Service or Support?
          </motion.h3>
          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            Our team is ready to assist you with any tractor-related needs
          </motion.p>
          <motion.div className="flex flex-col items-center gap-4 mb-6" variants={fadeInUp}>
            <div className="flex flex-wrap justify-center gap-2 text-lg">
              <span>Call us at:</span>
              <a href="tel:+918007291999" className="hover:text-yellow-300 font-semibold">+91 8007291999</a>
              <span>or</span>
              <a href="tel:+919422331924" className="hover:text-yellow-300 font-semibold">+91 9422331924</a>
            </div>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={fadeInUp}>
            <motion.a
              href="tel:+918007291999"
              className="bg-yellow-400 text-[#367C2B] px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call Service Center
            </motion.a>
            <motion.a
              href="https://wa.me/918007291999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#367C2B] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
