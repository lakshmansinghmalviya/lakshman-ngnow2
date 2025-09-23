"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Sparkles, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const routes = [
  { name: "Home", path: "/" },
  {
    name: "Courses",
    path: "/courses",
    submenu: [
      { name: "All Courses", path: "/courses" },
      { name: "Free Courses", path: "/courses?type=free" },
      { name: "Premium Courses", path: "/courses?type=premium" },
    ],
  },
  { name: "Learn", path: "/learn" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Jobs", path: "/jobs" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
  }

  if (!isMounted) {
    return null
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "nav-glassmorphism py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <motion.div variants={logoVariants}>
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <div className="relative bg-white rounded-full p-2 shadow-md">
                <Image
                  src="/eng_shape.png"
                  alt="Enginow Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div className="ml-3">
                <span className="block text-xl font-bold text-black font-kolka">Enginow</span>
                <span className="text-xs" style={{ color: "#9A2FC4" }}>
                  Learn Fast, Understand Better
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {routes.map((route, i) =>
            route.submenu ? (
              <motion.div key={route.path} custom={i} variants={itemVariants}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "nav-pill group flex items-center gap-1",
                        pathname.startsWith(route.path) ? "nav-pill-active" : "nav-pill-inactive",
                      )}
                    >
                      {route.name}
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="w-48 bg-white/90 backdrop-blur-md border border-white/20"
                  >
                    {route.submenu.map((item) => (
                      <DropdownMenuItem key={item.path} asChild className="focus:bg-primary/10">
                        <Link href={item.path}>{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div key={route.path} custom={i} variants={itemVariants}>
                <Link
                  href={route.path}
                  className={cn("nav-pill", pathname === route.path ? "nav-pill-active" : "nav-pill-inactive")}
                >
                  {route.name}
                </Link>
              </motion.div>
            ),
          )}
        </nav>

        <motion.div variants={itemVariants} custom={routes.length} className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-full hover:bg-primary/10"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" className="gradient-button text-white rounded-full px-6 shadow-md">
              <Link href="/contact" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Get Started
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9 rounded-full", scrolled ? "hover:bg-primary/10" : "hover:bg-white/20")}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] sm:w-[350px] pr-0 bg-white/90 backdrop-blur-md border-l border-white/20"
          >
            <div className="flex items-center justify-between mr-6">
              <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                <div className="bg-white rounded-full p-1.5 shadow-sm">
                  <Image
                    src="/Enginow Logo.png"
                    alt="Enginow Logo"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <div className="ml-2">
                  <span className="text-lg font-bold text-black font-kolka">Enginow</span>
                  <span className="block text-xs" style={{ color: "#9A2FC4" }}>
                    Learn Fast, Understand Better
                  </span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="rounded-full hover:bg-primary/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-6 mr-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-full hover:bg-primary/10"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <nav className="flex flex-col gap-2 mt-6 mr-6">
              {routes.map((route, i) =>
                route.submenu ? (
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex flex-col"
                  >
                    <div className="font-medium text-base py-3 px-4 rounded-lg bg-primary/5">{route.name}</div>
                    <div className="ml-4 flex flex-col gap-1 mt-1 mb-2">
                      {route.submenu.map((item, j) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 + j * 0.03 }}
                        >
                          <Link
                            href={item.path}
                            onClick={() => setOpen(false)}
                            className="py-2 px-4 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={route.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "py-3 px-4 font-medium text-base rounded-lg transition-colors",
                        pathname === route.path
                          ? "bg-primary text-white"
                          : "text-foreground hover:bg-primary/5 hover:text-primary",
                      )}
                    >
                      {route.name}
                    </Link>
                  </motion.div>
                ),
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + routes.length * 0.05 }}
                className="mt-6"
              >
                <Button className="w-full gradient-button text-white rounded-lg shadow-md" asChild>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg p-4"
          >
            <div className="container">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search courses, topics, or keywords..."
                  className="w-full bg-white/50 border border-white/30 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-primary/10 h-7 w-7 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
