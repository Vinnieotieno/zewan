"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ChevronUp, MessageCircle, X } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-b from-background to-primary/5 text-foreground py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Zewan
                </span>
                <span className="text-sm text-muted-foreground">Construction</span>
              </div>
            </Link>
            <p className="text-muted-foreground">
              Transforming visions into reality with quality craftsmanship and innovative designs since 2003.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Custom Home Building",
                "Home Renovations",
                "Interior & Exterior Finishing",
                "Additions & Extensions",
                "Commercial Construction",
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              {[
                { icon: Phone, content: "(+254) 790747864", href: "tel:+254790747864" },
                { icon: Mail, content: "info@zewanconstruction.com", href: "mailto:info@zewanconstruction.com" },
                { icon: MapPin, content: "123 Construction Way, Nairobi", href: "#" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span>{item.content}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p>&copy; {currentYear} Zewan Construction. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {!showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <button
              onClick={() => setShowWhatsApp(true)}
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
              aria-label="Open WhatsApp chat"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          </motion.div>
        )}

        {showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl w-80"
          >
            <div className="p-4 bg-green-500 text-white rounded-t-xl flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Image src="/logo.jpg" alt="Zewan Construction" width={40} height={40} className="rounded-full" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Zewan Construction</h4>
                  <p className="text-xs">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsApp(false)}
                className="text-white hover:text-green-100 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-gray-600 mb-4">👋 Hello! Welcome to Zewan Construction. How can we help you today?</p>
              <a
                href={`https://wa.me/254790747864`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Start Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer

