"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const testimonials = [
    {
      quote:
        "Zewan Construction exceeded our expectations in every way. Their attention to detail and commitment to quality is unmatched. We couldn't be happier with our new home!",
      author: "John & Sarah Thompson",
      role: "Custom Home Client",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      project: "Modern Villa in Karen",
    },
    {
      quote:
        "The team at Zewan was professional, responsive, and a pleasure to work with. They transformed our outdated kitchen into a beautiful, functional space that we love.",
      author: "Michael Davis",
      role: "Renovation Client",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      project: "Kitchen Renovation in Kilimani",
    },
    {
      quote:
        "We were impressed by Zewan's ability to bring our vision to life while staying on budget and completing the project ahead of schedule. Highly recommended!",
      author: "Emily Wilson",
      role: "Commercial Client",
      image: "/placeholder.svg?height=200&width=200",
      rating: 5,
      project: "Office Complex in Westlands",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with Zewan
            Construction.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-2xl p-8 md:p-12 shadow-lg"
              >
                <div className="grid md:grid-cols-[auto,1fr] gap-8 items-center">
                  <div className="relative">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground rounded-full p-2">
                      <Quote className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex mb-4">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                      "{testimonials[activeIndex].quote}"
                    </blockquote>

                    <div>
                      <div className="font-semibold text-lg">{testimonials[activeIndex].author}</div>
                      <div className="text-primary font-medium">{testimonials[activeIndex].role}</div>
                      <div className="text-sm text-muted-foreground mt-1">{testimonials[activeIndex].project}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

