# My Project

A modern web application built with Next.js 16, featuring interactive physics simulations powered by Matter.js for unique and engaging user experiences.

## Features

- **Interactive Physics** - Real-time physics interactions using Matter.js engine
- **Performance Optimized** - Built on Next.js 16 App Router with React 19
- **Smooth Animations** - Fluid animations powered by Framer Motion
- **Type-Safe** - Full TypeScript support with strict mode enabled
- **Responsive Design** - Optimized for all screen sizes and devices
- **Modern UI** - Component library built with Radix UI and Tailwind CSS 4
- **Theme Support** - Dark and light mode with next-themes

## Tech Stack

### Core

- [Next.js 16.1.5](https://nextjs.org/) - React framework with App Router
- [React 19.2.3](https://react.dev) - UI library
- [TypeScript 5.x](https://www.typescriptlang.org/) - Type safety
- Node.js 20+ - Runtime environment

### Styling & UI

- [Tailwind CSS 4.x](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Framer Motion 12.33.0](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [class-variance-authority](https://cva.style/) - Component variants
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes

### Physics & Interactions

- [Matter.js 0.20.0](https://brm.io/matter-js/) - 2D physics engine
- [usehooks-ts](https://usehooks-ts.com/) - React hooks utilities

### Forms & Validation

- [React Hook Form 7.71.1](https://react-hook-form.com/) - Form management
- [Zod 4.3.6](https://zod.dev/) - Schema validation
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Form validation integration

### Data Visualization

- [Recharts 2.15.4](https://recharts.org/) - Chart library
- [date-fns 4.1.0](https://date-fns.org/) - Date utilities

### Development Tools

- [Biome 2.3.14](https://biomejs.dev/) - Fast formatter and linter
- [ESLint 9.x](https://eslint.org/) - Code linting
- PostCSS - CSS processing

## Project Structure

## Project Structure

```
my-project/
├── public/                      # Static assets
│   ├── fonts/                   # Custom fonts (Azeret Mono, General Sans)
│   └── images/                  # Image assets
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (root)/             # Root route group
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page entry
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # App layout
│   │
│   ├── features/               # Feature-based modules
│   │   └── home/
│   │       ├── components/     # Feature components
│   │       │   ├── hero-section/
│   │       │   │   ├── components/
│   │       │   │   │   ├── HeroItem.tsx
│   │       │   │   │   └── HeroText.tsx
│   │       │   │   ├── HeroSection.tsx
│   │       │   │   └── index.ts
│   │       │   └── project-section/
│   │       │       ├── ProjectSection.tsx
│   │       │       └── index.ts
│   │       ├── hooks/          # Feature hooks
│   │       │   ├── useMatterPhysics.ts
│   │       │   └── PHYSICS_GUIDE.md
│   │       ├── pages/          # Feature pages
│   │       │   └── HomePage.tsx
│   │       ├── types/          # Feature types
│   │       │   └── modal.ts
│   │       └── constant.ts     # Feature constants
│   │
│   ├── hooks/                  # Shared hooks
│   │   └── use-mobile.ts
│   │
│   ├── lib/                    # Utilities
│   │   └── utils.ts
│   │
│   └── share/                  # Shared components
│       ├── layout/             # Layout components
│       └── ui/                 # UI components (40+ Radix UI components)
│           ├── button.tsx
│           ├── card.tsx
│           ├── dialog.tsx
│           └── ...
│
├── types/                      # Global types
│   ├── cache-life.d.ts
│   ├── routes.d.ts
│   └── validator.ts
│
└── Configuration files
    ├── next.config.ts          # Next.js config
    ├── tsconfig.json           # TypeScript config
    ├── tailwind.config.js      # Tailwind config
    ├── biome.json              # Biome config
    ├── eslint.config.mjs       # ESLint config
    └── components.json         # UI components config
```

## Architecture

### Feature-Based Organization

The project follows a feature-based architecture, organizing code by feature rather than by file type:

```
features/
└── [feature-name]/
    ├── components/     # UI components specific to this feature
    ├── hooks/          # Custom hooks for this feature
    ├── pages/          # Page components
    ├── types/          # Type definitions
    └── constant.ts     # Constants and configurations
```

### Component Structure

- **Atomic Design** - Components organized following atomic design principles
- **Shared UI** - Reusable component library based on Radix UI primitives
- **Feature Components** - Feature-specific components with isolated concerns

### State Management

- **React Hooks** - useState, useEffect, useRef for local state management
- **Custom Hooks** - Complex logic extracted into reusable hooks
- **Physics State** - Matter.js engine manages physics simulation state

### Styling Strategy

- **Tailwind CSS 4** - Utility-first approach for rapid development
- **CSS Variables** - Theme customization and design tokens
- **Component Variants** - CVA for managing component variations
- **Responsive Design** - Mobile-first responsive approach

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

Clone the repository and install dependencies:

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
```

### Production

Run the production server:

```bash
npm run start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Biome |
| `npm run format:check` | Check code formatting |
| `npm run biome:check` | Check for code issues |
| `npm run biome:fix` | Fix code issues automatically |

## Key Features

### Physics Engine Integration

The project integrates Matter.js to create interactive physics simulations:

- Drag and drop with mouse constraints
- Real-time collision detection
- Gravity and friction simulation
- Responsive physics boundaries

Implementation details can be found in `src/features/home/hooks/useMatterPhysics.ts`.

### Performance Optimization

- **Image Optimization** - Next.js Image component with remote patterns
- **Code Splitting** - Automatic code splitting with App Router
- **RAF Animation** - RequestAnimationFrame for smooth animations
- **Lazy Loading** - Dynamic imports for components

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js application is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Environment Variables

Configure required environment variables in `.env.local`:

```env
# Add your environment variables here
```

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind CSS reference
- [Matter.js Documentation](https://brm.io/matter-js/) - Physics engine guide
- [Radix UI Documentation](https://www.radix-ui.com/) - Accessible components
- [Framer Motion Documentation](https://www.framer.com/motion/) - Animation library

### Resources

- [Next.js GitHub Repository](https://github.com/vercel/next.js)
- [Tailwind CSS GitHub Repository](https://github.com/tailwindlabs/tailwindcss)
- [Matter.js GitHub Repository](https://github.com/liabru/matter-js)

## Contributing

Contributions, issues, and feature requests are welcome.

## License

This project is private and proprietary.
