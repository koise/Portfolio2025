# Portfolio 2025

A modern, responsive portfolio website built with React, featuring dark/light mode support and smooth animations.

## Features

- 🌓 **Dark/Light Mode** - Toggle between themes with persistent storage
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎨 **Modern Design** - Clean, professional UI with smooth transitions
- 🎨 **Custom Color Palette** - Orange and Blue theme with light/dark variants
- ⚡ **Fast Performance** - Built with Vite for optimal performance
- 🎯 **Placeholder Content** - Ready-to-customize sections with placeholder content
- 💅 **SASS/SCSS** - Organized styles with variables, mixins, and modular structure
- 🔥 **Firebase Integration** - View and like counters powered by Firebase Firestore.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Replace "Your Name" with your name
   - Update the subtitle and description
   - Add your photo to replace the placeholder

2. **About Section** (`src/components/About.jsx`):
   - Update the about text
   - Modify the stats (projects, experience, clients)
   - Add your about image

3. **Skills Section** (`src/components/Skills.jsx`):
   - Update the skill categories and technologies

4. **Projects Section** (`src/components/Projects.jsx`):
   - Replace placeholder projects with your actual projects
   - Update project descriptions, technologies, and links

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update contact information (email, phone, location)
   - Add your social media links
   - Connect the contact form to your backend/email service

### Styling

All styles are written in SASS/SCSS with a modular structure:

- **Color Palette** (`src/styles/_variables.scss`):
  - Primary: Orange (#FF7F50) and Blue (#1E90FF)
  - Secondary: Light/Dark variants of Orange and Blue
  - Neutral: Off-White (#F5F5F5) and Soft Gray (#D3D3D3)
  - All colors adapt automatically for light/dark themes

- **Mixins** (`src/styles/_mixins.scss`):
  - Responsive breakpoints
  - Button styles
  - Card components
  - Theme mixins

- **Customization**:
  - Modify colors in `_variables.scss`
  - Adjust spacing, borders, and transitions
  - Use mixins for consistent styling across components

## Project Structure

```
portfolio-2025/
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx / Header.scss
│   │   ├── Hero.jsx / Hero.scss
│   │   ├── About.jsx / About.scss
│   │   ├── Skills.jsx / Skills.scss
│   │   ├── Projects.jsx / Projects.scss
│   │   └── Contact.jsx / Contact.scss
│   ├── context/         # React context
│   │   └── ThemeContext.jsx
│   ├── styles/          # SASS partials
│   │   ├── _variables.scss  # Color palette & variables
│   │   └── _mixins.scss     # Reusable mixins
│   ├── App.jsx          # Main app component
│   ├── App.scss
│   ├── main.jsx         # Entry point
│   └── index.scss       # Global styles
├── firebase.json
├── .firebaserc
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- React 18
- Vite
- SASS/SCSS (with variables, mixins, and modular structure)
- CSS Variables (for dynamic theming)
- Firebase

## License

MIT

