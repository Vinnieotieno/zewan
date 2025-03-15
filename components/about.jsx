"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Award,
  Users,
  Clock,
  ArrowRight,
  Building2,
  Shield,
  Heart,
  Lightbulb,
  ChevronRight,
  Star,
} from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const valuesRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px 0px" })
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px 0px" })
  const [hoveredValue, setHoveredValue] = useState(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const stats = [
    { icon: Building2, number: "500+", label: "Projects Completed", color: "from-blue-500 to-blue-600" },
    { icon: Users, number: "1000+", label: "Happy Clients", color: "from-amber-500 to-amber-600" },
    { icon: Clock, number: "20+", label: "Years Experience", color: "from-emerald-500 to-emerald-600" },
    { icon: Award, number: "50+", label: "Awards Won", color: "from-purple-500 to-purple-600" },
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

  // Counter animation for stats
  const Counter = ({ from, to, duration = 2 }) => {
    const nodeRef = useRef(null)
    const isCounterInView = useInView(nodeRef, { once: true })
    const [count, setCount] = useState(from)

    useState(() => {
      if (isCounterInView) {
        let start = from
        const step = to / (duration * 60)
        const timer = setInterval(() => {
          start += step
          if (start >= to) {
            setCount(to)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 1000 / 60)
        return () => clearInterval(timer)
      }
    }, [isCounterInView])

    return <span ref={nodeRef}>{count}</span>
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Animated Background Grid */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-grid-primary/5 bg-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image with Hover Effect */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden group"
                style={{ scale: imageScale }}
                whileHover={{ scale: 1.03 }}
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

                {/* Image Overlay on Hover */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">Our Expert Team</h3>
                  <p className="text-white/80 text-sm mt-2">Dedicated professionals with years of experience</p>
                  <Link
                    href="/about"
                    className="inline-flex items-center text-primary mt-4 text-sm font-medium group/link"
                  >
                    <span>Meet Our Team</span>
                    <ChevronRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-2xl -z-10 animate-pulse-slow" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border border-primary/20 rounded-2xl -z-10" />

              {/* Floating Badge */}
              <motion.div
                className="absolute top-6 -left-10 z-20 bg-white dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -20, rotate: -5 }}
                animate={isInView ? { opacity: 1, x: 0, rotate: -5 } : { opacity: 0, x: -20, rotate: -5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold">Trusted by 100+ clients</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
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
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Since 2023
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              With over two decades of experience, Zewan Construction has established itself as a leader in the
              construction industry. We combine traditional craftsmanship with modern innovation to deliver exceptional
              results that stand the test of time.
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
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
                  className="rounded-full px-8 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
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
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Over the years, we've achieved remarkable milestones that reflect our commitment to excellence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative bg-white dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                  <stat.icon className="h-8 w-8" />
                </div>

                {/* Number with Counter */}
                <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-primary group-hover:to-primary/70 bg-clip-text text-transparent transition-all duration-300">
                  {isStatsInView ? stat.number : "0+"}
                </h3>

                {/* Label */}
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
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

            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              These principles guide everything we do and help us deliver exceptional results for our clients.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredValue(index)}
                onHoverEnd={() => setHoveredValue(null)}
                className={`relative rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden ${value.bgColor} group`}
              >
                {/* Animated Background */}
                <AnimatePresence>
                  {hoveredValue === index && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-10`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${value.iconBg} mb-6 group-hover:scale-110 transition-all duration-300`}
                >
                  <value.icon className={`h-7 w-7 text-gradient bg-gradient-to-br ${value.color} bg-clip-text`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient group-hover:bg-gradient-to-br group-hover:bg-clip-text group-hover:text-transparent group-hover:from-foreground group-hover:to-foreground/70">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
      `}</style>
    </section>
  )
}

export default About

