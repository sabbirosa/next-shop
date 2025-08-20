const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  inStock: Boolean,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Sample products data
const sampleProducts = [
  {
    name: "Samsung Galaxy Buds Pro",
    description: "Premium wireless earbuds with active noise cancellation, perfect for music lovers and professionals. Features include 360° audio, intelligent ANC, and up to 29 hours of battery life.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
    rating: 4.8
  },
  {
    name: "Apple Watch Series 9",
    description: "The most advanced Apple Watch ever. Features include health monitoring, fitness tracking, and seamless integration with your iPhone. Perfect for health-conscious individuals.",
    price: 45999,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
    rating: 4.6
  },
  {
    name: "Armani Leather Bag",
    description: "Luxury leather bag crafted from premium Italian leather. Features multiple compartments, adjustable straps, and timeless design. Perfect for business and casual use.",
    price: 15999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Fashion",
    inStock: true,
    rating: 4.9
  },
  {
    name: "Organic Coffee Beans (Local)",
    description: "Premium organic coffee beans sourced from local Bangladeshi farms. Rich aroma and smooth taste. Perfect for coffee enthusiasts who appreciate quality and sustainability.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
    category: "Food & Beverages",
    inStock: true,
    rating: 4.7
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with maximum cushioning. Features include breathable mesh upper, foam midsole, and durable rubber outsole. Perfect for daily wear and sports.",
    price: 8999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    inStock: true,
    rating: 4.5
  },
  {
    name: "Smart LED Bulb Pack",
    description: "WiFi-enabled smart LED bulbs that can be controlled via smartphone. Features include dimming, color changing, and scheduling. Compatible with Alexa and Google Home.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home & Garden",
    inStock: true,
    rating: 4.3
  },
  {
    name: "Yoga Mat Premium",
    description: "High-quality yoga mat made from eco-friendly materials. Features include non-slip surface, perfect thickness for comfort, and beautiful design. Ideal for yoga and fitness.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "Sports",
    inStock: true,
    rating: 4.4
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Features include LED indicator, non-slip base, and compact design. Perfect for home and office use.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1609592806598-0590c2b0c2c4?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
    rating: 4.2
  }
];

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${result.length} products`);

    // Display inserted products
    console.log('\nInserted products:');
    result.forEach(product => {
      console.log(`- ${product.name} (৳${product.price})`);
    });

    console.log('\nDatabase seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
