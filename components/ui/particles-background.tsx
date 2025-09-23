"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

interface ParticlesBackgroundProps {
  className?: string
  particleCount?: number
  particleColor?: string
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  connectParticles?: boolean
  connectDistance?: number
  interactive?: boolean
}

export function ParticlesBackground({
  className,
  particleCount = 50,
  particleColor = "#6E48AA",
  minSize = 1,
  maxSize = 3,
  minSpeed = 0.1,
  maxSpeed = 0.5,
  connectParticles = true,
  connectDistance = 120,
  interactive = true,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isMouseInCanvasRef = useRef(false)
  const animationFrameRef = useRef<number>()
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize canvas dimensions
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const updateDimensions = () => {
      if (!canvas.parentElement) return
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || isInitialized) return

    // Create particles
    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size,
        speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
        speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
        color: particleColor,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
    particlesRef.current = newParticles
    setIsInitialized(true)
  }, [dimensions, particleCount, minSize, maxSize, minSpeed, maxSpeed, particleColor, isInitialized])

  // Mouse interaction
  useEffect(() => {
    if (!canvasRef.current || !interactive) return

    const canvas = canvasRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseEnter = () => {
      isMouseInCanvasRef.current = true
    }

    const handleMouseLeave = () => {
      isMouseInCanvasRef.current = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [interactive])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !isInitialized || dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > dimensions.width) p.speedX *= -1
        if (p.y < 0 || p.y > dimensions.height) p.speedY *= -1

        // Mouse interaction
        if (interactive && isMouseInCanvasRef.current) {
          const dx = p.x - mousePositionRef.current.x
          const dy = p.y - mousePositionRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            p.speedX += dx * force * 0.01
            p.speedY += dy * force * 0.01
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.round(p.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Connect particles
        if (connectParticles) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectDistance) {
              ctx.beginPath()
              ctx.strokeStyle = `${p.color}${Math.round((1 - distance / connectDistance) * 50)
                .toString(16)
                .padStart(2, "0")}`
              ctx.lineWidth = 0.5
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, interactive, connectParticles, connectDistance, isInitialized])

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 -z-10", className)}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
