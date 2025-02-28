"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, CheckCircle } from "lucide-react"

const Portfolio = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentProject, setCurrentProject] = useState(null)

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "industrial", label: "Industrial" },
  ]

  const projects = [
    {
      title: "Modern Villa",
      category: "residential",
      description: "Luxurious modern villa with sustainable features and smart home integration.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      location: "Karen, Nairobi",
      year: "2023",
      details: ["5,000 sq ft living space", "Smart home automation", "Solar power system", "Infinity pool"],
    },
    {
      title: "Office Complex",
      category: "commercial",
      description: "Contemporary office building with state-of-the-art facilities and green spaces.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      location: "Westlands, Nairobi",
      year: "2023",
      details: ["12-story building", "Green certification", "Underground parking", "Rooftop garden"],
    },
    {
      title: "Warehouse Facility",
      category: "industrial",
      description: "Modern warehouse with advanced logistics infrastructure and security systems.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      location: "Industrial Area, Nairobi",
      year: "2022",
      details: ["50,000 sq ft facility", "Loading docks", "Climate control", "24/7 security"],
    },
    {
      title: "Luxury Apartments",
      category: "residential",
      description: "High-end apartment complex with premium amenities and stunning views.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      location: "Kilimani, Nairobi",
      year: "2023",
      details: ["24 luxury units", "Fitness center", "Swimming pool", "Concierge service"],
    },
    {
      title: "Shopping Mall",
      category: "commercial",
      description: "Modern retail space with entertainment facilities and restaurants.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      location: "Kiambu Road, Nairobi",
      year: "2022",
      details: ["100+ retail spaces", "Food court", "Cinema complex", "Children's play area"],
    },
    {
      title: "Manufacturing Plant",
      category: "industrial",
      description: "State-of-the-art manufacturing facility with automated systems.",
      imageSrc: "/placeholder.svg?height=600&width=800",
      location: "Athi River, Machakos",
      year: "2023",
      details: ["Automated production lines", "Quality control lab", "Staff facilities", "Waste management system"],
    },
  ]

  const filteredProjects = projects.filter((project) => activeCategory === "all" || project.category === activeCategory)

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-sm font-medium text-primary">Our Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our diverse portfolio of completed projects showcasing our commitment to excellence in construction
            and design.
          </p>
        </motion.div>

        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.imageSrc || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <button
                        onClick={() => setCurrentProject(project)}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"
                      >
                        View Project
                      </button>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-sm text-primary font-medium">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                      <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                    </div>

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/portfolio">
            <Button size="lg" className="rounded-full px-8 group">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentProject(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-80">
                <Image
                  src={currentProject.imageSrc || "/placeholder.svg"}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setCurrentProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <span className="text-sm text-primary font-medium">
                    {currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1)}
                  </span>
                  <h3 className="text-2xl font-bold mt-1">{currentProject.title}</h3>
                </div>

                <p className="text-muted-foreground mb-6">{currentProject.description}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3">Location</h4>
                    <p className="text-muted-foreground">{currentProject.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Year Completed</h4>
                    <p className="text-muted-foreground">{currentProject.year}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Project Details</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {currentProject.details.map((detail, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button size="lg" className="rounded-full px-8">
                    Request Similar Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Portfolio

