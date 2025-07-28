import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import './projects.scss'

const projects = [
  {
    title: 'Performance Management',
    description: 'Система для управления производительностью с интерактивной визуализацией данных.',
    tags: ['React', 'Redux/RTK', 'D3.js', 'Material-UI', 'Cypress'],
    link: 'https://buildin.ai/share/1ed67b53-1852-4acf-a4df-f610f05cf672?code=FTTK4H'
  },
  {
    title: 'Telemarketing',
    description: 'Решение для операторов колл-центра с аналитикой в реальном времени.',
    tags: ['React', 'WebSocket', 'Styled Components', 'Jest', 'Pact'],
    link: 'https://buildin.ai/share/ba21ceb5-f592-4643-a4f0-d44d499d709c?code=FTTK4H'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Мои проекты</h2>

        <div className="projects-container">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
