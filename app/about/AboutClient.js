"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProcessSection from "@/components/process-section"
import TeamSection from "@/components/team-section"
import { Building2, Users, Clock, Award, ChevronDown, ArrowRight } from "lucide-react"

export default function AboutClient() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  const storyRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 })

  // Parallax effect for background image
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (document.querySelector(".parallax-bg")) {
        document.querySelector(".parallax-bg").style.transform = `translateY(${scrollPosition * 0.4}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section ref={targetRef} className="relative h-[100vh] overflow-hidden">
          {/* Parallax Background */}
          <div className="absolute inset-0 z-0">
            <div className="parallax-bg absolute inset-0">
              <motion.img
                src="/about.avif"
                alt="Modern construction site"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
            </div>
            {/* Lighter overlay to improve text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="particle absolute rounded-full bg-primary/30"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 20 + 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative container mx-auto h-full flex items-center justify-center px-4"
            style={{ opacity, scale, y }}
          >
            <motion.div
              className="max-w-4xl mx-auto text-center bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 px-6 py-2 rounded-full border border-white/40 backdrop-blur-sm bg-primary/50"
              >
                <span className="text-white text-sm font-medium tracking-wider">EXCELLENCE IN CONSTRUCTION</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
              >
                Our Vision,{" "}
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary/80">
                    Your Future
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  ></motion.span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] font-medium"
              >
                Crafting exceptional spaces with <span className="text-white text-sm font-medium drop-shadow-md">precision</span>,
                <span className="text-white text-sm font-medium drop-shadow-md"> passion</span>, and
                <span className="text-white text-sm font-medium drop-shadow-md"> purpose</span> for generations to come.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-10"
              >
                <a
                  href="#our-story"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl text-lg font-medium group"
                >
                  <span>Discover Our Story</span>
                  <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-sm font-medium drop-shadow-md">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <motion.div
                  className="w-1 h-2 bg-primary rounded-full"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Building2, number: "500+", label: "Projects Completed" },
                { icon: Users, number: "1000+", label: "Happy Clients" },
                { icon: Clock, number: "Many", label: "Years Experience" },
                { icon: Award, number: "50+", label: "Awards Won" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:rotate-6">
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold mb-2"
                    initial={{ opacity: 0 }}
                    animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* Our Story Section */}
        <section id="our-story" ref={storyRef} className="py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span
                className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                OUR JOURNEY
              </motion.span>
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                The Story Behind{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Our Success
                </span>
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-primary mx-auto mb-6"
                initial={{ width: 0 }}
                animate={isStoryInView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
                  <div className="relative overflow-hidden rounded-xl shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                      alt="Zewan Construction History"
                      className="w-full h-[400px] object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <h3 className="text-white text-xl font-bold">Our Legacy of Excellence</h3>
                        <p className="text-white/80 text-sm">Building dreams for generations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-1 bg-primary mr-4"></span>
                  Our Story
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Zewan Construction has grown from humble beginnings into one of the region's most respected
                    construction companies. We've built our reputation on quality craftsmanship, meticulous attention to
                    detail, and exceptional customer service throughout our journey in the industry.
                  </p>
                  <p className="leading-relaxed">
                    Our founder started with a simple mission: to build homes that families would cherish for
                    generations. Today, that mission continues to guide everything we do, as we expand our services and
                    reach while maintaining the personal touch that sets us apart.
                  </p>
                  <a href="/portfolio" className="inline-flex items-center text-primary font-medium mt-4 group">
                    <span>View Our Portfolio</span>
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />
      </main>
      <Footer />

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(10px) translateX(10px); }
        }
        
        .particle {
          opacity: 0.6;
          animation: float linear infinite;
        }
      `}</style>
    </>
  )
}