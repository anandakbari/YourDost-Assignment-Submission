# User Directory - Frontend Application

A modern, responsive React application that fetches and displays user data from the ReqRes API with advanced filtering, searching, sorting, and pagination capabilities.

## 🚀 Live Demo

[Deploy your app and add the link here]

## 📋 Project Overview

This application fulfills the Frontend Task requirements by building a comprehensive User Directory with the following features:

### ✅ Core Requirements
- **Fetch user list** from ReqRes API (`https://reqres.in/api/users`)
- **Display in table/card format** with responsive grid layout
- **Search functionality** by name or email
- **Sorting capabilities** by first name, last name, or email
- **Pagination** handling multiple API pages
- **Filtering options** by email domain and name ranges

### 🎯 Bonus Features Implemented
- **Loading spinner** with smooth animations
- **Fully mobile responsive** design with Tailwind CSS
- **Modern UI/UX** with cards, gradients, and hover effects
- **Real-time search** with instant filtering
- **Advanced animations** and transitions
- **Error handling** with user-friendly error messages
- **TypeScript** for type safety

## 🛠 Tech Stack

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS 4.1.17
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **Type Safety**: TypeScript 5.9.3
- **Code Quality**: ESLint with React hooks and refresh plugins

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx       # App header with branding
│   │   ├── UserDirectory.tsx # Main container component
│   │   ├── SearchAndFilter.tsx # Search and filter controls
│   │   ├── UserGrid.tsx     # User cards grid layout
│   │   ├── UserCard.tsx     # Individual user card
│   │   ├── Pagination.tsx   # Pagination controls
│   │   └── LoadingSpinner.tsx # Loading animation
│   ├── services/            # API services
│   │   └── userService.ts   # User data fetching logic
│   ├── types/               # TypeScript type definitions
│   │   └── User.ts          # User interface definition
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind config
├── public/                  # Static assets
├── dist/                    # Build output (after build)
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── netlify.toml            # Netlify deployment configuration
└── README.md               # This file
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173/
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

## 🔧 Configuration

### Tailwind CSS v4.0
This project uses the latest Tailwind CSS v4.0 with simplified configuration:
- No configuration file needed
- Automatic content detection
- Faster build times with Rust-based engine

### TypeScript Configuration
- Strict type checking enabled
- React 19 JSX transform
- Modern ES modules support

## 🎨 Features Deep Dive

### 🔍 Search & Filter System
- **Real-time search**: Instant filtering as you type
- **Multi-field search**: Search across first name, last name, and email
- **Email domain filters**: Gmail, Yahoo, ReqRes domains
- **Name range filters**: Alphabetical groupings (A-F, G-L, M-R, S-Z)
- **Clear filters**: Easy reset functionality

### 📊 Sorting Options
- **First Name**: Alphabetical sorting by first name
- **Last Name**: Alphabetical sorting by last name  
- **Email**: Alphabetical sorting by email address
- **Default Order**: Original API response order

### 📄 Pagination
- **Smart pagination**: Shows 5 page buttons with ellipsis
- **Items per page**: 6 users per page for optimal viewing
- **Navigation controls**: Previous/Next buttons
- **Mobile responsive**: Simplified view on small screens
- **Results counter**: Shows "X-Y of Z results"

### 🎯 User Interface
- **Card-based layout**: Clean, modern user cards
- **Avatar display**: User profile pictures with online indicators
- **Domain badges**: Color-coded email domain indicators
- **Responsive grid**: 1-3 columns based on screen size
- **Smooth animations**: Fade-in, slide-up, hover effects
- **Loading states**: Skeleton loading with spinner

### 📱 Mobile Responsiveness
- **Breakpoint design**: Mobile-first responsive approach
- **Touch-friendly**: Large tap targets and spacing
- **Simplified pagination**: Mobile-optimized page controls
- **Flexible layout**: Stacked elements on small screens

## 🔄 API Integration

