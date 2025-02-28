"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative h-[80vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486744328743-c1151100a95b?auto=format&fit=crop&q=80"
            alt="Modern construction project"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90" />

          <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-8 px-6 py-2 rounded-full border-2 border-primary/30 backdrop-blur-sm bg-black/20"
              >
                <span className="text-white text-sm md:text-base font-medium tracking-wider uppercase bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
                  Let's Build Together
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              >
                <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Transform Your Vision Into</span>
                <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Reality
                </span>
              </motion.h1>

              <motion.div
                className="relative h-1 w-40 mx-auto mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full blur-sm" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              >
                Ready to start your next construction project? Our expert team is here to bring your ideas to life with
                precision and excellence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-white text-lg min-w-[200px] group shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm text-lg min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Our Projects
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-sm font-medium tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                Scroll to Contact Us
              </span>
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2 backdrop-blur-sm bg-black/10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <motion.div
                  className="w-1 h-2 bg-white rounded-full"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section ref={ref} className="py-24 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div id="contact-form" className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
              >
                <h2 className="text-2xl font-semibold mb-8">Send Us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/10 rounded-lg p-8 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium text-primary mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="h-12 px-4 bg-muted/50"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="h-12 px-4 bg-muted/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="h-12 px-4 bg-muted/50"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Select value={formData.service} onValueChange={handleSelectChange}>
                        <SelectTrigger className="h-12 px-4 bg-muted/50">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom-home">Custom Home Building</SelectItem>
                          <SelectItem value="renovation">Home Renovation</SelectItem>
                          <SelectItem value="addition">Home Addition</SelectItem>
                          <SelectItem value="commercial">Commercial Construction</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        className="px-4 py-3 bg-muted/50 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-lg relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-primary transition-transform duration-300 group-hover:scale-105" />
                    </Button>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                  <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>

                  <div className="space-y-6">
                    {[
                      {
                        icon: Phone,
                        title: "Phone",
                        content: "(+254) 790747864",
                        action: "tel:+254790747864",
                      },
                      {
                        icon: Mail,
                        title: "Email",
                        content: "info@zewanconstruction.com",
                        action: "mailto:info@zewanconstruction.com",
                      },
                      {
                        icon: MapPin,
                        title: "Office",
                        content: "123 Construction Way, Nairobi, Kenya",
                      },
                      {
                        icon: Clock,
                        title: "Hours",
                        content: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: By appointment\nSunday: Closed",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group"
                      >
                        {item.action ? (
                          <a href={item.action} className="flex items-start group-hover:text-primary transition-colors">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <item.icon className="h-6 w-6" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium mb-1">{item.title}</h3>
                              <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                <item.icon className="h-6 w-6" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium mb-1">{item.title}</h3>
                              <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19891888283!2d36.70730744863281!3d-1.3031933000000172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1645564658896!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

