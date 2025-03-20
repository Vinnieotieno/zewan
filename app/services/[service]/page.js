"use client"

import { useParams } from "next/navigation"
import NextImage from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { CheckCircle, ArrowRight, Award, Phone, ChevronRight, MessageSquare, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Standardize colors across all service types to use the same blue gradient
const standardizeColors = (serviceData) => {
  return {
    ...serviceData,
    color: "from-blue-500/20 to-blue-700/40",
    lightColor: "bg-blue-50 dark:bg-blue-900/10",
    darkColor: "bg-blue-900 dark:bg-blue-800",
  }
}

const serviceDetails = {
  "custom-home-building": {
    title: "Custom Home Building",
    subtitle: "Crafting Your Dream Home",
    description:
      "We design and build custom homes tailored to your specific needs, preferences, and lifestyle. Our expert team works closely with you from concept to completion, ensuring every detail reflects your vision and exceeds your expectations.",
    longDescription:
      "Our custom home building process begins with understanding your unique vision. We collaborate with top architects and designers to create a home that perfectly balances aesthetics, functionality, and sustainability. Using premium materials and innovative construction techniques, we build homes that stand the test of time while providing exceptional comfort and efficiency.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Custom Architectural Design",
      "Energy Efficient Construction",
      "Smart Home Integration",
      "Premium Materials & Finishes",
      "Open Concept Living Spaces",
      "Luxury Kitchen & Bath Design",
    ],
    benefits: [
      "A home perfectly tailored to your lifestyle",
      "Energy efficiency that reduces utility costs",
      "Modern features that enhance daily living",
      "Increased property value and investment potential",
    ],
    process: [
      { title: "Consultation", description: "We discuss your vision, needs, and budget" },
      { title: "Design", description: "Our architects create detailed plans for your approval" },
      { title: "Construction", description: "We build your home with precision and care" },
      { title: "Finishing", description: "Interior and exterior details are completed" },
      { title: "Final Walkthrough", description: "We ensure everything meets our high standards" },
    ],
    testimonial: {
      quote:
        "Zewan Construction turned our dream home into reality. Their attention to detail and commitment to quality exceeded our expectations.",
      author: "Michael & Sarah Johnson",
      location: "Nairobi",
    },
    stats: [
      { value: "100+", label: "Custom Homes Built" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "25+", label: "Design Awards" },
    ],
    color: "from-blue-500 to-blue-600",
    lightColor: "bg-blue-50 dark:bg-blue-900/10",
    darkColor: "bg-blue-900 dark:bg-blue-800",
  },
  "home-renovations": {
    title: "Home Renovations",
    subtitle: "Transform Your Living Space",
    description:
      "Transform your existing home with our comprehensive renovation services. Whether you're looking to update a single room or completely reimagine your space, our team delivers exceptional results.",
    longDescription:
      "Our renovation services breathe new life into your existing home. We specialize in transforming outdated spaces into modern, functional areas that reflect your personal style. From kitchen and bathroom remodels to whole-house renovations, we handle every aspect of the project with meticulous attention to detail and quality craftsmanship.",
    image: "/home.avif",
    galleryImages: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Kitchen Remodeling",
      "Bathroom Updates",
      "Basement Finishing",
      "Room Additions",
      "Floor Plan Modifications",
      "Structural Improvements",
    ],
    benefits: [
      "Increased home value and market appeal",
      "Improved functionality and space utilization",
      "Updated aesthetics that reflect current trends",
      "Enhanced energy efficiency and comfort",
    ],
    process: [
      { title: "Assessment", description: "We evaluate your current space and discuss your goals" },
      { title: "Planning", description: "Detailed renovation plans and material selections" },
      { title: "Demolition", description: "Careful removal of elements to be replaced" },
      { title: "Reconstruction", description: "Building new structures and installing systems" },
      { title: "Finishing", description: "Adding final touches and design elements" },
    ],
    testimonial: {
      quote:
        "Our kitchen renovation exceeded all expectations. The team was professional, the work was impeccable, and they finished on schedule.",
      author: "David & Emily Thompson",
      location: "Mombasa",
    },
    stats: [
      { value: "500+", label: "Renovations Completed" },
      { value: "95%", label: "On-Time Completion" },
      { value: "15+", label: "Design Awards" },
    ],
    color: "from-amber-500 to-amber-600",
    lightColor: "bg-amber-50 dark:bg-amber-900/10",
    darkColor: "bg-amber-900 dark:bg-amber-800",
  },
  "interior-and-exterior": {
    title: "Interior & Exterior",
    subtitle: "Elevate Your Home's Aesthetics",
    description:
      "Enhance the beauty and functionality of your home with our finishing services. We specialize in creating stunning interiors and exteriors that reflect your personal style.",
    longDescription:
      "Our interior and exterior finishing services add the perfect final touches to your home. From custom painting and texture work to exterior siding and decorative elements, we focus on the details that make your home truly special. Our skilled craftsmen use premium materials and techniques to create finishes that are both beautiful and durable.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2080&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2032&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop",
    ],
    features: [
      "Custom Painting & Wallpaper",
      "Texture Finishing & Plaster Work",
      "Exterior Siding & Cladding",
      "Decorative Moldings & Trim",
      "Custom Cabinetry & Built-ins",
      "Stone & Brick Facades",
    ],
    benefits: [
      "Enhanced aesthetic appeal and curb appeal",
      "Protection against weather and environmental factors",
      "Personalized design that reflects your style",
      "Increased home value and marketability",
    ],
    process: [
      { title: "Consultation", description: "We discuss your style preferences and needs" },
      { title: "Material Selection", description: "Choosing the right finishes and materials" },
      { title: "Preparation", description: "Proper surface preparation for lasting results" },
      { title: "Application", description: "Expert application of finishes and materials" },
      { title: "Final Inspection", description: "Ensuring perfect results and client satisfaction" },
    ],
    testimonial: {
      quote:
        "The exterior finishing transformed our home completely. The attention to detail and quality of work was exceptional.",
      author: "Robert & Lisa Chen",
      location: "Nakuru",
    },
    stats: [
      { value: "300+", label: "Projects Completed" },
      { value: "97%", label: "Client Satisfaction" },
      { value: "10+", label: "Industry Awards" },
    ],
    color: "from-emerald-500 to-emerald-600",
    lightColor: "bg-emerald-50 dark:bg-emerald-900/10",
    darkColor: "bg-emerald-900 dark:bg-emerald-800",
  },
  "additions-and-extensions": {
    title: "Additions & Extensions",
    subtitle: "Expand Your Living Space",
    description:
      "Expand your living space with our home addition and extension services. We seamlessly integrate new areas with your existing home to create a cohesive and functional space.",
    longDescription:
      "Our additions and extensions services help you maximize your property's potential without the need to relocate. Whether you need an extra bedroom, an expanded kitchen, or a completely new wing, we design and build additions that blend seamlessly with your existing structure while adding valuable living space. Our structural expertise ensures that all additions are built to last and enhance your home's functionality and value.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop",
    ],
    features: [
      "Room Extensions",
      "Second Story Additions",
      "Garage Conversions",
      "Outdoor Living Spaces",
      "Sunrooms & Conservatories",
      "In-Law Suites",
    ],
    benefits: [
      "Increased living space without relocating",
      "Customized solutions for your specific needs",
      "Seamless integration with existing structure",
      "Significant boost to property value",
    ],
    process: [
      { title: "Site Evaluation", description: "Assessing your property and structural considerations" },
      { title: "Design Development", description: "Creating plans that complement your existing home" },
      { title: "Permitting", description: "Handling all necessary building permits and approvals" },
      { title: "Construction", description: "Building your addition with minimal disruption" },
      { title: "Integration", description: "Ensuring seamless connection with existing structure" },
    ],
    testimonial: {
      quote:
        "The second-story addition transformed our home and doubled our living space. The team managed to match the existing architecture perfectly.",
      author: "James & Patricia Wilson",
      location: "Kisumu",
    },
    stats: [
      { value: "200+", label: "Additions Built" },
      { value: "99%", label: "Structural Integrity" },
      { value: "40%", label: "Avg. Space Increase" },
    ],
    color: "from-purple-500 to-purple-600",
    lightColor: "bg-purple-50 dark:bg-purple-900/10",
    darkColor: "bg-purple-900 dark:bg-purple-800",
  },
  "commercial-projects": {
    title: "Commercial Projects",
    subtitle: "Building Business Success",
    description:
      "Professional construction services for businesses and commercial properties. We deliver high-quality, functional spaces that help your business thrive.",
    longDescription:
      "Our commercial construction services cater to businesses of all sizes, from small retail shops to large office complexes. We understand that commercial spaces must balance aesthetics, functionality, and cost-effectiveness. Our team works efficiently to minimize disruption to your business operations while delivering exceptional results that meet all building codes and industry standards.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Office Buildings & Complexes",
      "Retail Spaces & Storefronts",
      "Restaurants & Hospitality",
      "Medical & Healthcare Facilities",
      "Mixed-Use Developments",
      "Tenant Improvements",
    ],
    benefits: [
      "Spaces designed for operational efficiency",
      "Compliance with all commercial building codes",
      "Durable construction for high-traffic environments",
      "Flexible designs that can adapt to business growth",
    ],
    process: [
      { title: "Needs Analysis", description: "Understanding your business requirements" },
      { title: "Commercial Design", description: "Creating functional and appealing spaces" },
      { title: "Regulatory Compliance", description: "Ensuring all codes and regulations are met" },
      { title: "Efficient Construction", description: "Building with minimal business disruption" },
      { title: "Final Inspection", description: "Thorough quality control and client walkthrough" },
    ],
    testimonial: {
      quote:
        "Zewan Construction delivered our new office space on time and on budget. The result is a beautiful, functional workspace that our employees love.",
      author: "Sarah Johnson",
      location: "CEO, TechSolutions Inc.",
    },
    stats: [
      { value: "150+", label: "Commercial Projects" },
      { value: "92%", label: "Repeat Business" },
      { value: "100%", label: "Code Compliance" },
    ],
    color: "from-rose-500 to-rose-600",
    lightColor: "bg-rose-50 dark:bg-rose-900/10",
    darkColor: "bg-rose-900 dark:bg-rose-800",
  },
  "industrial-solutions": {
    title: "Industrial Solutions",
    subtitle: "Robust Infrastructure for Industry",
    description:
      "Specialized construction services for industrial and manufacturing facilities. We build robust, efficient spaces designed for productivity and safety.",
    longDescription:
      "Our industrial construction services focus on creating facilities that optimize workflow, ensure safety, and withstand the demands of industrial operations. From warehouses and factories to specialized production facilities, we understand the unique requirements of industrial construction. Our team works with engineers and industry specialists to deliver solutions that enhance operational efficiency while meeting all regulatory requirements.",
    image: "https://images.unsplash.com/photo-1581093458791-9d09a5c0d6e5?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Warehouses & Distribution Centers",
      "Manufacturing Facilities",
      "Storage Units & Complexes",
      "Production Plants",
      "Industrial Retrofits",
      "Specialized Equipment Foundations",
    ],
    benefits: [
      "Facilities designed for operational efficiency",
      "Durable construction for industrial demands",
      "Compliance with safety and environmental regulations",
      "Flexible spaces that can adapt to changing needs",
    ],
    process: [
      { title: "Requirements Analysis", description: "Understanding your industrial needs" },
      { title: "Engineering & Design", description: "Creating plans optimized for your operations" },
      { title: "Regulatory Compliance", description: "Meeting all industrial codes and standards" },
      { title: "Heavy-Duty Construction", description: "Building with industrial-grade materials" },
      { title: "Systems Integration", description: "Incorporating specialized equipment and systems" },
    ],
    testimonial: {
      quote:
        "The warehouse facility Zewan constructed has significantly improved our logistics operations. Their understanding of industrial requirements was impressive.",
      author: "Thomas Reynolds",
      location: "Operations Director, Global Logistics Ltd.",
    },
    stats: [
      { value: "75+", label: "Industrial Facilities" },
      { value: "100%", label: "Safety Compliance" },
      { value: "30%", label: "Efficiency Increase" },
    ],
    color: "from-cyan-500 to-cyan-600",
    lightColor: "bg-cyan-50 dark:bg-cyan-900/10",
    darkColor: "bg-cyan-900 dark:bg-cyan-800",
  },
}

