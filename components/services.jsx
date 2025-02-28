"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Home, Hammer, PaintBucket, Ruler, Building2, Warehouse, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const services = [
    {
      icon: Home,
      title: "Custom Home Building",
      description: "We design and build custom homes tailored to your specific needs, preferences, and lifestyle.",
      features: ["Architectural Design", "Energy Efficiency", "Smart Home Integration", "Premium Materials"],
    },
    {
      icon: Hammer,
      title: "Home Renovations",
      description: "Transform your existing home with our comprehensive renovation services.",
      features: ["Kitchen Remodeling", "Bathroom Updates", "Basement Finishing", "Room Additions"],
    },
    {
      icon: PaintBucket,
      title: "Interior & Exterior",
      description: "Enhance the beauty and functionality of your home with our finishing services.",
      features: ["Custom Painting", "Texture Finishing", "Exterior Siding", "Decorative Elements"],
    },
    {
      icon: Ruler,
      title: "Additions & Extensions",
      description: "Expand your living space with our home addition and extension services.",
      features: ["Room Extensions", "Second Stories", "Garage Conversions", "Outdoor Living"],
    },
    {
      icon: Building2,
      title: "Commercial Projects",
      description: "Professional construction services for businesses and commercial properties.",
      features: ["Office Buildings", "Retail Spaces", "Restaurants", "Medical Facilities"],
    },
    {
      icon: Warehouse,
      title: "Industrial Solutions",
      description: "Specialized construction services for industrial and manufacturing facilities.",
      features: ["Warehouses", "Factories", "Storage Units", "Production Plants"],
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-grid-primary/5 bg-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Construction
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From residential to commercial projects, we offer a wide range of construction services tailored to meet
            your specific needs and exceed your expectations.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <service.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6">{service.description}</p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-auto">
                  <Link
                    href={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/services">
            <Button size="lg" className="rounded-full px-8 group">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Services

