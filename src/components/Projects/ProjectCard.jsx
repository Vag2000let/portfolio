import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './projects.scss'
import noImage from '@assets/images/no-image.jpeg'

const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 }
    }
  }

  const tagVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5
      }
    })
  }

  return (
    <motion.div
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <img src={noImage} alt="no-image" loading="lazy" />
        )}
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <motion.div className="tags" initial="hidden" animate="visible">
          {project.tags.map((tag, i) => (
            <motion.span key={i} className="tag" variants={tagVariants} custom={i}>
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <div className="project-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <FaGithub /> Код
            </a>
          )}

          <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
            <FaExternalLinkAlt /> Описание
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