const ServicePage = () => {
  const params = useParams()
  const service = params.service
  const originalServiceData = serviceDetails[service]

  // Standardize colors for all service types
  const serviceData = originalServiceData ? standardizeColors(originalServiceData) : null

  const [activeImage, setActiveImage] = useState(null)
  const [imagesLoaded, setImagesLoaded] = useState({})
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const processRef = useRef(null)
  const galleryRef = useRef(null)
  const testimonialRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true })
  const isProcessInView = useInView(processRef, { once: true })
  const isGalleryInView = useInView(galleryRef, { once: true })
  const isTestimonialInView = useInView(testimonialRef, { once: true })

  // Preload images for better performance
  useEffect(() => {
    if (serviceData) {
      // Preload main image
      const mainImg = new window.Image()
      mainImg.src = serviceData.image
      mainImg.onload = () => {
        if (!imagesLoaded.main) {
          setImagesLoaded((prev) => ({ ...prev, main: true })) // Update state only if not already loaded
        }
      }

      // Preload gallery images
      serviceData.galleryImages.forEach((src, index) => {
        const img = new window.Image()
        img.src = src
        img.onload = () => {
          if (!imagesLoaded[index]) {
            setImagesLoaded((prev) => ({ ...prev, [index]: true })) // Update state only if not already loaded
          }
        }
      })
    }
  }, [serviceData, imagesLoaded]) // Add dependencies to avoid unnecessary re-renders

  if (!serviceData) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="mt-4">The requested service could not be found.</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-background via-primary/5 to-background">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <motion.div
                  className={`inline-block px-4 py-1.5 rounded-full border border-primary/20 ${serviceData.lightColor}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="text-sm font-medium text-primary">{serviceData.subtitle}</span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {serviceData.title}
                  <span className={`block mt-2 bg-gradient-to-r ${serviceData.color} bg-clip-text text-transparent`}>
                    Services
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: -20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {serviceData.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className={`rounded-full px-8 group bg-gradient-to-r ${serviceData.color} hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]`}
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <a href="tel:+254790747864">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 group border-primary/20 hover:border-primary/40 transition-all duration-300"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      <span>Contact Us</span>
                    </Button>
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-primary/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {serviceData.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <motion.h3
                        className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${serviceData.color} bg-clip-text text-transparent`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isHeroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      >
                        {stat.value}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative">
                  <motion.div
                    className="relative z-10 rounded-2xl overflow-hidden shadow-xl group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    {!imagesLoaded.main && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl">
                        <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    )}

                    <NextImage
                      src={serviceData.image || "/placeholder.svg"}
                      alt={serviceData.title}
                      width={800}
                      height={600}
                      priority
                      className={`w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110 ${!imagesLoaded.main ? "opacity-0" : "opacity-100"}`}
                      onLoad={() => setImagesLoaded((prev) => ({ ...prev, main: true }))}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=600&width=800"
                        setImagesLoaded((prev) => ({ ...prev, main: true }))
                      }}
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60"></div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/60 backdrop-blur-sm text-white p-4 rounded-xl">
                        <h3 className="font-medium">Expert {serviceData.title} Services</h3>
                        <p className="text-sm text-white/80 mt-1">Quality craftsmanship and attention to detail</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Decorative Elements */}
                  <motion.div
                    className={`absolute -bottom-6 -right-6 w-2/3 h-2/3 ${serviceData.lightColor} rounded-2xl -z-10`}
                    animate={{
                      boxShadow: [
                        "0px 0px 0px rgba(59, 130, 246, 0.3)",
                        "0px 10px 30px rgba(59, 130, 246, 0.5)",
                        "0px 0px 0px rgba(59, 130, 246, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                  <div className="absolute -top-6 -left-6 w-32 h-32 border border-primary/20 rounded-2xl -z-10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our <span className="text-primary">Services</span> Include
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {serviceData.longDescription}
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative bg-white dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-primary/5`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${serviceData.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  {/* Icon */}
                  <div className="flex items-start mb-4">
                    <motion.div
                      className={`w-10 h-10 rounded-full ${serviceData.lightColor} flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{feature}</h3>
                  </div>

                  <p className="text-muted-foreground pl-14">
                    {/* Generate a description based on the feature */}
                    {`Our ${feature.toLowerCase()} services ensure your ${serviceData.title.toLowerCase()} project exceeds expectations with premium quality and expert craftsmanship.`}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              className="mt-20 bg-white dark:bg-black/40 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-primary/5"
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="h-6 w-6 text-primary mr-3" />
                Key Benefits
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {serviceData.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isFeaturesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-sm font-medium text-primary">OUR APPROACH</span>
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The Process We Follow
              </motion.h2>

              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our streamlined process ensures your {serviceData.title.toLowerCase()} project is completed efficiently,
                on time, and to your complete satisfaction.
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

              <div className="space-y-12 relative">
                {serviceData.process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                  >
                    {/* Step Number */}
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative">
                        <motion.div
                          className={`w-16 h-16 rounded-full ${serviceData.lightColor} flex items-center justify-center text-2xl font-bold z-10 border-4 border-white dark:border-black`}
                          animate={{
                            y: [0, -5, 0],
                            boxShadow: [
                              "0px 0px 0px rgba(59, 130, 246, 0.3)",
                              "0px 8px 20px rgba(59, 130, 246, 0.5)",
                              "0px 0px 0px rgba(59, 130, 246, 0.3)",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        >
                          {index + 1}
                        </motion.div>
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-md -z-10"></div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="md:w-1/2 bg-white dark:bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-primary/5">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section ref={galleryRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our <span className="text-primary">Portfolio</span>
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Browse through our recent {serviceData.title.toLowerCase()} projects to see the quality of our work.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {serviceData.galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => setActiveImage(index)}
                >
                  <div className="relative h-[300px]">
                    {!imagesLoaded[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
                        <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    )}

                    <NextImage
                      src={image || "/placeholder.svg"}
                      alt={`${serviceData.title} Project ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-110 ${!imagesLoaded[index] ? "opacity-0" : "opacity-100"}`}
                      onLoad={() => setImagesLoaded((prev) => ({ ...prev, [index]: true }))}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                        setImagesLoaded((prev) => ({ ...prev, [index]: true }))
                      }}
                    />

                    {/* Enhanced overlay with animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex items-end"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="p-6 w-full"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-white text-lg font-bold">Project {index + 1}</h3>
                        <p className="text-white/80 text-sm">Click to view details</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 group border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <span>View Full Portfolio</span>
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section ref={testimonialRef} className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              className={`bg-white dark:bg-black/40 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg border border-primary/5 relative overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={isTestimonialInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <MessageSquare className="h-10 w-10 text-primary" />
                    </motion.div>
                  </div>

                  <div className="md:w-2/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-amber-500 fill-amber-500" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl italic mb-4">"{serviceData.testimonial.quote}"</p>

                      <div>
                        <p className="font-semibold">{serviceData.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{serviceData.testimonial.location}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className={`rounded-2xl p-12 relative overflow-hidden bg-gradient-to-r ${serviceData.color}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Ready to Start Your {serviceData.title} Project?
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Contact us today for a free consultation and quote. Our team is ready to bring your vision to life.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="rounded-full px-8 group bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                    >
                      <span>Get a Free Quote</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <a href="tel:+254790747864">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 group border-white text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      <span>Call Us Now</span>
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image Modal */}
        <AnimatePresence>
          {activeImage !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <NextImage
                  src={serviceData.galleryImages[activeImage] || "/placeholder.svg"}
                  alt={`${serviceData.title} Project ${activeImage + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=800&width=1200"
                  }}
                />

                <button
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setActiveImage(null)}
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default ServicePage

