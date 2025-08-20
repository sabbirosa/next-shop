# NextShop - Premium Products E-commerce Platform

A modern, full-stack e-commerce application built with Next.js 15, featuring authentication, product management, and a beautiful user interface.

## 🚀 Features

- **Public Pages**: Landing page, product listings, and product details
- **Authentication**: Secure login/register with NextAuth.js
- **Protected Dashboard**: Add new products (authenticated users only)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Toggle**: Light/dark mode support
- **Real-time Data**: MongoDB integration with Mongoose
- **Modern UI**: Built with shadcn/ui components

## 🛠️ Technologies Used

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **State Management**: React hooks
- **Icons**: Lucide React
- **Notifications**: Sonner toast

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- Google OAuth credentials (for social login)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd next-shop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Database Setup
Ensure your MongoDB database is running and accessible.

### 5. Seed the Database (Optional)
Populate the database with sample products:

```bash
npm run seed
```

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
next-shop/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── products/      # Product management endpoints
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/             # Login page
│   ├── products/          # Product pages
│   └── register/          # Registration page
├── components/             # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── Navbar.tsx         # Navigation component
│   ├── Footer.tsx         # Footer component
│   └── ...
├── lib/                    # Utility functions and configurations
├── models/                 # MongoDB schemas
├── providers/              # Context providers
└── scripts/                # Database seeding scripts
```

## 🛣️ Route Summary

### Public Routes
- **`/`** - Landing page with hero section and featured products
- **`/products`** - Product listing page with search and filtering
- **`/products/[id]`** - Individual product details page
- **`/login`** - User authentication page
- **`/register`** - User registration page

### Protected Routes
- **`/dashboard/add-product`** - Add new products (requires authentication)

### API Endpoints
- **`/api/auth/[...nextauth]`** - NextAuth.js authentication
- **`/api/auth/register`** - User registration
- **`/api/products`** - Product CRUD operations
- **`/api/products/[id]`** - Individual product operations

## 🔐 Authentication

The application uses NextAuth.js for authentication with the following features:

- **Credential Login**: Email/password authentication
- **Social Login**: Google OAuth integration
- **Session Management**: Secure session handling
- **Protected Routes**: Automatic redirection for unauthenticated users

## 🎨 UI Components

Built with shadcn/ui components for a consistent and modern design:

- **Responsive Design**: Mobile-first approach
- **Theme Support**: Light/dark mode toggle
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and hover effects

## 🗄️ Database Schema

### User Model
- Email, password, name
- Authentication provider
- Timestamps

### Product Model
- Name, description, price
- Category, image URL
- Stock status, rating
- Creation timestamp

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **Railway**: Supports Node.js applications
- **DigitalOcean App Platform**: Container-based deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the code examples

## 🔄 Updates

Stay updated with the latest features and improvements by:
- Watching the repository
- Following the release notes
- Checking the changelog

---

**Built with ❤️ using Next.js 15 and modern web technologies**
