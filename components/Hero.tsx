import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-background to-blue-600/10 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4" />
                <span>Premium Quality Products</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Amazing
                <span className="text-blue-600 block">Products</span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-lg">
                Welcome to Bangladesh's premier online shopping platform. From electronics to fashion, 
                find everything you need at unbeatable prices with local delivery across Dhaka, Chittagong, and beyond.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-2xl flex items-center justify-center">
                <img src="/next-shop-icon.png" alt="NextShop" className="h-32 w-32 opacity-80" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
