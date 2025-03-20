"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, Phone, Linkedin, Twitter, X } from 'lucide-react'
import Image from "next/image"

const TeamSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [zoomedImage, setZoomedImage] = useState(null)

  const teamMembers = [
    {
      name: "Manasseh.Z.Odira",
      role: "Founder & CEO",
      image: "/zeph1.png",
      bio: "Manasseh Zefania Odira is a dedicated construction professional with a passion for building excellence. As the driving force behind Zewan Construction Company, Manasseh brings years of experience in designing, drafting, and managing residential and commercial construction projects.",
      expertise: ["Architectural Design", "Project Management", "Sustainable Construction", "Client Relations"],
      social: {
        email: "manasseh@zewanconstruction.com",
        phone: "+254790747864",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Quintah Gathoni",
      role: "Construction Director",
      image: "/quin1.png",
      bio: "Quintah Gathoni is a skilled and passionate construction expert committed to delivering top-quality projects. As a key figure at Zewan Construction Company, she brings extensive experience in planning, designing, and overseeing residential and commercial builds.",
      expertise: ["Construction Management", "Quality Control", "Team Leadership", "Project Planning"],
      social: {
        email: "quintah@zewanconstruction.com",
        phone: "+254792879775",
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  const handleImageZoom = (imageSrc, name) => {
    setZoomedImage({ src: imageSrc, name });
  }

  const closeZoom = () => {
    setZoomedImage(null);
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
      />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            OUR LEADERSHIP
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <p className="text-lg text-muted-foreground">
            Our dedicated team of professionals brings decades of combined experience to every project, ensuring
            excellence in every build.
          </p>
        </motion.div>

        {/* Team Members with Alternating Layout */}
        <div ref={ref} className="space-y-16">
          {teamMembers.map((member, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1`}>
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                    {/* Image Container - Using aspect ratio instead of fixed height */}
                    <div className="md:w-1/2 relative">
                      <div 
                        className="aspect-[3/4] md:aspect-auto md:h-full w-full relative cursor-pointer"
                        onClick={() => handleImageZoom(member.image, member.name)}
                      >
                        <div className="absolute inset-0 bg-blue-400 flex items-center justify-center overflow-hidden">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-contain object-center group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            quality={95}
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=600&width=600";
                            }}
                          />
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <span className="bg-white/80 text-primary px-4 py-2 rounded-full text-sm font-medium">Click to zoom</span>
                          </div>
                        </div>
                        
                        {/* Name and Role Overlay for Mobile */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:hidden bg-gradient-to-t from-black/80 to-transparent">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                            <p className="text-primary-foreground font-medium opacity-90">{member.role}</p>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      {/* Desktop Name and Role */}
                      <div className="hidden md:block mb-4">
                        <h3 className="text-2xl font-bold mb-1 relative inline-block">
                          {member.name}
                          <motion.span 
                            className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                          />
                        </h3>
                        <p className="text-primary font-medium">{member.role}</p>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{member.bio}</p>

                      {/* Expertise */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary mb-3 tracking-wider flex items-center">
                          <span className="w-5 h-0.5 bg-primary mr-2"></span>
                          AREAS OF EXPERTISE
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex} 
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.1 * skillIndex }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Contact & Social */}
                      <div className="pt-6 border-t border-primary/10">
                        <div className="flex flex-wrap gap-4">
                          <a
                            href={`mailto:${member.social.email}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Mail size={16} />
                            {member.social.email}
                          </a>
                          <a
                            href={`tel:${member.social.phone}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Phone size={16} />
                            {member.social.phone}
                          </a>
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Linkedin size={16} />
                            LinkedIn
                          </a>
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Twitter size={16} />
                            Twitter
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeZoom}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-blue-50 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={closeZoom}
                  className="bg-white/80 hover:bg-white p-2 rounded-full text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="relative h-[80vh] w-full">
                <Image 
                  src={zoomedImage.src} 
                  alt={zoomedImage.name}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 text-center">
                <h3 className="text-xl font-bold text-gray-800">{zoomedImage.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;