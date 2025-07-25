import { motion } from 'framer-motion'
import './strengths.scss'

export default function StrengthCard({ icon, title, description }) {
  return (
    <motion.div
      className="strength-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="strength-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}
