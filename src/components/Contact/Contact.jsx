import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from 'react-icons/fa'
import { ContactForm } from './ContactForm'
import './contact.scss'

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/vag2000let', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/vagan-p-5979b9377', name: 'LinkedIn' },
    { icon: <FaTelegram />, url: 'https://t.me/yourusername', name: 'Telegram' },
    { icon: <FaEnvelope />, url: 'mailto:vagan2000let@gmail.com', name: 'Email' }
  ]

  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Контактная информация</h2>
        <div className="contact-container">
          <p className="contact-info">
            Если у вас есть вопросы или предложения, не стесняйтесь связаться со мной через форму
            или напрямую через социальные сети.
          </p>

          <div className="contact-form-block">
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
            >
              Написать сообщение
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="social-icon">{link.icon}</span>
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ContactForm
                onSuccess={() => setIsModalOpen(false)}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
