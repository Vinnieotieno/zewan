"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Eye } from "lucide-react"

export default function Portfolio() {
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isProjectsInView = useInView(projectsRef, { once: true })
  const [hoveredProject, setHoveredProject] = useState(null)

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "custom-homes", label: "Custom Homes" },
    { id: "renovations", label: "Renovations" },
    { id: "commercial", label: "Commercial" },
  ]

  const projects = [
    {
      id: 1,
      title: "Modern Farmhouse",
      category: "custom-homes",
      description:
        "A beautiful custom-built modern farmhouse featuring open concept living spaces, custom cabinetry, and energy-efficient design.",
      imageSrc:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Nairobi, Kenya",
      year: "2023",
      slug: "modern-farmhouse",
    },
    {
      id: 2,
      title: "Luxury Kitchen Renovation",
      category: "renovations",
      description: "Complete kitchen renovation with custom cabinets, quartz countertops, and high-end appliances.",
      imageSrc:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      location: "Mombasa, Kenya",
      year: "2022",
      slug: "luxury-kitchen-renovation",
    },
    {
      id: 3,
      title: "Tech Hub Office Building",
      category: "commercial",
      description: "A modern office building with sustainable features and collaborative workspaces.",
      imageSrc:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      location: "Nairobi, Kenya",
      year: "2023",
      slug: "tech-hub-office-building",
    },
    {
      id: 4,
      title: "Lakeside Luxury Villa",
      category: "custom-homes",
      description: "Custom luxury home with high-end finishes, smart home technology, and outdoor living spaces.",
      imageSrc:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Nakuru, Kenya",
      year: "2022",
      slug: "lakeside-luxury-villa",
    },
    {
      id: 5,
      title: "Spa-Inspired Bathroom",
      category: "renovations",
      description: "Spa-like bathroom renovation with custom tile work, freestanding tub, and walk-in shower.",
      imageSrc:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Nairobi, Kenya",
      year: "2023",
      slug: "spa-inspired-bathroom",
    },
    {
      id: 6,
      title: "Boutique Retail Space",
      category: "commercial",
      description: "Modern retail space designed for optimal customer flow and product display.",
      imageSrc:
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Mombasa, Kenya",
      year: "2022",
      slug: "boutique-retail-space",
    },
    {
      id: 7,
      title: "Contemporary Urban Home",
      category: "custom-homes",
      description: "A sleek, modern urban home with minimalist design and sustainable features.",
      imageSrc:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      location: "Nairobi, Kenya",
      year: "2023",
      slug: "contemporary-urban-home",
    },
    {
      id: 8,
      title: "Open Concept Living Room",
      category: "renovations",
      description: "Transformation of a traditional closed floor plan into a bright, open concept living space.",
      imageSrc:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      location: "Kisumu, Kenya",
      year: "2022",
      slug: "open-concept-living-room",
    },
    {
      id: 9,
      title: "Corporate Headquarters",
      category: "commercial",
      description: "A state-of-the-art corporate headquarters with modern amenities and sustainable design.",
      imageSrc:
        "https://images.unsplash.com/photo-1577760258779-e787a1733016?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Nairobi, Kenya",
      year: "2023",
      slug: "corporate-headquarters",
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Modern luxury home interior"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block mb-6 px-6 py-2 rounded-full border border-primary/30 backdrop-blur-sm bg-black/20"
              >
                <span className="text-white font-medium tracking-wider uppercase">Our Portfolio</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 text-white">
                Crafting <span className="text-primary">Exceptional</span> Spaces
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                Explore our collection of custom homes, renovations, and commercial projects that showcase our
                commitment to quality craftsmanship and attention to detail.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white"
                  onClick={() => projectsRef.current.scrollIntoView({ behavior: "smooth" })}
                >
                  View Our Projects
                  <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} className="py-24 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Featured Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-muted-foreground">
                Browse our collection of completed projects that showcase our commitment to quality, craftsmanship, and
                customer satisfaction.
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="mb-16">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-full">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {projects
                      .filter((project) => category.id === "all" || project.category === category.id)
                      .map((project) => (
                        <motion.div
                          key={project.id}
                          variants={fadeInUp}
                          className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-500"
                          onMouseEnter={() => setHoveredProject(project.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          whileHover={{ y: -10 }}
                        >
                          <Link href={`/portfolio/${project.slug}`}>
                            <div className="relative h-72 overflow-hidden">
                              <Image
                                src={project.imageSrc || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              {/* Overlay that appears on hover */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}`}
                              >
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-white/80 text-sm">{project.location}</p>
                                      <p className="text-white/80 text-sm">{project.year}</p>
                                    </div>
                                    <div className="bg-primary/90 rounded-full p-3 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                                      <Eye className="h-5 w-5 text-white" />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Category Badge */}
                              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                                {categories.find((cat) => cat.id === project.category)?.label}
                              </div>
                            </div>

                            <div className="p-6">
                              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                              {/*<div className="flex items-center text-primary font-medium">
                                <span>View Project</span>
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                              </div>*/}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                These are just a few examples of our work. Contact us to discuss how we can bring your vision to life.
              </p>
              <Link href="/contact">
                <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "100+", label: "Projects Completed" },
                { number: "95%", label: "Client Satisfaction" },
                { number: "More ", label: "Years Of Experience" },
                { number: "5+", label: "Design Awards" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-primary">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

