"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Clock, MapPin, ChevronRight } from "lucide-react"
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
        { label: "Custom Homes", href: "/services/custom-homes", icon: "🏠" },
        { label: "Renovations", href: "/services/renovations", icon: "🔨" },
        { label: "Commercial", href: "/services/commercial", icon: "🏢" },
        { label: "Interior Design", href: "/services/interior-design", icon: "🎨" },
      ],
    },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:block bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>zewan@construction.co.ke</span>
              </div>
              
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="tel:5551234567"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>(555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-background"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo and Company Name */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl">
                <Image
                  src="/logo.jpg"
                  alt="Zewan Construction Logo"
                  width={48}
                  height={48}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Zewan
                </span>
                <span className="text-sm text-muted-foreground">Construction</span>
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
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                          isActive(item.href) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-background rounded-xl border shadow-lg p-2">
                          {item.children.map((child, j) => (
                            <Link
                              key={j}
                              href={child.href}
                              className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                            >
                              <span className="mr-2">{child.icon}</span>
                              <span>{child.label}</span>
                              <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                        isActive(item.href) ? "text-primary" : "text-foreground"
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
                <Button className="relative group overflow-hidden rounded-xl shadow-lg">
                  <span className="relative z-10">Get a Quote</span>
                  <div className="absolute inset-0 bg-primary transition-transform duration-300 group-hover:scale-110" />
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
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                          <Image
                            src="/logo.jpg"
                            alt="Zewan Construction Logo"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Zewan</span>
                          <span className="text-sm text-muted-foreground">Construction</span>
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
                              <div className="space-y-2">
                                <div className="font-medium px-4 py-2">{item.label}</div>
                                <div className="pl-4 space-y-2">
                                  {item.children.map((child, j) => (
                                    <SheetClose asChild key={j}>
                                      <Link
                                        href={child.href}
                                        className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-accent transition-colors"
                                      >
                                        <span className="mr-2">{child.icon}</span>
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
                                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                                    isActive(item.href) ? "text-primary" : "text-foreground"
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-muted/50">
                    <div className="grid gap-4">
                      <div className="flex flex-col space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>zewan@constructon.co.ke</span>
                        </div>
                        
                        <a
                          href="tel:5551234567"
                          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          <span>(555) 123-4567</span>
                        </a>
                      </div>
                      <SheetClose asChild>
                        <Link href="/contact" className="w-full">
                          <Button className="w-full rounded-xl" size="lg">
                            Get a Quote
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

export default Header

