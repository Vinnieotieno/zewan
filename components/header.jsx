"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Mail, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import Image from "next/image"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Custom Homes", href: "/services/custom-homes", icon: <Home className="h-4 w-4" /> },
        { label: "Renovations", href: "/services/renovations", icon: <RefreshCw className="h-4 w-4" /> },
        { label: "Commercial", href: "/services/commercial", icon: <Building className="h-4 w-4" /> },
        { label: "Interior Design", href: "/services/interior-design", icon: <Paintbrush className="h-4 w-4" /> },
      ],
    },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:block bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:zewan@construction.co.ke" className="hover:underline">
                  zewan@construction.co.ke
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="tel:+254790747864"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="bg-primary/10 p-1.5 rounded-full mr-2 group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="group-hover:underline">(+254) 790747864</span>
              </a>
              <a
                href="tel:+254792879775"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="bg-primary/10 p-1.5 rounded-full mr-2 group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="group-hover:underline">(+254) 792879775</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-md py-2" : "bg-background py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo and Company Name */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <Image
                  src="/logo.jpg"
                  alt="Zewan Construction Logo"
                  width={48}
                  height={48}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 tracking-tight">
                  Zewan
                </span>
                <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-wide uppercase">
                  Construction
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, i) => (
                <div key={i} className="relative group">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent ${
                          isActive(item.href)
                            ? "text-primary after:content-[''] after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                      <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-background/95 backdrop-blur-sm rounded-xl border shadow-lg p-2 transform origin-top scale-95 group-hover:scale-100 transition-transform duration-300">
                          {item.children.map((child, j) => (
                            <Link
                              key={j}
                              href={child.href}
                              className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-accent transition-all duration-200 group/item"
                            >
                              <span className="mr-3 text-primary">{child.icon}</span>
                              <span>{child.label}</span>
                              <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-x-0 group-hover/item:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent relative ${
                        isActive(item.href)
                          ? "text-primary after:content-[''] after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full"
                          : "text-foreground after:content-[''] after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-1/2"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Call to Action */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/contact">
                <Button className="relative group overflow-hidden rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    Get a Quote
                    <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform duration-500 group-hover:scale-110" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-sm">
                          <Image
                            src="/logo.jpg"
                            alt="Zewan Construction Logo"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            Zewan
                          </span>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Construction
                          </span>
                        </div>
                      </div>
                      <SheetClose className="rounded-full hover:bg-accent p-2 transition-colors">
                        <X className="h-5 w-5" />
                      </SheetClose>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto">
                    <div className="p-6">
                      <nav className="space-y-2">
                        {navItems.map((item, i) => (
                          <div key={i}>
                            {item.children ? (
                              <div className="space-y-2 mb-4">
                                <div className="font-medium px-4 py-2 text-primary">{item.label}</div>
                                <div className="pl-4 space-y-1 border-l-2 border-primary/20">
                                  {item.children.map((child, j) => (
                                    <SheetClose asChild key={j}>
                                      <Link
                                        href={child.href}
                                        className="flex items-center rounded-md px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                                      >
                                        <span className="mr-3 text-primary">{child.icon}</span>
                                        {child.label}
                                      </Link>
                                    </SheetClose>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={item.href}
                                  className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                                    isActive(item.href) ? "text-primary bg-primary/5" : "text-foreground"
                                  }`}
                                >
                                  {item.label}
                                  <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
                                </Link>
                              </SheetClose>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-muted/30">
                    <div className="grid gap-4">
                      <div className="flex flex-col space-y-3 text-sm">
                        <a
                          href="mailto:zewan@construction.co.ke"
                          className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <div className="bg-primary/10 p-1.5 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <span>zewan@construction.co.ke</span>
                        </a>

                        <a
                          href="tel:+254790747864"
                          className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <div className="bg-primary/10 p-1.5 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <span>(+254) 790747864</span>
                        </a>

                        <a
                          href="tel:+254792879775"
                          className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <div className="bg-primary/10 p-1.5 rounded-full mr-2 group-hover:bg-primary/20 transition-colors">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <span>(+254) 792879775</span>
                        </a>
                      </div>
                      <SheetClose asChild>
                        <Link href="/contact" className="w-full">
                          <Button className="w-full rounded-full group overflow-hidden relative" size="lg">
                            <span className="relative z-10 flex items-center">
                              Get a Free Quote
                              <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform duration-500 group-hover:scale-110" />
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

// Missing icon components
const Home = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const RefreshCw = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 2v6h6" />
    <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
    <path d="M21 22v-6h-6" />
    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
  </svg>
)

const Building = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
)

const Paintbrush = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
    <path d="M14.5 17.5 4.5 15" />
  </svg>
)

export default Header

