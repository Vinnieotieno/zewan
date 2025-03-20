import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
//import Portfolio from "@/components/portfolio"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

