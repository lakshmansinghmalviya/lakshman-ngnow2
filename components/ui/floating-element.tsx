"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
  direction?: "x" | "y" | "both"
  rotate?: boolean
  rotateAmplitude?: number
}

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 4,
  delay = 0,
  className,
  direction = "y",
  rotate = false,
  rotateAmplitude = 5,
  ...props
}: FloatingElementProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  const floatingAnimation = {
    x: direction === "x" || direction === "both" ? [-amplitude, amplitude, -amplitude] : 0,
    y: direction === "y" || direction === "both" ? [-amplitude, amplitude, -amplitude] : 0,
    rotate: rotate ? [-rotateAmplitude, rotateAmplitude, -rotateAmplitude] : 0,
  }

  return (
    <motion.div
      animate={floatingAnimation}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className,
  ...props
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const [isMounted, setIsMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={cn(className)} style={{ y: scrollY * speed }} {...props}>
      {children}
    </motion.div>
  )
}

export function MorphingBlob({
  className,
  color = "bg-primary/20",
  duration = 8,
  size = "w-64 h-64",
  blur = "blur-3xl",
  ...props
}: {
  className?: string
  color?: string
  duration?: number
  size?: string
  blur?: string
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className={cn(size, color, blur, className)} {...props}></div>
  }

  return (
    <motion.div
      className={cn(size, color, blur, className)}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%",
        ],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      }}
      {...props}
    />
  )
}
