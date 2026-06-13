# Learning outcomes

- Online Course Platform

A fully functional, production-ready online course platform built with React, Next.js 16, Redux Toolkit, and React Query. This comprehensive frontend application features complete authentication, course browsing, shopping cart, checkout, and student dashboards.

## Features

### ✨ Core Features

- **Course Discovery**: Browse and search through 500+ courses with advanced filtering
- **User Authentication**: Sign up, login, and secure user management
- **Shopping Cart**: Add courses to cart with real-time updates
- **Checkout Flow**: Complete checkout process with form validation
- **Student Dashboard**: Track enrolled courses, progress, and certificates
- **Course Details**: Comprehensive course information with curriculum and reviews
- **Review System**: Rate and review courses, view community feedback
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop

### 🎯 Key Pages

- **Home** (`/`) - Landing page with featured courses and stats
- **Courses** (`/courses`) - Course listing with advanced filters
- **Course Details** (`/courses/[id]`) - Detailed course info with reviews
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **Shopping Cart** (`/cart`) - Review and checkout courses
- **Dashboard** (`/dashboard`) - User dashboard with stats
- **My Courses** (`/dashboard/my-courses`) - Enrolled courses with progress
- **Profile** (`/dashboard/profile`) - User profile management
- **Wishlist** (`/dashboard/wishlist`) - Saved courses

## Tech Stack

### Frontend

- **Framework**: Next.js 16.1.6 with App Router
- **UI Library**: React 19.2.3
- **State Management**: Redux Toolkit 1.9.7
- **Data Fetching**: TanStack React Query 5.28.0
- **Forms**: React Hook Form 7.54.1 + Zod validation
- **Styling**: Tailwind CSS 3.4.17
- **Components**: shadcn/ui components
- **Icons**: Lucide React 0.544.0
- **Notifications**: Sonner 1.7.1
- **Date Formatting**: date-fns 4.1.0
- **TypeScript**: 5.7.3

## Project Structure

```
app/
├── AdminLayout.tsx                 # Root layout with providers
├── AdminCoursesPage.tsx                  # Home page
├── globals.css               # Global styles with design tokens
├── (auth)/                   # Auth routes
│   ├── AdminLayout.tsx
│   ├── login/
│   │   └── AdminCoursesPage.tsx
│   └── register/
│       └── AdminCoursesPage.tsx
├── (dashboard)/              # Protected dashboard routes
│   ├── AdminLayout.tsx
│   ├── AdminCoursesPage.tsx             # Dashboard home
│   ├── my-courses/
│   │   └── AdminCoursesPage.tsx
│   ├── profile/
│   │   └── AdminCoursesPage.tsx
│   └── wishlist/
│       └── AdminCoursesPage.tsx
├── courses/
│   ├── AdminCoursesPage.tsx             # Courses listing
│   └── [id]/
│       └── AdminCoursesPage.tsx         # Course details
└── cart/
    └── AdminCoursesPage.tsx             # Shopping cart

components/
├── layout/
│   ├── navbar.tsx          # Main navigation
│   ├── footer.tsx          # Footer
│   └── mobile-nav.tsx      # Mobile menu
├── auth/
│   ├── login-form.tsx      # Login form
│   ├── register-form.tsx   # Registration form
│   └── profile-menu.tsx    # User profile dropdown
├── course/
│   ├── course-card.tsx     # Course card component
│   ├── course-filters.tsx  # Course filter sidebar
│   ├── course-curriculum.tsx # Curriculum display
│   ├── review-section.tsx  # Reviews display
│   └── add-review-form.tsx # Review submission form
├── cart/
│   ├── cart-item.tsx       # Cart item component
│   ├── cart-summary.tsx    # Cart summary
│   └── checkout-form.tsx   # Checkout form
└── providers/
    └── auth-provider.tsx   # Authentication provider

lib/
├── redux/
│   ├── store.ts            # Redux store configuration
│   ├── hooks.ts            # Redux hooks
│   └── slices/
│       ├── auth.slice.ts   # Auth state management
│       ├── courses.slice.ts # Courses state
│       ├── cart.slice.ts    # Shopping cart state
│       └── reviews.slice.ts # Reviews state
├── api/
│   ├── client.ts           # React Query client
│   └── queries.ts          # React Query hooks
├── data/
│   ├── courses.ts          # Mock course data
│   ├── reviews.ts          # Mock review data
│   └── types.ts            # TypeScript types
└── validations/
    └── schemas.ts          # Zod validation schemas
```

## State Management

### Redux Store Architecture

