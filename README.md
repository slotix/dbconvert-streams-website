# DBConvert Streams Website & Documentation

This repository contains the website and documentation for DBConvert Streams, built with VitePress for documentation and Nuxt.js for the main website.

## Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd dbconvert-streams-website-docs
yarn install
```

## Project Structure

- `/docs` - Documentation site (VitePress)
- `/website` - Main website (Nuxt.js)

## Development

Remove old build files:

 ```bash
 rm -rf website/.output
 rm -rf website/.nuxt
 rm -rf website/public/docs
 rm -rf docs/.vitepress/dist
 rm -rf docs/.vitepress/cache
```

### Documentation Site

Run the documentation site in development mode:

```bash
yarn docs:dev
```

Build the documentation for production:

```bash
yarn docs:build
```

Serve the built documentation:

```bash
yarn docs:serve
```

### Main Website

Run the website in development mode:

```bash
yarn site:dev
```

Build the website for production:

```bash
yarn site:build
```

Generate static website:

```bash
yarn site:generate
```

Preview production build:

```bash
yarn site:preview
```

## Features

- 📚 VitePress-powered documentation
- 🎨 Nuxt.js website with TailwindCSS
- 🔍 Integrated search functionality
- 📱 Responsive design
- 🎯 Google Fonts integration
- 🗺️ Sitemap generation

## Technologies

- VitePress
- Nuxt.js
- Vue.js
- TailwindCSS
- TypeScript
- Lucide Icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

slotix <dm@slotix.sk>