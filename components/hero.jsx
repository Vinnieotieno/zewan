"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, Play } from "lucide-react"

const Hero = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const slides = [
    {
      image: "/custom.avif?height=1080&width=1920",
      title: "Custom Home Building",
      //description: "Creating your dream home with exceptional craftsmanship",
      color: "from-blue-500/20 to-blue-700/40",
    },
    {
      image: "/renovation.avif?height=1080&width=1920",
      title: "Home Renovations",
      //description: "Transforming spaces with innovative design solutions",
      color: "from-amber-500/20 to-amber-700/40",
    },
    {
      image: "/commercial.avif?height=1080&width=1920",
      title: "Commercial Construction",
      //description: "Building the future of business infrastructure",
      color: "from-emerald-500/20 to-emerald-700/40",
    },
    {
      image: "/interior.avif?height=1080&width=1920",
      title: "Interior Design",
      //description: "Crafting beautiful and functional living spaces",
      color: "from-purple-500/20 to-purple-700/40",
    },
  ]

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth - 0.5
      const y = clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-md"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Background Slides with Parallax Effect */}
      {slides.map((slide, index) => (
        <AnimatePresence key={index}>
          {currentSlide === index && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
              style={{
                transform: isHovering
                  ? `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(1.05)`
                  : "none",
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={slide.image || "/custom.avif"}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover transform scale-105"
                  sizes="100vw"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=1080&width=1920"
                  }}
                />
              </div>

              {/* Gradient Overlay with Dynamic Color */}
              <div className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80`}></div>

              {/* Dynamic Color Accent */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${slide.color} opacity-30 mix-blend-overlay`}></div>

              {/* Vignette Effect */}
              <div className="absolute inset-0 bg-radial-gradient"></div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="max-w-5xl">
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-block mb-8 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm"
          >
            <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
             Zewan Excellence in Construction.
            </span>
          </motion.div>

          {/* Main Heading with Animated Text */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-white leading-tight tracking-tight">
              <span className="block mb-2">Building Dreams</span>
              <span className="relative inline-block">
                Into{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary">
                    Reality
                  </span>
                  <motion.span
                    className="absolute bottom-2 left-0 h-3 bg-primary/30 w-full -z-0"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  ></motion.span>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            With many <span className="font-semibold text-white">years</span> of experience, we transform your vision
            into extraordinary spaces through <span className="text-primary font-medium">innovative design</span> and
            <span className="text-primary font-medium"> exceptional craftsmanship</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-12">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 group"
              >
                <span>View Our Work</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full text-white border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50 group"
              >
                <span>Get a Quote</span>
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>

          {/* Video Preview Button */}
          <motion.div variants={itemVariants} className="mb-16">
            <button
              className="group flex items-center justify-center mx-auto"
              onClick={() => console.log("Play video")}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping-slow bg-white/10 backdrop-blur-sm"></div>
              </div>
              {/*<span className="ml-3 text-white/80 group-hover:text-white transition-colors duration-300">
                Watch Our Story
              </span>*/}
            </button>
          </motion.div>

          {/* Service Indicators */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group flex flex-col items-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 mb-2 ${
                    currentSlide === index ? "bg-primary scale-150" : "bg-white/30 group-hover:bg-white/50"
                  }`}
                />
                <span
                  className={`text-xs transition-all duration-300 ${
                    currentSlide === index ? "text-primary font-medium" : "text-white/50 group-hover:text-white/80"
                  }`}
                >
                  {slide.title}
                </span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Link href="#services" className="flex flex-col items-center gap-2 group">
         {/* <span className="text-white/60 text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
            Scroll to explore
          </span>*/}
          <motion.div
            className="w-10 h-14 rounded-full border-2 border-white/20 flex justify-center pt-3 group-hover:border-white/40 transition-colors duration-300"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </motion.div>
        </Link>
      </motion.div>

      {/* Service Preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className={`text-center transition-all duration-500 transform ${
                    currentSlide === index ? "scale-110" : "opacity-50 hover:opacity-80 hover:scale-105"
                  }`}
                >
                  <h3 className="text-white text-sm font-medium mb-1">{slide.title}</h3>
                  <p className="text-white/60 text-xs hidden md:block">{slide.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(0) rotate(0); }
          75% { transform: translateY(10px) rotate(-2deg); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          70%, 100% { transform: scale(1.7); opacity: 0; }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
        }
      `}</style>
    </section>
  )
}

export default Hero