### Data Source
- **API**: ReqRes API (https://reqres.in/api/users)
- **Method**: Fetches all pages automatically
- **Caching**: Client-side data management
- **Error handling**: Graceful error states with retry options

### Data Flow
1. **Initial load**: Fetches all user pages from API
2. **Client-side processing**: All filtering, sorting, searching happens locally
3. **Real-time updates**: Instant UI updates without additional API calls
4. **Pagination**: Client-side pagination for smooth UX

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (blue-500 to blue-700)
- **Neutral**: Gray shades for text and borders
- **Status**: Green for online indicators
- **Domain colors**: Red (Gmail), Purple (Yahoo), Blue (ReqRes)

### Typography
- **Headings**: Font weights 600-700
- **Body text**: Font weight 400-500
- **Labels**: Font weight 500-600

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Consistent padding, focus states, transitions
- **Inputs**: Clean borders, focus rings, placeholder styling

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deployment Platforms

#### Vercel (Recommended)

**Option 1: Deploy from root directory**
1. Ensure you have a `vercel.json` file in the root directory:
```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install"
}
```

2. Deploy with Vercel CLI:
```bash
vercel --prod
```

**Option 2: Deploy frontend directory directly**
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Deploy directly:
```bash
vercel --prod
```

**Option 3: GitHub Integration**
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend` in Vercel dashboard
3. Automatic deployments on push to main branch

#### Netlify (Alternative)

**Option 1: Automatic GitHub Integration**
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm ci && npm run build` (auto-detected)
   - **Publish directory**: `dist` (auto-detected)
3. Deploy automatically on git push

**Option 2: Manual Deploy**
1. Build the project locally:
   ```bash
   cd frontend
   npm run build
   ```
2. Drag & drop the `dist/` folder to Netlify dashboard

**Option 3: Netlify CLI**
```bash
cd frontend
netlify deploy --prod --dir=dist
```

The `netlify.toml` configuration file includes:
- ✅ Build optimization settings
- ✅ SPA routing support (redirects all routes to index.html)
- ✅ Security headers
- ✅ Asset caching for better performance
- ✅ Gzip compression

#### Other Platforms
- **GitHub Pages**: Use GitHub Actions with `frontend/dist` as source
- **Firebase Hosting**: `firebase deploy` from frontend directory

### Environment Setup
No environment variables required - the app uses public APIs only.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Users load successfully
- [ ] Search works across all fields
- [ ] All filters function correctly
- [ ] Sorting works for all options
- [ ] Pagination navigates properly
- [ ] Mobile responsiveness verified
- [ ] Loading states appear correctly
- [ ] Error handling works

### Browser Support
- Chrome/Edge (90+)
- Firefox (90+)
- Safari (14+)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

### Optimization Features
- **Lazy loading**: Images load as needed
- **Efficient rendering**: Memoized components
- **Small bundle**: Optimized dependencies
- **Fast builds**: Vite + Tailwind CSS v4.0

### Bundle Analysis
```bash
npm run build
# Check dist/ folder sizes
```

## 🤝 Contributing

### Code Style
- **ESLint**: Configured with React best practices
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (recommended)

### Development Workflow
1. Create feature branch
2. Make changes with proper TypeScript types
3. Test across devices and browsers
4. Run `npm run lint` before committing
5. Create pull request

## 📝 Notes & Decisions

### Technical Decisions
- **Tailwind CSS v4.0**: Chosen for latest features and performance
- **Client-side filtering**: Better UX than API requests for each filter
- **Card layout**: More modern and mobile-friendly than traditional tables
- **TypeScript**: Enhanced developer experience and code quality

### Trade-offs
- **All data fetched upfront**: Better UX but initial load time
- **Client-side pagination**: Smooth UX but not suitable for large datasets
- **No backend caching**: Simpler setup but API dependency

## 🐛 Troubleshooting

### Common Issues

**Build fails with Tailwind errors:**
```bash
# Ensure you have Tailwind CSS v4.0
npm install tailwindcss@latest @tailwindcss/vite@latest
```

**TypeScript errors:**
```bash
# Check TypeScript version compatibility
npm install typescript@latest
```

**API not loading:**
- Check internet connection
- Verify ReqRes API status at https://reqres.in/

**Vercel deployment fails with "Failed to resolve /src/main.tsx":**
1. Ensure you're using the correct deployment method:
   - Deploy from frontend directory: `cd frontend && vercel`
   - Or use vercel.json in root with proper configuration
2. Check that vercel.json has the correct paths:
   ```json
   {
     "buildCommand": "cd frontend && npm run build",
     "outputDirectory": "frontend/dist",
     "installCommand": "cd frontend && npm install"
   }
   ```
3. Verify index.html script tag points to correct path: `/src/main.tsx`
4. Ensure all dependencies are installed in frontend/node_modules

**Vercel build succeeds but app doesn't load:**
- Check that SPA fallback is configured for client-side routing
- Verify all assets are correctly referenced
- Check browser console for errors

## 📄 License

This project is part of a frontend development task and is for educational/evaluation purposes.

## 👨‍💻 Developer

Created as part of the Frontend Developer assessment task.

---

*This README covers all aspects of the User Directory application, from setup to deployment. For any questions or issues, please refer to the troubleshooting section or create an issue.*
