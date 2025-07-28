import { motion } from 'framer-motion'
import { FaDocker, FaRobot, FaCloud, FaCode } from 'react-icons/fa'
import './roadmap.scss'

const getIcon = (title) => {
  if (title.includes('Kubernetes')) return <FaDocker />
  if (title.includes('AI')) return <FaRobot />
  if (title.includes('Cloud')) return <FaCloud />
  return <FaCode />
}

const statuses = {
  progress: 'В процессе',
  planned: 'Запланировано',
  future: 'В будущем'
}

export default function RoadmapItem({ item }) {
  return (
    <motion.div
      className={`roadmap-item ${item.status}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
    >
      <div className="roadmap-icon">{getIcon(item.title)}</div>
      <div className="roadmap-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="roadmap-meta">
          <span className={`status ${item.status}`}>{statuses[item.status]}</span>
          <span className="timeline">{item.timeline}</span>
        </div>
      </div>
    </motion.div>
  )
}
