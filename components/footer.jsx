"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronUp,
  MessageCircle,
  X,
  Clock,
  ArrowRight,
  Send,
  Heart,
  Award,
  Shield,
} from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

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

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-background via-background to-primary/5 text-foreground pt-16 pb-8">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      {/* Wave SVG Divider */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none transform translate-y-[-98%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-background"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-background"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="relative mb-16 p-8 lg:p-10 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl shadow-sm overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest projects, tips, and construction insights.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group"
                >
                  Subscribe
                  <Send className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>

              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-green-600 flex items-center"
                >
                  <Heart className="h-4 w-4 mr-2" /> Thank you for subscribing!
                </motion.div>
              )}
            </div>

            <div className="hidden md:flex justify-end">
              <div className="flex flex-col items-center">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
                  <div className="flex space-x-4 mb-4">
                    {[
                      { icon: Shield, text: "Quality Guaranteed" },
                      { icon: Award, text: "Award Winning" },
                      { icon: Clock, text: "On-Time Delivery" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-center font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-sm">
                    <span className="font-semibold">Trusted by</span> 50+ happy clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 tracking-tight">
                  Zewan
                </span>
                <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Construction</span>
              </div>
            </Link>
            <p className="text-muted-foreground">
              Transforming visions into reality with quality craftsmanship and innovative designs since 2023.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
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
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="relative overflow-hidden">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Custom Home Building", href: "/services/custom-homes" },
                { label: "Home Renovations", href: "/services/renovations" },
                { label: "Interior & Exterior Finishing", href: "/services/finishing" },
                { label: "Additions & Extensions", href: "/services/additions" },
                { label: "Commercial Construction", href: "/services/commercial" },
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="relative overflow-hidden">
                      {service.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: Phone,
                  content: "(+254) 790747864",
                  href: "tel:+254790747864",
                  hoverText: "Call us now",
                },
                {
                  icon: Phone,
                  content: "(+254) 792879775",
                  href: "tel:+254792879775",
                  hoverText: "Call us now",
                },
                {
                  icon: Mail,
                  content: "zewan@construction.co.ke",
                  href: "mailto:zewan@construction.co.ke",
                  hoverText: "Email us",
                },
                {
                  icon: MapPin,
                  content: "Nairobi, Kenya",
                  href: "https://maps.google.com/?q=Nairobi,Kenya",
                  hoverText: "Find us",
                },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300 group relative"
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-110">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.content}
                      </span>
                      <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.hoverText}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p className="text-sm">
            &copy; {currentYear} <span className="text-primary font-medium">Zewan Construction</span>. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
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
            className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl w-80 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Image
                    src="/logo.jpg"
                    alt="Zewan Construction"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold">Zewan Construction</h4>
                  <p className="text-xs opacity-90">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsApp(false)}
                className="text-white hover:text-green-100 transition-colors p-1 hover:bg-white/10 rounded-full"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4 relative">
                <p className="text-gray-700">👋 Hello! Welcome to Zewan Construction. How can we help you today?</p>
                <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
              </div>
              <a
                href="https://wa.me/254790747864"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-all duration-300 transform hover:translate-y-[-2px] shadow-md"
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
            className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer

