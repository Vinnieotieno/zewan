"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)
  const autoPlayRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" })
  const controls = useAnimation()

  const testimonials = [
    {
      quote:
        "Zewan Construction exceeded our expectations in every way. Their attention to detail and commitment to quality is unmatched. We couldn't be happier with our new home!",
      author: "John & Sarah Thompson",
      role: "Custom Home Client",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      project: "Modern Villa in Karen",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      quote:
        "The team at Zewan was professional, responsive, and a pleasure to work with. They transformed our outdated kitchen into a beautiful, functional space that we love.",
      author: "Michael Davis",
      role: "Renovation Client",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      project: "Kitchen Renovation in Kilimani",
      color: "from-amber-500/20 to-amber-600/20",
    },
    {
      quote:
        "We were impressed by Zewan's ability to bring our vision to life while staying on budget and completing the project ahead of schedule. Highly recommended!",
      author: "Emily Wilson",
      role: "Commercial Client",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      project: "Office Complex in Westlands",
      color: "from-emerald-500/20 to-emerald-600/20",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isHovering, testimonials.length])

  // Animation control based on view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-70"></div>

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-primary">Client Testimonials</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Say About Us
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-primary mx-auto mb-6 relative overflow-hidden rounded-full"
          >
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/50 w-1/3 blur-sm"
            />
          </motion.div>

          <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with Zewan
            Construction.
          </motion.p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/5 relative overflow-hidden`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeIndex].color} opacity-30`}
                ></div>

                {/* Large quote mark */}
                <div className="absolute top-6 right-6 text-primary/10 dark:text-primary/5">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.9995 8.99805C11.9995 11.7615 9.76147 13.9995 6.99951 13.9995C4.23755 13.9995 1.99951 11.7615 1.99951 8.99805C1.99951 6.23609 4.23755 3.99805 6.99951 3.99805C9.76147 3.99805 11.9995 6.23609 11.9995 8.99805Z" />
                    <path d="M21.9995 8.99805C21.9995 11.7615 19.7615 13.9995 16.9995 13.9995C14.2375 13.9995 11.9995 11.7615 11.9995 8.99805C11.9995 6.23609 14.2375 3.99805 16.9995 3.99805C19.7615 3.99805 21.9995 6.23609 21.9995 8.99805Z" />
                    <path d="M11.9995 19.998C11.9995 19.4457 11.552 18.998 10.9995 18.998H2.99951C2.44723 18.998 1.99951 19.4457 1.99951 19.998C1.99951 20.5503 2.44723 20.998 2.99951 20.998H10.9995C11.552 20.998 11.9995 20.5503 11.9995 19.998Z" />
                    <path d="M21.9995 19.998C21.9995 19.4457 21.552 18.998 20.9995 18.998H12.9995C12.4472 18.998 11.9995 19.4457 11.9995 19.998C11.9995 20.5503 12.4472 20.998 12.9995 20.998H20.9995C21.552 20.998 21.9995 20.5503 21.9995 19.998Z" />
                  </svg>
                </div>

                <div className="grid md:grid-cols-[auto,1fr] gap-8 items-center relative z-10">
                  {/* Avatar section with enhanced styling */}
                  <motion.div className="relative mx-auto md:mx-0" variants={quoteVariants}>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                      <Image
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].author}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Quote icon with animation */}
                    <motion.div
                      className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    >
                      <Quote className="w-6 h-6" />
                    </motion.div>

                    {/* Rating stars with staggered animation */}
                    <div className="absolute -top-2 -left-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full py-1 px-3 shadow-md border border-primary/10 flex items-center">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Content section */}
                  <div>
                    <motion.blockquote
                      className="text-xl md:text-2xl font-medium mb-6 leading-relaxed relative"
                      variants={itemVariants}
                    >
                      <span className="text-primary">"</span>
                      {testimonials[activeIndex].quote}
                      <span className="text-primary">"</span>
                    </motion.blockquote>

                    <motion.div className="space-y-1" variants={itemVariants}>
                      <div className="font-semibold text-xl">{testimonials[activeIndex].author}</div>
                      <div className="text-primary font-medium">{testimonials[activeIndex].role}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="inline-block w-4 h-0.5 bg-primary/50 rounded-full"></span>
                        {testimonials[activeIndex].project}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced navigation controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`relative h-3 rounded-full transition-all duration-300 overflow-hidden ${
                      index === activeIndex ? "w-12 bg-primary/20" : "w-3 bg-primary/20 hover:bg-primary/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    {index === activeIndex && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, repeat: isAutoPlaying ? Number.POSITIVE_INFINITY : 0 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* View all testimonials link */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#" className="inline-flex items-center text-primary font-medium hover:underline group">
              <span>View All Testimonials</span>
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

