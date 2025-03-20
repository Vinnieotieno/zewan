"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
    hasConcerns: null,
    concerns: "",
    consultationType: "in-person",
    preferredDate: null,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef(null)
  const heroRef = useRef(null)
  const isFormInView = useInView(formRef, { once: true })
  const isHeroInView = useInView(heroRef, { once: true })

  // Available services
  const availableServices = [
    { id: "custom-homes", label: "Custom Home Building" },
    { id: "renovations", label: "Home Renovations" },
    { id: "commercial", label: "Commercial Construction" },
    { id: "interior-design", label: "Interior Design" },
    { id: "additions", label: "Additions & Extensions" },
    { id: "finishing", label: "Interior & Exterior Finishing" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, service: value }))
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: "" }))
    }
  }

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      const updatedServices = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId]

      return { ...prev, services: updatedServices }
    })

    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }))
    }
  }

  const handleConcernsChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      hasConcerns: value,
      // Clear concerns text if "No" is selected
      concerns: value === "no" ? "" : prev.concerns,
    }))
  }

  const handleConsultationTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, consultationType: value }))
  }

  const handleDateSelect = (date) => {
    setFormData((prev) => ({ ...prev, preferredDate: date }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (formData.services.length === 0) newErrors.services = "Please select at least one service"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (formData.hasConcerns === "yes" && !formData.concerns.trim()) {
      newErrors.concerns = "Please describe your concerns"
    }
    if (formData.hasConcerns === null) {
      newErrors.hasConcerns = "Please indicate if you have any concerns"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        services: [],
        message: "",
        hasConcerns: null,
        concerns: "",
        consultationType: "in-person",
        preferredDate: null,
      })
    }, 1500)
  }

  const contactInfo = [
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
  ]

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerChildren = {
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
      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          {/* Background image with modern overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486744328743-c1151100a95b?auto=format&fit=crop&q=80"
              alt="Modern construction project"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center">
            <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 px-6 py-2 rounded-full border border-primary/30 backdrop-blur-md bg-black/20"
              >
                <span className="text-white font-medium tracking-wider uppercase">Let's Build Together</span>
              </motion.div>

              <motion.h1
                variants={fadeUpVariants}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-sans"
              >
                <span className="text-white drop-shadow-md">Transform Your Vision Into</span>
                <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  Reality
                </span>
              </motion.h1>

              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.6 }}
                className="h-1 w-40 mx-auto mb-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 rounded-full" />
                <div className="absolute inset-y-0 left-0 bg-white/30 w-16 blur-sm animate-pulse" />
              </motion.div>

              <motion.p
                variants={fadeUpVariants}
                transition={{ duration: 0.7 }}
                className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Ready to start your next construction project? Our expert team is here to bring your ideas to life with
                precision and excellence.
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                transition={{ duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-white text-lg min-w-[200px] group shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="flex flex-col items-center gap-3 group"
              >
                {/*<span className="text-white/90 font-medium tracking-wide">Scroll to Contact Us</span>*/}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  className="rounded-full border border-white/40 p-2 backdrop-blur-sm bg-black/10 group-hover:bg-white/20 transition-colors"
                >
                  <ChevronDown className="h-6 w-6 text-white/90" />
                </motion.div>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Modern Glass Design */}
        <section
          ref={formRef}
          className="py-24 relative bg-gradient-to-b from-slate-50 via-slate-100 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
        >
          {/* Background details */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-40" />
            <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl opacity-20" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold mb-4 text-slate-900 dark:text-white font-sans"
              >
                Get in Touch
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={isFormInView ? { width: "100px" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-primary mx-auto mb-6 relative overflow-hidden rounded-full"
              >
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/50 w-1/3 blur-sm"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto"
              >
                Ready to discuss your project? We're here to help you create exceptional spaces. Fill out the form below
                or use our contact information to reach us.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Contact Form with glass effect */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="backdrop-blur-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary/10 rounded-xl p-8 text-center"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
                          <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-medium text-slate-900 dark:text-white mb-4">Thank You!</h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          Your message has been sent successfully. We'll get back to you as soon as possible.
                        </p>
                        <Button
                          className="mt-6 rounded-full px-6 bg-primary hover:bg-primary/90 text-white"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-slate-900 dark:text-slate-200"
                            >
                              Full Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="h-12 px-4 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            {errors.name && (
                              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-slate-900 dark:text-slate-200"
                            >
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(+254) 790747864"
                              className="h-12 px-4 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            {errors.phone && (
                              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-900 dark:text-slate-200"
                          >
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="h-12 px-4 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          {errors.email && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>

                        {/* Services Selection */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-900 dark:text-slate-200">
                            Services You're Interested In
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                            {availableServices.map((service) => (
                              <div key={service.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`service-${service.id}`}
                                  checked={formData.services.includes(service.id)}
                                  onCheckedChange={() => handleServiceToggle(service.id)}
                                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <label
                                  htmlFor={`service-${service.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
                                >
                                  {service.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          {errors.services && (
                            <p className="text-red-500 dark:text-red-400 text-sm">{errors.services}</p>
                          )}
                        </div>

                        {/* Concerns Section */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-900 dark:text-slate-200">
                            Do you have any specific concerns about your project?
                          </label>
                          <RadioGroup
                            value={formData.hasConcerns}
                            onValueChange={handleConcernsChange}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="concerns-yes" className="text-primary" />
                              <Label htmlFor="concerns-yes" className="text-slate-700 dark:text-slate-300">
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="concerns-no" className="text-primary" />
                              <Label htmlFor="concerns-no" className="text-slate-700 dark:text-slate-300">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                          {errors.hasConcerns && (
                            <p className="text-red-500 dark:text-red-400 text-sm">{errors.hasConcerns}</p>
                          )}

                          {formData.hasConcerns === "yes" && (
                            <div className="space-y-2">
                              <Textarea
                                id="concerns"
                                name="concerns"
                                rows={3}
                                value={formData.concerns}
                                onChange={handleChange}
                                placeholder="Please describe your concerns..."
                                className="px-4 py-3 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none focus:border-primary focus:ring-1 focus:ring-primary"
                              />
                              {errors.concerns && (
                                <p className="text-red-500 dark:text-red-400 text-sm">{errors.concerns}</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Consultation Type */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-900 dark:text-slate-200">
                            Preferred Consultation Type
                          </label>
                          <RadioGroup
                            value={formData.consultationType}
                            onValueChange={handleConsultationTypeChange}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="in-person" id="consultation-in-person" className="text-primary" />
                              <Label htmlFor="consultation-in-person" className="text-slate-700 dark:text-slate-300">
                                In-Person Meeting
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="virtual" id="consultation-virtual" className="text-primary" />
                              <Label htmlFor="consultation-virtual" className="text-slate-700 dark:text-slate-300">
                                Virtual Meeting (Zoom/Google Meet)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="consultation-phone" className="text-primary" />
                              <Label htmlFor="consultation-phone" className="text-slate-700 dark:text-slate-300">
                                Phone Call
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Preferred Date */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-900 dark:text-slate-200">
                            Preferred Consultation Date (Optional)
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-12 px-4 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {formData.preferredDate ? (
                                  format(formData.preferredDate, "PPP")
                                ) : (
                                  <span className="text-slate-400 dark:text-slate-500">Select a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                              <CalendarComponent
                                mode="single"
                                selected={formData.preferredDate}
                                onSelect={handleDateSelect}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className="rounded-md border-0"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-slate-900 dark:text-slate-200"
                          >
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project..."
                            className="px-4 py-3 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          {errors.message && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.message}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium shadow-lg shadow-primary/20 transition-all duration-300 disabled:opacity-70"
                          disabled={isSubmitting}
                        >
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
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                <div className="backdrop-blur-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl">
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-8 text-slate-900 dark:text-white">Contact Information</h3>

                    <motion.div
                      variants={staggerChildren}
                      initial="hidden"
                      animate={isFormInView ? "visible" : "hidden"}
                      className="space-y-6"
                    >
                      {contactInfo.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={fadeUpVariants}
                          transition={{ duration: 0.5 }}
                          className="group"
                        >
                          {item.action ? (
                            <a
                              href={item.action}
                              className="flex items-start group-hover:text-primary transition-colors"
                            >
                              <ContactInfoItem item={item} />
                            </a>
                          ) : (
                            <div className="flex items-start">
                              <ContactInfoItem item={item} />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="backdrop-blur-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl">
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
                      Frequently Asked Questions
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              What is the typical timeline for a construction project?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                              Timelines vary based on project scope. Small renovations may take 2-4 weeks, while custom
                              homes typically take 6-12 months. We'll provide a detailed timeline during consultation.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              Do you provide free estimates?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                              Yes, we provide free initial consultations and estimates for all projects. Contact us to
                              schedule yours today.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              Are you licensed and insured?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                              Yes, Zewan Construction is fully licensed and insured. We maintain comprehensive coverage
                              to protect our clients and projects.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-0">
                    <div className="relative w-full h-80">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19891888283!2d36.70730744863281!3d-1.3031933000000172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1645564658896!5m2!1sen!2sus"
                        width="100%"
                        height="320"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                      ></iframe>
                    </div>
                  </div>
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

// Component extraction for DRY code
const ContactInfoItem = ({ item }) => (
  <>
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
        <item.icon className="h-5 w-5" />
      </div>
    </div>
    <div className="ml-4">
      <h3 className="font-medium mb-1 text-slate-900 dark:text-white">{item.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors whitespace-pre-line">
        {item.content}
      </p>
    </div>
  </>
)

