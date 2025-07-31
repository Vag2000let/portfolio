import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import emailjs from '@emailjs/browser'
import {
  EMAIL_JS_PUBLIC_KEY,
  EMAIL_JS_SERVICE_ID,
  EMAIL_JS_TEMPLATE_ID,
  RECAPTCHA_SITE_KEY
} from './helpers'
import './contact.scss'

export function ContactForm({ onSuccess, onClose }) {
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
      if (onSuccess) onSuccess()
    } catch (error) {
      alert('Ошибка при отправке: ' + error.text)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="honeypot">
        <label htmlFor="honeypot">поле</label>
        <input
          id="honeypot"
          type="text"
          {...register('honeypot')}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Ваше имя</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Пожалуйста, введите ваше имя' })}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Ваш Email</label>
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

      <div className="form-textarea">
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

      <div className="form-recaptcha">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={() => setRecaptchaError('')}
        />
        {recaptchaError && <span className="error-message">{recaptchaError}</span>}
      </div>

      <div className="form-actions">
        <motion.button
          type="button"
          className="cancel-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Отмена
        </motion.button>
        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </motion.button>
      </div>
    </motion.form>
  )
}
