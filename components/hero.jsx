"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"

const Hero = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/custom.avif?height=1080&width=1920",
      title: "Custom Home Building",
      description: "Creating your dream home with exceptional craftsmanship",
    },
    {
      image: "/renovation.avif?height=1080&width=1920",
      title: "Home Renovations",
      description: "Transforming spaces with innovative design solutions",
    },
    {
      image: "/commercial.avif?height=1080&width=1920",
      title: "Commercial Construction",
      description: "Building the future of business infrastructure",
    },
    {
      image: "/interior.avif?height=1080&width=1920",
      title: "Interior Design",
      description: "Crafting beautiful and functional living spaces",
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
    }, 5000)
    return () => clearInterval(timer)
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={slide.image || "/custom.avif"} alt={slide.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        </motion.div>
      ))}

     
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="max-w-4xl">
          {/* Overline */}
          <motion.div
            variants={itemVariants}
            className="inline-block mt-6 px-4 py-1.5  rounded-full border border-white/20 backdrop-blur-sm"
          >
            <span className="text-white/80 text-sm font-medium">Excellence in Construction Since 2023</span>
          </motion.div>

        {/* Hero Section */}
      <div className="text-center mt-20 md:mt-32 px-4">
        <motion.h1
          className="text-5xl md:text-7xl  lg:text-8xl font-extrabold mb-12 text-white leading-tight drop-shadow-lg"
        >
          Building Dreams Into
          <span className="block  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 animate-pulse">
            Reality
          </span>
        </motion.h1>

       {/* <motion.p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          With over <span className="font-semibold text-white">20 years</span> of experience, we transform your vision
          into extraordinary spaces through <span className="text-primary">innovative design</span> and
          <span className="text-primary"> exceptional craftsmanship</span>.
        </motion.p>*/}
      </div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap mb-6 justify-center gap-4">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="h-14 px-8 text-lg mb-12 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full mb-12 text-white border-white/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
              >
                Get a Quote
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Service Indicators */}
          <motion.div variants={itemVariants} className="mt-20 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-primary scale-100" : "bg-white/20 scale-90"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm font-medium"></span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Service Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`text-center transition-all duration-300 ${
                    currentSlide === index ? "scale-110" : "opacity-50"
                  }`}
                >
                  <h3 className="text-white text-sm font-medium">{slide.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

