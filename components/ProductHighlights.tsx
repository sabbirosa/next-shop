import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

// Mock featured products data with Bangladeshi products
const featuredProducts = [
  {
    id: 1,
    name: "Samsung Galaxy Buds Pro",
    price: 2999,
    image: "https://via.placeholder.com/300x200?text=Headphones",
    rating: 4.8,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Apple Watch Series 9",
    price: 45999,
    image: "https://via.placeholder.com/300x200?text=Smart+Watch",
    rating: 4.6,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Armani Leather Bag",
    price: 15999,
    image: "https://via.placeholder.com/300x200?text=Leather+Bag",
    rating: 4.9,
    category: "Fashion"
  },
  {
    id: 4,
    name: "Organic Coffee Beans (Local)",
    price: 2499,
    image: "https://via.placeholder.com/300x200?text=Coffee+Beans",
    rating: 4.7,
    category: "Food & Beverages"
  }
];

export default function ProductHighlights() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our customers love across Bangladesh
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/60 bg-blue-500/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ৳{product.price}
                  </span>
                  <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/products">
            <Button size="lg" variant="outline" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
