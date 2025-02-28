import Header from "@/components/header"
import Footer from "@/components/footer"
import { Home, Hammer, PaintBucket, Ruler, HardHat, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Services | Zewan Construction",
  description:
    "Explore our comprehensive construction services including custom home building, renovations, remodeling, and more.",
  keywords:
    "construction services, custom home building, home renovation, remodeling, home additions, kitchen remodeling, bathroom renovation",
}

export default function Services() {
  const services = [
    {
      icon: <Home className="h-10 w-10" />,
      title: "Custom Home Building",
      description: "We design and build custom homes tailored to your specific needs, preferences, and lifestyle.",
      features: [
        "Architectural design",
        "Energy-efficient construction",
        "Quality materials",
        "Detailed craftsmanship",
      ],
    },
    {
      icon: <Hammer className="h-10 w-10" />,
      title: "Home Renovations",
      description: "Transform your existing home with our comprehensive renovation services.",
      features: ["Full home renovations", "Kitchen remodeling", "Bathroom updates", "Basement finishing"],
    },
    {
      icon: <PaintBucket className="h-10 w-10" />,
      title: "Interior & Exterior Finishing",
      description: "Enhance the beauty and functionality of your home with our finishing services.",
      features: ["Custom cabinetry", "Flooring installation", "Painting services", "Exterior siding"],
    },
    {
      icon: <Ruler className="h-10 w-10" />,
      title: "Additions & Extensions",
      description: "Expand your living space with our home addition and extension services.",
      features: ["Room additions", "Second story additions", "Garage conversions", "Sunrooms"],
    },
    {
      icon: <HardHat className="h-10 w-10" />,
      title: "Commercial Construction",
      description: "We provide construction services for small to medium-sized commercial projects.",
      features: ["Office renovations", "Retail spaces", "Restaurant buildouts", "Medical facilities"],
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Project Management",
      description: "Our experienced team manages every aspect of your construction project.",
      features: ["Budget management", "Timeline coordination", "Subcontractor supervision", "Quality control"],
    },
  ]

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Our Services</h1>

        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-primary"></div>
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          At Zewan Construction, we offer a comprehensive range of construction services to meet all your building and
          renovation needs. Our experienced team is dedicated to delivering exceptional quality and customer
          satisfaction.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Contact us today to schedule a consultation and discuss how we can bring your vision to life.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

