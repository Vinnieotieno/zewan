import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Portfolio | Zewan Construction",
  description:
    "View our portfolio of custom homes, renovations, and commercial projects that showcase our quality craftsmanship and attention to detail.",
  keywords:
    "construction portfolio, custom homes, home renovations, construction projects, home remodeling examples, construction gallery",
}

export default function Portfolio() {
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
      imageSrc: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 2,
      title: "Kitchen Renovation",
      category: "renovations",
      description: "Complete kitchen renovation with custom cabinets, quartz countertops, and high-end appliances.",
      imageSrc: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "Office Building",
      category: "commercial",
      description: "A modern office building with sustainable features and collaborative workspaces.",
      imageSrc: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 4,
      title: "Luxury Home",
      category: "custom-homes",
      description: "Custom luxury home with high-end finishes, smart home technology, and outdoor living spaces.",
      imageSrc: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 5,
      title: "Bathroom Remodel",
      category: "renovations",
      description: "Spa-like bathroom renovation with custom tile work, freestanding tub, and walk-in shower.",
      imageSrc: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 6,
      title: "Retail Space",
      category: "commercial",
      description: "Modern retail space designed for optimal customer flow and product display.",
      imageSrc: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Our Portfolio</h1>

        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-primary"></div>
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Browse our collection of completed projects that showcase our commitment to quality, craftsmanship, and
          customer satisfaction.
        </p>

        <Tabs defaultValue="all" className="mb-16">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter((project) => category.id === "all" || project.category === category.id)
                  .map((project) => (
                    <div
                      key={project.id}
                      className="group overflow-hidden rounded-lg border hover:shadow-lg transition-all"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.imageSrc || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            These are just a few examples of our work. Contact us to discuss how we can bring your vision to life.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

