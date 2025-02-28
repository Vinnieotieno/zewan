"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

const TeamSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const teamMembers = [
    {
      name: "Manasseh Zefania Odira",
      role: "Founder & CEO",
      image: "/zeph.avif",
      bio: "Manasseh Zefania Odira is a dedicated construction professional with a passion for building excellence. As the driving force behind Zewan Construction Company, Manasseh brings years of experience in designing, drafting, and managing residential and commercial construction projects.",
      expertise: ["Architectural Design", "Project Management", "Sustainable Construction", "Client Relations"],
      social: {
        email: "manasseh@zewanconstruction.com",
        phone: "+1234567890",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Quintah Gathoni",
      role: "Construction Director",
      image: "/gathoni.avif",
      bio: "Quintah Gathoni is a skilled and passionate construction expert committed to delivering top-quality projects. As a key figure at Zewan Construction Company, she brings extensive experience in planning, designing, and overseeing residential and commercial builds.",
      expertise: ["Construction Management", "Quality Control", "Team Leadership", "Project Planning"],
      social: {
        email: "quintah@zewanconstruction.com",
        phone: "+1234567891",
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Our dedicated team of professionals brings decades of combined experience to every project, ensuring
            excellence in every build.
          </p>
        </motion.div>

        {/* Team Members */}
        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  {/* Image Container */}
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Name and Role Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary/90 font-medium">{member.role}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{member.bio}</p>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-3">AREAS OF EXPERTISE</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Social */}
                  <div className="pt-6 border-t">
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`mailto:${member.social.email}`}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        <span>Email</span>
                      </a>
                      <a
                        href={`tel:${member.social.phone}`}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span>Call</span>
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href={member.social.twitter}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        <span>Twitter</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Join Our Team</h3>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for excellence in construction. If
              you're interested in joining our team, we'd love to hear from you.
            </p>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection

