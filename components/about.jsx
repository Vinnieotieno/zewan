"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Award,
  Users,
  ArrowRight,
  Building2,
  Shield,
  Heart,
  Lightbulb,
  ChevronRight,
  Star,
  TrendingUp,
} from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const valuesRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px 0px" })
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px 0px" })
  const [hoveredValue, setHoveredValue] = useState(null)
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Animated stats with infinite counter effect
  const stats = [
    {
      icon: Building2,
      targetNumber: 500,
      suffix: "+",
      label: "Projects Completed",
      color: "from-blue-500 to-blue-600",
      delay: 0,
    },
    {
      icon: Users,
      targetNumber: 1000,
      suffix: "+",
      label: "Happy Clients",
      color: "from-amber-500 to-amber-600",
      delay: 0.2,
    },
    {
      icon: Award,
      targetNumber: 50,
      suffix: "+",
      label: "Awards Won",
      color: "from-purple-500 to-purple-600",
      delay: 0.4,
    },
    {
      icon: TrendingUp,
      targetNumber: 100,
      suffix: "%",
      label: "Client Satisfaction",
      color: "from-emerald-500 to-emerald-600",
      delay: 0.6,
    },
  ]

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "We maintain the highest standards in construction, using premium materials and proven techniques.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: Heart,
      title: "Passion & Dedication",
      description: "We're passionate about construction and dedicated to bringing your vision to life.",
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new technologies and methods to deliver cutting-edge construction solutions.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ]

  // Animated counter effect
  useEffect(() => {
    if (isStatsInView) {
      stats.forEach((stat, index) => {
        const key = Object.keys(counters)[index % 3]
        const duration = 2000 // 2 seconds
        const increment = stat.targetNumber / (duration / 16) // 60fps

        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.targetNumber) {
            current = stat.targetNumber
            clearInterval(timer)
          }

          setCounters((prev) => ({
            ...prev,
            [key]: Math.floor(current),
          }))
        }, 16)

        return () => clearInterval(timer)
      })
    }
  }, [isStatsInView])

  // Parallax effect for background elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-grid-primary/5 bg-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative Elements with Parallax Effect */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
        style={{
          x: mousePosition.x * -1,
          y: mousePosition.y * -1,
          opacity,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity,
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image with Enhanced Hover Effect */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden group"
                style={{ scale: imageScale }}
                whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/co.jpg?height=600&width=800"
                  alt="Zewan Construction Team"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=600&width=800"
                  }}
                />

                {/* Enhanced Image Overlay with Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <motion.h3
                    className="text-white text-xl font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Our Expert Team
                  </motion.h3>
                  <motion.p
                    className="text-white/80 text-sm mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Dedicated professionals with decades of combined experience
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/about"
                      className="inline-flex items-center text-primary mt-4 text-sm font-medium group/link bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      <span>Meet Our Team</span>
                      <ChevronRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced Decorative Elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl -z-10"
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(59, 130, 246, 0.3)",
                    "0px 10px 30px rgba(59, 130, 246, 0.5)",
                    "0px 0px 0px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
              <motion.div
                className="absolute -top-6 -left-6 w-32 h-32 border border-primary/20 rounded-2xl -z-10"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Enhanced Floating Badge */}
              <motion.div
                className="absolute top-6 -left-10 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -20, rotate: -5 }}
                animate={isInView ? { opacity: 1, x: 0, rotate: -5 } : { opacity: 0, x: -20, rotate: -5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </motion.div>
                  <span className="font-semibold">Trusted by countless clients</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section with Enhanced Animations */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.div
              className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(var(--primary), 0.1)",
              }}
            >
              <span className="text-sm font-medium text-primary">ABOUT US</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building Excellence
              <motion.span
                className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Through the Years
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Zewan Construction has established itself as a leader in the construction industry, combining traditional
              craftsmanship with modern innovation. Our legacy of excellence is built on a foundation of integrity,
              quality, and unwavering commitment to our clients' vision.
            </motion.p>

            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                "Quality craftsmanship in every detail",
                "Transparent communication throughout",
                "On-time and on-budget delivery",
                "Sustainable building practices",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/about">
                <Button
                  size="lg"
                  className="rounded-full px-8 group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Stats Section with Animated Counters */}
        <div ref={statsRef} className="mt-32">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Impact in <span className="text-primary">Numbers</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto mb-6 relative overflow-hidden rounded-full"
              initial={{ width: 0 }}
              animate={isStatsInView ? { width: "80px" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-white/50 w-1/3 blur-sm"
              />
            </motion.div>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Throughout our journey, we've achieved remarkable milestones that reflect our unwavering commitment to
              excellence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + stat.delay }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Enhanced Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Animated Particle Background */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-primary/10"
                      style={{
                        width: Math.random() * 20 + 5,
                        height: Math.random() * 20 + 5,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30],
                        x: [0, Math.random() * 20 - 10],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced Icon with Animation */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <stat.icon className="h-8 w-8" />
                </motion.div>

                {/* Enhanced Number with Counter */}
                <div className="relative">
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-primary group-hover:to-primary/70 bg-clip-text text-transparent transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.4 + stat.delay }}
                  >
                    {isStatsInView ? (
                      <>
                        <span className="counter-value">
                          {index === 0
                            ? counters.projects
                            : index === 1
                              ? counters.clients
                              : index === 2
                                ? counters.awards
                                : stat.targetNumber}
                        </span>
                        {stat.suffix}
                      </>
                    ) : (
                      <>0{stat.suffix}</>
                    )}
                  </motion.h3>

                  {/* Animated underline */}
                  <motion.div
                    className="h-0.5 w-0 bg-primary rounded-full mx-auto"
                    initial={{ width: 0 }}
                    animate={isStatsInView ? { width: "50%" } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + stat.delay }}
                  />
                </div>

                {/* Label */}
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Values Section with Interactive Cards */}
        <div ref={valuesRef} className="mt-32">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium text-primary">OUR PRINCIPLES</span>
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Core Values That <span className="text-primary">Define Us</span>
            </motion.h2>

            <motion.div
              className="w-20 h-1 bg-primary mx-auto mb-6 relative overflow-hidden rounded-full"
              initial={{ width: 0 }}
              animate={isValuesInView ? { width: "80px" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-white/50 w-1/3 blur-sm"
              />
            </motion.div>

            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              These timeless principles guide everything we do and help us deliver exceptional results for our clients.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                onHoverStart={() => setHoveredValue(index)}
                onHoverEnd={() => setHoveredValue(null)}
                className={`relative rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden bg-white/90 dark:bg-black/40 backdrop-blur-sm border border-transparent hover:border-primary/10 group`}
              >
                {/* Enhanced Animated Background */}
                <AnimatePresence>
                  {hoveredValue === index && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.05 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Enhanced Icon with 3D Effect */}
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-gray-800 mb-6 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg`}
                  whileHover={{
                    rotateY: 180,
                    transition: { duration: 0.5 },
                  }}
                >
                  <value.icon className={`h-7 w-7 text-gradient bg-gradient-to-br ${value.color} bg-clip-text`} />
                </motion.div>

                {/* Enhanced Title with Animation */}
                <motion.h3 className="text-xl font-semibold mb-3 relative" whileHover={{ x: 5 }}>
                  {value.title}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "30%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  />
                </motion.h3>

                {/* Description with Fade-in Effect */}
                <motion.p className="text-muted-foreground" initial={{ opacity: 0.7 }} whileHover={{ opacity: 1 }}>
                  {value.description}
                </motion.p>

                {/* Hidden Learn More Link that Appears on Hover */}
                <motion.div
                  className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300"
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                >
                  <Link href="/about" className="inline-flex items-center text-primary text-sm font-medium group/link">
                    <span>Learn More</span>
                    <ChevronRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        
        .text-gradient {
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          text-fill-color: transparent !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, 
            rgba(var(--primary), 0.1), 
            rgba(var(--primary), 0.2), 
            rgba(var(--primary), 0.1)
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .counter-value {
          display: inline-block;
          min-width: 2ch;
          text-align: right;
        }
      `}</style>
    </section>
  )
}

export default About

