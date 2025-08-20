"use client";

import { useCart } from "@/providers/cart-provider";
import { LogOut, Menu, ShoppingCart, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ShoppingCartDrawer from "./ShoppingCartDrawer";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/next-shop-icon.png" alt="NextShop" className="h-8 w-8" />
            <span className="text-xl font-bold">NextShop</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground/70 hover:text-foreground transition-colors">
              Products
            </Link>
            {session && (
              <>
                <Link href="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/dashboard/add-product" className="text-foreground/70 hover:text-foreground transition-colors">
                  Add Product
                </Link>
              </>
            )}
          </div>

          {/* Right side - Auth & Theme */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            <ThemeToggle />
            
            {status === "loading" ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : session ? (
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-sm text-foreground/70">
                  {session.user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link href="/register">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              {session && (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/add-product"
                    className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Product
                  </Link>
                </>
              )}
              {session ? (
                <div className="px-3 py-2">
                  <div className="text-sm text-foreground/70 mb-2">
                    Welcome, {session.user?.name}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/register" className="w-full">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full">
                    <Button size="sm" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ShoppingCartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
