import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/next-shop-icon.png" alt="NextShop" className="h-8 w-8" />
              <span className="text-xl font-bold">NextShop</span>
            </Link>
            <p className="text-foreground/70 max-w-xs">
              Bangladesh's premier online shopping destination. Quality, reliability, and customer satisfaction guaranteed with nationwide delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-foreground/70 hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=electronics" className="text-foreground/70 hover:text-foreground transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="text-foreground/70 hover:text-foreground transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=home" className="text-foreground/70 hover:text-foreground transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/products?category=sports" className="text-foreground/70 hover:text-foreground transition-colors">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-foreground/70">info@nextshop.bd</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-foreground/70">+880 1XXX-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-foreground/70">Dhanmondi, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-foreground/60">
            © 2024 NextShop. All rights reserved. Built with Next.js and ❤️ for Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
