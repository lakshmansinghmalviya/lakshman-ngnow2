"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  color?: string
}

export function Modal({ isOpen, onClose, title, children, color = "primary" }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-white p-6 shadow-xl"
          >
            <div
              className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-${color} to-${color}-light`}
            ></div>
            <div className="mb-6 flex items-start justify-between">
              <h2
                className={`text-2xl font-bold gradient-text-${color === "purple" ? "primary" : color === "teal" ? "secondary" : "accent"}`}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
