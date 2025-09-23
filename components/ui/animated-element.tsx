"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useAnimation, type Variant, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import Image from "next/image"

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-down"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "rotate"
  | "bounce"
  | "none"

interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animation?: AnimationType
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
  className?: string
  animateOnMount?: boolean
  backgroundImage?: "logo1" | "logo2" | "logo3" | "logo4" | null
}

const animations: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  "flip-down": {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  "slide-up": {
    hidden: { y: 100 },
    visible: { y: 0 },
  },
  "slide-down": {
    hidden: { y: -100 },
    visible: { y: 0 },
  },
  "slide-left": {
    hidden: { x: -100 },
    visible: { x: 0 },
  },
  "slide-right": {
    hidden: { x: 100 },
    visible: { x: 0 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  },
  none: {
    hidden: {},
    visible: {},
  },
}

export function AnimatedElement({
  children,
  animation = "fade-up",
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  once = true,
  className,
  animateOnMount = false,
  backgroundImage = null,
  ...props
}: AnimatedElementProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView || (animateOnMount && isMounted)) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once, animateOnMount, isMounted])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn("relative", className)}
      {...props}
    >
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 opacity-10">
          <Image
            src={
              backgroundImage === "logo1"
                ? "/Enginow White.png"
                : backgroundImage === "logo2"
                  ? "/Enginow White1.png"
                  : backgroundImage === "logo3"
                    ? "/Enginow White2.png"
                    : "/Enginow White3.png"
            }
            alt="Background logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      {children}
    </motion.div>
  )
}

export function AnimatedText({
  text,
  className,
  animation = "fade-up",
  staggerChildren = 0.03,
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  once = true,
  ...props
}: {
  text: string
  className?: string
  animation?: AnimationType
  staggerChildren?: number
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerChildren, delayChildren: delay },
    }),
  }

  const child = {
    hidden: animations[animation].hidden as Variant,
    visible: {
      ...animations[animation].visible,
      transition: { duration, ease: "easeOut" },
    } as Variant,
  }

  if (!isMounted) {
    return <div className={className}>{text}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-1 text-black" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className,
  delay = 0,
  threshold = 0.1,
  once = true,
  formatter = (value: number) => Math.round(value).toString(),
}: {
  from?: number
  to: number
  duration?: number
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
  formatter?: (value: number) => string
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })
  const [count, setCount] = useState(from)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView && isMounted) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = from + (to - from) * progress

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      const startAnimation = () => {
        animationFrame = requestAnimationFrame(animate)
      }

      const timeoutId = setTimeout(startAnimation, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [inView, from, to, duration, delay, isMounted])

  if (!isMounted) {
    return <div className={className}>{formatter(from)}</div>
  }

  return (
    <span ref={ref} className={className}>
      {formatter(count)}
    </span>
  )
}

export function AnimatedGradientText({
  text,
  className,
  gradient = "from-primary via-purple-light to-primary",
  duration = 3,
  ...props
}: {
  text: string
  className?: string
  gradient?: string
  duration?: number
}) {
  return (
    <span
      className={cn(
        `bg-gradient-to-r ${gradient} bg-[length:200%_auto] bg-clip-text text-transparent animate-background-pan`,
        className,
      )}
      style={{ animationDuration: `${duration}s` }}
      {...props}
    >
      {text}
    </span>
  )
}
