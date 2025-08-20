"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, Plus, Settings, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [inStockCount, setInStockCount] = useState<number>(0);
  const [avgPrice, setAvgPrice] = useState<number>(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data: { inStock: boolean; price: number }[] = await res.json();
          setTotalProducts(data.length);
          setInStockCount(data.filter((p) => p.inStock).length);
          setAvgPrice(data.length ? Math.round(data.reduce((s, p) => s + (p.price || 0), 0) / data.length) : 0);
        }
      } catch {}
    };
    if (status === 'authenticated') load();
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const dashboardItems = [
    {
      title: "Add Product",
      description: "Create and list new products in your store",
      icon: Plus,
      href: "/dashboard/add-product",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Manage Products",
      description: "Edit, delete, and manage existing products",
      icon: Package,
      href: "/dashboard/products",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "Analytics",
      description: "View sales reports and analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      title: "Settings",
      description: "Configure store settings and preferences",
      icon: Settings,
      href: "#",
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-950"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-foreground/70">
            Welcome back, {session?.user?.name}! Manage your store from here.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Total Products</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">In Stock</p>
                  <p className="text-2xl font-bold">{inStockCount}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Revenue</p>
                  <p className="text-2xl font-bold">৳{avgPrice}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={item.href}>
                    <Button 
                      className="w-full" 
                      variant={item.href === "#" ? "outline" : "default"}
                      disabled={item.href === "#"}
                    >
                      {item.href === "#" ? "Coming Soon" : "Access"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/add-product">
              <Button size="lg" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Product
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