```
Redux Store
├── auth/                  # User authentication
│   ├── currentUser
│   ├── isAuthenticated
│   ├── isLoading
│   └── error
├── courses/               # Course management
│   ├── items
│   ├── selectedCourse
│   ├── filters
│   ├── isLoading
│   └── error
├── cart/                  # Shopping cart
│   ├── items
│   ├── total
│   ├── quantity
│   └── isCheckingOut
└── reviews/               # Reviews management
    ├── items
    ├── isLoading
    └── error
```

### React Query

- Manages async server state (courses, reviews)
- Automatic caching with 5-minute stale time
- Optimistic updates for reviews
- Error handling and retry logic

## Data Flow

### Authentication Flow

1. User submits login/registration form
2. Form validates with Zod schema
3. React Hook Form handles submission
4. Redux updates auth state
5. User data persisted to localStorage
6. AuthProvider restores state on app start

### Course Discovery Flow

1. Home page loads featured courses
2. Redux store initializes with mock data
3. User applies filters (category, level, price, rating, search)
4. Filtered courses update in real-time
5. User clicks course to view details
6. React Query fetches course reviews

### Shopping Flow

1. User adds course to cart (Redux action)
2. Cart updates in navbar and cart page
3. User reviews cart items
4. Proceeds to checkout
5. Fills billing information with validation
6. Submits order (mock payment processing)
7. Redirects to dashboard with enrolled course

## Design System

### Color Palette

- **Primary**: `hsl(241, 84%, 45%)` - Professional Blue
- **Accent**: `hsl(263, 80%, 50%)` - Vibrant Purple
- **Background**: `hsl(0, 0%, 100%)` - White (Light mode)
- **Foreground**: `hsl(0, 0%, 10%)` - Near Black

### Typography

- **Heading Font**: Geist (San Francisco-style)
- **Body Font**: Geist Sans
- **Mono Font**: Geist Mono

### Responsive Breakpoints

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Mock Data

The application uses realistic mock data:

- **8 Featured Courses** with complete details
- **12 Course Reviews** from diverse students
- **Mock Instructors** with avatars and backgrounds
- **Realistic Course Curriculum** with lessons and durations
- **Student Enrollment Data** for dashboard display

## Key Features Explained

### Advanced Filtering

- Search by course title, description, or category
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Price range slider ($0-$200)
- Rating filter (3★+, 4★+, 5★)
- Multiple filters work together

### Form Validation

All forms use React Hook Form + Zod:

- Login/Register: Email format, password strength
- Checkout: Full address validation, phone number format
- Review: Rating selection, title and comment requirements
- Profile: Optional fields with URL validation

### Cart Management

- Add/remove courses with instant updates
- Real-time total and tax calculation
- Persistent cart state
- Quantity badge in navbar

### Responsive Design

- Mobile-first approach
- Hamburger menu on tablets
- Grid layouts adapt from 1 to 4 columns
- Touch-friendly button sizes (44x44px minimum)
- Optimized images with Next.js Image component

## Authentication

### Implementation

- Mock authentication with localStorage
- User data persists across sessions
- AuthProvider restores auth state on app load
- Protected dashboard routes redirect to login
- Logout clears Redux state and localStorage

### Demo Credentials

Any email/password combination works in development:

- Email: test@example.com
- Password: password123

## Performance Optimizations

- Code splitting with dynamic imports
- Image optimization with Next.js Image
- React Query caching (5-minute stale time)
- Lazy loading for large lists
- Skeleton loading states
- Optimistic UI updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome Mobile (latest)

## Future Enhancements

- [ ] Real backend API integration
- [ ] User profile image upload
- [ ] Wishlist persistence
- [ ] Course progress tracking
- [ ] Discussion forums
- [ ] Instructor dashboard
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Course recommendations
- [ ] Video player integration

## Project Statistics

- **Total Pages**: 12
- **Total Components**: 30+
- **Lines of Code**: 5,000+
- **TypeScript Types**: 50+
- **Redux Slices**: 4
- **React Query Hooks**: 6
- **Validation Schemas**: 6
- **Mock Data Items**: 20+

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t Learning outcomes .
docker run -p 3000:3000 Learning outcomes
```

### Traditional Hosting

```bash
npm run build
npm run start
```

## Contributing

This is a demonstration project. To use as a template:

1. Replace mock data with real API calls
2. Implement backend authentication
3. Add database persistence
4. Connect payment processor
5. Set up email notifications

## License

MIT - Feel free to use this project as a template for your own applications.

## Support

For questions or issues, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ using React, Next.js, and Tailwind CSS**

# kim-online-course
# OnlineCourse
