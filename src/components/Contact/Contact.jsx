import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from 'react-icons/fa'
import './contact.scss'
import {
  EMAIL_JS_PUBLIC_KEY,
  EMAIL_JS_SERVICE_ID,
  EMAIL_JS_TEMPLATE_ID,
  RECAPTCHA_SITE_KEY
} from './helpers'

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const recaptchaRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState('')

  const onSubmit = async (data) => {
    if (data.honeypot) return

    setRecaptchaError('')
    const recaptchaValue = recaptchaRef.current.getValue()

    if (!recaptchaValue) {
      setRecaptchaError('Пожалуйста, подтвердите, что вы не робот')
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.send(
        EMAIL_JS_SERVICE_ID,
        EMAIL_JS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          'g-recaptcha-response': recaptchaValue
        },
        EMAIL_JS_PUBLIC_KEY
      )

      alert('Сообщение успешно отправлено!')
      reset()
      recaptchaRef.current.reset()
    } catch (error) {
      alert('Ошибка при отправке: ' + error.text)
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourprofile', name: 'LinkedIn' },
    { icon: <FaTelegram />, url: 'https://t.me/yourusername', name: 'Telegram' },
    { icon: <FaEnvelope />, url: 'mailto:your.email@example.com', name: 'Email' }
  ]

  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Свяжитесь со мной</h2>

        <div className="contact-container">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="honeypot">
              <label htmlFor="honeypot">Не заполняйте это поле</label>
              <input
                id="honeypot"
                type="text"
                {...register('honeypot')}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Пожалуйста, введите ваше имя' })}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Пожалуйста, введите ваш email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Некорректный email адрес'
                  }
                })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                rows="5"
                {...register('message', {
                  required: 'Пожалуйста, введите ваше сообщение',
                  minLength: {
                    value: 10,
                    message: 'Сообщение должно содержать минимум 10 символов'
                  }
                })}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-message">{errors.message.message}</span>}
            </div>

            <div className="form-group">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={() => setRecaptchaError('')}
              />
              {recaptchaError && <span className="error-message">{recaptchaError}</span>}
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </motion.button>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Контактная информация</h3>
            <p>
              Если у вас есть вопросы или предложения, не стесняйтесь связаться со мной через форму
              или напрямую через социальные сети.
            </p>

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
      </motion.div>
    </section>
  )
}
