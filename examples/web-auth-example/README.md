# Web Auth Example App

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0%2B-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0%2B-purple)](https://vitejs.dev/)

This is an example application demonstrating the usage of the web-auth-lib with React, TypeScript, and Vite.

## Features

This example app demonstrates:

- User registration with secure credential storage
- Authentication using modern web standards
- Logout functionality
- Secure credential management
- Password-less authentication

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ADORSYS-GIS/web-auth-lib.git
cd web-auth-lib
```

2. Install dependencies:

```bash
yarn
```

3. Build the packages:

```bash
yarn build
```

### Running the Example App

To start the development server:

```bash
cd examples/web-auth-example
yarn dev
```

The application will be available at http://localhost:5173

### Building for Production

To create a production build:

```bash
cd examples/web-auth-example
yarn build
```

The build output will be in the `dist` directory.

To preview the production build locally:

```bash
yarn preview
```

## Project Structure

```
examples/web-auth-example/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── button/      # Button components
│   │   ├── context/     # Context providers
│   │   ├── prf/         # PRF components
│   │   └── toast/       # Toast notification components
│   ├── hooks/           # Custom React hooks
│   ├── app.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## Development

### Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build for production
- `yarn preview` - Preview the production build
- `yarn lint` - Run ESLint

## Additional Information

This project was bootstrapped with Vite. For more information about Vite, check out the [Vite documentation](https://vitejs.dev/).

### Vite Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## License

This project is licensed under the MIT License - see the LICENSE file for details.
