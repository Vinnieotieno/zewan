"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, Award, Users, Clock, ArrowRight, Building2, Shield, Heart, Lightbulb } from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const stats = [
    { icon: Building2, number: "500+", label: "Projects Completed" },
    { icon: Users, number: "1000+", label: "Happy Clients" },
    { icon: Clock, number: "20+", label: "Years Experience" },
    { icon: Award, number: "50+", label: "Awards Won" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "We maintain the highest standards in construction, using premium materials and proven techniques.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.",
    },
    {
      icon: Heart,
      title: "Passion & Dedication",
      description: "We're passionate about construction and dedicated to bringing your vision to life.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new technologies and methods to deliver cutting-edge construction solutions.",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-grid-primary/5 bg-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <Image
                  src="/co.jpg?height=600&width=800"
                  alt="Zewan Construction Team"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-2xl -z-10" />
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <span className="text-sm font-medium text-primary">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Building Excellence
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Since 2003
              </span>
            </h2>

            <p className="text-muted-foreground text-lg">
              With over two decades of experience, Zewan Construction has established itself as a leader in the
              construction industry. We combine traditional craftsmanship with modern innovation to deliver exceptional
              results.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Quality craftsmanship in every detail",
                "Transparent communication throughout",
                "On-time and on-budget delivery",
                "Sustainable building practices",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button size="lg" className="rounded-full px-8 group">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              These principles guide everything we do and help us deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

