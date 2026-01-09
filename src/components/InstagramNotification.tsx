'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InstagramLogoIcon from './icons/InstagramLogoIcon'; // Usando o novo ícone

interface InstagramNotificationProps {
  title?: string
  message?: string
  time?: string
  onClose?: () => void
  autoShow?: boolean
  duration?: number
}

export function InstagramNotification({
  title = 'Instagram',
  message = 'This is a notification message.',
  time = 'now',
  onClose,
  autoShow = true,
  duration = 5000,
}: InstagramNotificationProps) {
  const [isVisible, setIsVisible] = useState(autoShow)

  useEffect(() => {
    if (autoShow) {
      setIsVisible(true)
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [autoShow, duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={handleClose}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto cursor-pointer"
        >
          <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden p-3">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <InstagramLogoIcon className="w-10 h-10 flex-shrink-0" />

              {/* Content */}
              <div className="flex-1 min-w-0 text-white">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold text-sm text-white/90">
                    {title}
                  </span>
                  <span className="text-xs text-white/60">{time}</span>
                </div>
                
                <p className="text-sm text-white break-words leading-snug">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}