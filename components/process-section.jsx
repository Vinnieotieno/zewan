"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  MapPin,
  Paintbrush,
  Banknote,
  Palette,
  FileText,
  PenToolIcon as Tool,
  Users,
  MessageSquare,
  Key,
  ThumbsUp,
  Truck,
  Shield,
} from "lucide-react"

const ProcessSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      number: "1",
      title: "DEFINING YOUR PROJECT",
      description:
        "Every detail matters. We start by understanding your goals and selecting the perfect site. Then, we either design a custom home or help you choose from our portfolio of expertly crafted plans.",
      subSteps: [
        {
          icon: MapPin,
          title: "Site Selection",
          description:
            "Your home's location is crucial, but there's more to consider than just the address. We evaluate all site factors to ensure the best fit for your dream home.",
        },
        {
          icon: Paintbrush,
          title: "Home Design & Selection",
          description:
            "Whether you're envisioning a fully custom design or modifying one of our plans, we bring your ideas to life with expert craftsmanship and innovative design solutions.",
        },
      ],
    },
    {
      number: "2",
      title: "COST ESTIMATION, SELECTIONS & PROPOSAL",
      description:
        "Once the details are set—like roofing, cabinetry, and finishes—we provide a clear, upfront cost so there are no surprises.",
      subSteps: [
        {
          icon: Banknote,
          title: "Transparent Pricing",
          description:
            "We follow a fixed-cost model, so you'll know exactly what your home will cost before construction begins.",
        },
        {
          icon: Palette,
          title: "Selections & Finishes",
          description:
            "Choose from a wide range of high-quality finishes, or opt for our curated selection packages to simplify the process. Either way, we guide you every step of the way.",
        },
        {
          icon: FileText,
          title: "Project Proposal",
          description:
            "Once selections and costs are finalized, we present a detailed proposal, including a completion timeline, ensuring you're informed at every stage.",
        },
      ],
    },
    {
      number: "3",
      title: "CONSTRUCTION & EXECUTION",
      description:
        "Now the excitement begins! Our skilled team and trusted partners bring your dream home to life with precision, quality, and efficiency.",
      subSteps: [
        {
          icon: Tool,
          title: "Superior Craftsmanship",
          description:
            'We adhere to and exceed the National Association of Home Builders\' "Quality Assurance Builders Standards" to ensure top-tier workmanship.',
        },
        {
          icon: Users,
          title: "Trusted Partners & Vendors",
          description:
            "We collaborate with the best professionals in the industry, prioritizing quality, service, and value for every aspect of your home.",
        },
        {
          icon: MessageSquare,
          title: "Clear Communication & Walkthroughs",
          description:
            "We keep you engaged with regular updates and on-site walkthroughs at key stages: pre-construction, foundation, framing, mechanicals, pre-drywall, and final finishing.",
        },
      ],
    },
    {
      number: "4",
      title: "HOME DELIVERY & WARRANTY",
      description: "Your dream home is complete—now it's time to move in and enjoy!",
      subSteps: [
        {
          icon: Key,
          title: "Final Walkthrough & Orientation",
          description:
            "We answer any questions you have and ensure you're comfortable with the features and functions of your new home.",
        },
        {
          icon: ThumbsUp,
          title: "Client Feedback",
          description:
            "We value your experience and continuously strive for excellence. Your feedback helps us improve and grow.",
        },
        {
          icon: Truck,
          title: "Move-In Day",
          description: "Your vision is now a reality—welcome home!",
        },
        {
          icon: Shield,
          title: "One-Year Warranty & Tune-Up",
          description:
            "We stand behind our work. Your home comes with a no-questions-asked one-year warranty, plus a 12-month tune-up to address any minor cosmetic touch-ups.",
        },
      ],
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            WE BUILD YOUR DREAM HOME
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            At Zewan Construction, we've perfected a process to turn your vision into reality—seamlessly and
            stress-free!
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -left-4 md:left-0 top-0 -translate-x-full pr-8 hidden md:block">
                <div className="relative">
                  <div className="text-9xl font-bold text-primary/10">{step.number}</div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-primary">
                    STEP {step.number}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="ml-0 md:ml-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow">
                  <div className="md:hidden text-primary font-bold mb-4">STEP {step.number}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-8">{step.description}</p>

                  {/* Sub Steps */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {step.subSteps.map((subStep, subIndex) => (
                      <motion.div
                        key={subIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + subIndex * 0.1 }}
                        className="bg-muted/50 rounded-xl p-6 hover:bg-primary/5 transition-colors"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <subStep.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{subStep.title}</h4>
                        <p className="text-sm text-muted-foreground">{subStep.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[2.5rem] md:left-[7.5rem] top-full h-20 w-px bg-primary/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: steps.length * 0.2 }}
          className="text-center mt-20"
        >
          <p className="text-xl font-medium mb-6">
            At Zewan Construction, we don't just build houses—we build homes tailored to your lifestyle, with quality
            and care that lasts a lifetime.
          </p>
          <div className="inline-flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <button className="relative px-8 py-4 bg-primary text-primary-foreground rounded-lg leading-none flex items-center divide-x divide-gray-600">
                <span className="pr-6">Ready to get started?</span>
                <span className="pl-6">Let's build your dream home together! →</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection

