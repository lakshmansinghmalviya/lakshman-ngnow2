"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, BookOpen, ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedElement } from "@/components/ui/animated-element"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")
      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <footer className="w-full bg-gradient-mesh border-t border-white/20">
      <div className="container py-12 md:py-16">
        {/* Newsletter Section */}
        <AnimatedElement
          animation="fade-up"
          className="mb-16 p-6 md:p-8 glass-card rounded-2xl border border-white/20 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold gradient-text-primary mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-0">
                Subscribe to our newsletter for the latest updates, resources, and special offers.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/50 border-white/30 rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSubmitted}
                required
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="gradient-button text-white rounded-full shadow-md"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Subscribed!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-12">
          <AnimatedElement animation="fade-right" delay={0.1} className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-1.5 shadow-sm">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-2">
                <span className="block text-xl font-bold text-black font-kolka">Enginow</span>
                <span className="text-xs" style={{ color: "#9A2FC4" }}>
                  Learn Fast, Understand Better
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Comprehensive learning resources for engineering students and learners of Computer Science/IT-related
              subjects.
            </p>

            <div className="space-y-3 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start"
              >
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">
                   Noida, 
                  <br />
                 Uttar Pradesh 201301
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center"
              >
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">+91 89350 69570</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center"
              >
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">care@enginow.in</p>
              </motion.div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/enginow" },
                { icon: Instagram, href: "https://www.instagram.com/enginow.in" },
                { icon: Youtube, href: "https://youtube.com/@enginow" },
                { icon: Facebook, href: "https://www.facebook.com/enginow.in/" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors bg-white/50 backdrop-blur-sm p-2 rounded-full border border-white/20 hover:border-primary/20 hover:shadow-sm"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.icon.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={0.2} className="md:col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold gradient-text-primary">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Courses", href: "/courses" },
                { name: "Learn", href: "/learn" },
                { name: "Blog", href: "/blog" },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={0.3} className="md:col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold gradient-text-secondary">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Jobs & Internships", href: "/jobs" },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-secondary transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={0.4} className="md:col-span-2 lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold gradient-text-accent">Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "DSA Cheat Sheet",
                  desc: "Algorithms and data structures reference",
                  href: "/learn",
                },
                {
                  title: "OS Notes",
                  desc: "Operating systems concepts explained",
                  href: "/learn",
                },
                {
                  title: "DBMS Tutorial",
                  desc: "Database management fundamentals",
                  href: "/learn",
                },
                {
                  title: "Coding Practice",
                  desc: "Programming exercises and solutions",
                  href: "/learn",
                },
              ].map((resource, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <Link
                    href={resource.href}
                    className="p-3 glass-card rounded-lg border border-white/20 hover:border-accent/20 hover:shadow-sm transition-all block"
                  >
                    <h4 className="text-sm font-medium">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground">{resource.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>

          <AnimatedElement
            animation="fade-up"
            delay={0.6}
            className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Enginow. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
              ].map((link, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </footer>
  )
}
