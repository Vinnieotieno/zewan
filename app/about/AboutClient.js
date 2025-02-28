"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProcessSection from "@/components/process-section"
import { Building2, Users, Clock, Award, CheckCircle } from "lucide-react"
import TeamSection from "@/components/team-section"

export default function AboutClient() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img src="/about.avif" alt="Modern construction site" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          </motion.div>

          <div className="relative container mx-auto h-full flex items-center justify-center px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm"
              >
                <span className="text-white/80 text-sm font-medium">Excellence in Construction Since 2023</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
              >
                Building{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/80">
                  Excellence
                </span>
              </motion.h1>

              {/* Animated line separator */}
              <motion.div
                className="relative h-1 w-32 mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full blur-sm" />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-white/90"
              >
                Crafting quality spaces with <span className="text-primary font-medium">precision</span> and{" "}
                <span className="text-primary font-medium">passion</span>
              </motion.p>
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
              <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
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
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Building2, number: "500+", label: "Projects Completed" },
                { icon: Users, number: "1000+", label: "Happy Clients" },
                { icon: Clock, number: "20+", label: "Years Experience" },
                { icon: Award, number: "50+", label: "Awards Won" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* Rest of the content remains the same */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2003, Zewan Construction has grown from a small family business to one of the region's
                    most respected construction companies. With over 20 years of experience, we've built our reputation
                    on quality craftsmanship, attention to detail, and exceptional customer service.
                  </p>
                  <p>
                    Our founder started with a simple mission: to build homes that families would cherish for
                    generations. Today, that mission continues to guide everything we do.
                  </p>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6">Our Core Values</h3>
                <div className="space-y-4">
                  {[
                    "Quality craftsmanship in every detail",
                    "Transparent communication",
                    "Innovation in construction",
                    "Customer satisfaction",
                    "Sustainable practices",
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <TeamSection />
      </main>
      <Footer />

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  )
}

