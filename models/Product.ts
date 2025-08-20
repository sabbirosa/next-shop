import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [500, 'Product description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Product+Image'
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
