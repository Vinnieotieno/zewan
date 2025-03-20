"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X, MapPin, Calendar, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { projects } from "@/data/projectsData"

export default function ProjectPage({ params }) {
  const router = useRouter()
  // Unwrap the params object using React.use()
  const unwrappedParams = React.use(params)
  const { slug } = unwrappedParams

  // All state hooks must be called in the same order every render
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState({})
  const [project, setProject] = useState(null)

  // All ref hooks
  const galleryRef = useRef(null)

  // First useEffect - set the project based on slug
  useEffect(() => {
    if (slug && projects[slug]) {
      setProject(projects[slug])
    }
  }, [slug])

  // Second useEffect - handle image preloading
  useEffect(() => {
    // Reset loading state when project changes
    if (!project) return

    setIsLoading(true)
    setLoadedImages({})

    // Preload main image - use window.Image to avoid conflicts with Next.js Image component
    if (typeof window !== 'undefined') {
      const mainImg = new window.Image()
      mainImg.src = project.mainImage
      mainImg.onload = () => {
        setLoadedImages((prev) => ({ ...prev, main: true }))
        setIsLoading(false)
      }

      // Preload gallery images
      project.gallery.forEach((item, index) => {
        const img = new window.Image()
        img.src = item.image
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [index]: true }))
        }
      })
    }
  }, [project])

  // Third useEffect - keyboard event handlers
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (event) => {
      if (isGalleryOpen) {
        if (event.key === "Escape") {
          closeGallery()
        } else if (event.key === "ArrowRight") {
          nextImage()
        } else if (event.key === "ArrowLeft") {
          prevImage()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isGalleryOpen, project])

  if (!project) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => router.push("/portfolio")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
        <Footer />
      </>
    )
  }

  const openGallery = (index) => {
    setActiveImageIndex(index)
    setIsGalleryOpen(true)
    document.body.style.overflow = "hidden" // Disable scrolling on the body
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling on the body
  }

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length)
  }

  // Function to scroll the gallery
  const scrollGallery = (scrollOffset) => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft += scrollOffset
    }
  }

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 hover:bg-background/80 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>

          <motion.div
            className="project-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Project Header */}
            <div className="mb-8">
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {project.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-4 text-muted-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  {project.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  {project.year}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-primary font-medium">Client:</span>
                  {project.client}
                </div>
              </motion.div>
            </div>

            {/* Main Image */}
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-xl mb-8 aspect-[16/9]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <Image
                src={project.mainImage || "/placeholder.svg"}
                alt={project.title}
                fill
                priority
                className={`object-cover transition-opacity duration-500 ${loadedImages.main ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 768px) 100vw, 1200px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <button
                    onClick={() => openGallery(0)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Size
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Project Content */}
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="relative">
                  <div
                    className="gallery-container flex overflow-x-auto space-x-4 py-2 scrollbar-hide"
                    ref={galleryRef}
                  >
                    {project.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative rounded-lg overflow-hidden shadow-md flex-shrink-0 w-64 h-40 cursor-pointer group"
                        onClick={() => openGallery(index)}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={image.image || "/placeholder.svg"}
                          alt={image.title}
                          width={320}
                          height={200}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium">{image.title}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Scroll Buttons */}
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-white p-2 rounded-full shadow-md transition-all duration-300"
                    onClick={() => scrollGallery(-300)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-white p-2 rounded-full shadow-md transition-all duration-300"
                    onClick={() => scrollGallery(300)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/5">
                  <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/5">
                  <h2 className="text-xl font-semibold mb-4">Related Projects</h2>
                  <div className="space-y-4">
                    {project.relatedProjects.map((relatedKey) => {
                      const relatedProject = projects[relatedKey]
                      if (!relatedProject) return null

                      return (
                        <Link
                          href={`/portfolio/${relatedKey}`}
                          key={relatedKey}
                          className="flex items-center gap-3 group"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedProject.mainImage || "/placeholder.svg"}
                              alt={relatedProject.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
                              {relatedProject.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{relatedProject.category}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => router.push("/contact")}
                  >
                    Start Your Project
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Fullscreen Gallery Modal */}
        <AnimatePresence>
          {isGalleryOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
            >
              <motion.div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <Image
                  src={project.gallery[activeImageIndex].image || "/placeholder.svg"}
                  alt={project.gallery[activeImageIndex].title}
                  width={1600}
                  height={900}
                  className="max-w-full max-h-[80vh] object-contain"
                />

                {/* Navigation Controls */}
                <button
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                  onClick={closeGallery}
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
                  <button
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <h3 className="text-lg font-medium">{project.gallery[activeImageIndex].title}</h3>
                    <p className="text-sm text-white/70">
                      {activeImageIndex + 1} of {project.gallery.length}
                    </p>
                  </div>

                  <button
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}