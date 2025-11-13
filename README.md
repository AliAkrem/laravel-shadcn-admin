# Laravel Shadcn Admin Dashboard

Admin Dashboard UI crafted with Shadcn and Vite, now implemented in Laravel with React Inertia.js. Built with responsiveness and accessibility in mind.

<center>
  <img width="70%" src="public/images/laravel-shadcn-admin.png" />
</center>
This project is a Laravel implementation of the original [Shadcn Admin Dashboard](https://github.com/satnaing/shadcn-admin), combining the power of Laravel's backend with React's frontend capabilities through Inertia.js. The UI components and design are adapted from the original project while being integrated into a full-stack Laravel application.

## About This Implementation

This is a complete Laravel application featuring:

- **Backend**: Laravel 12 with Inertia.js server-side adapter
- **Frontend**: React 19 with TypeScript
- **Routing**: Laravel Wayfinder for type-safe routing
- **SSR Support**: Server-side rendering capabilities with Inertia.js
- **Build Tool**: Vite with Laravel plugin integration

## Features

- Light/dark mode
- Responsive
- Accessible
- With built-in Sidebar component
- Global search command
- 10+ pages
- Extra custom components
- RTL support

<details>
<summary>Customized Components (click to expand)</summary>

This project uses Shadcn UI components, but some have been slightly modified for better RTL (Right-to-Left) support and other improvements. These customized components differ from the original Shadcn UI versions.

If you want to update components using the Shadcn CLI (e.g., `npx shadcn@latest add <component>`), it's generally safe for non-customized components. For the listed customized ones, you may need to manually merge changes to preserve the project's modifications and avoid overwriting RTL support or other updates.

> If you don't require RTL support, you can safely update the 'RTL Updated Components' via the Shadcn CLI, as these changes are primarily for RTL compatibility. The 'Modified Components' may have other customizations to consider.

### Modified Components

- scroll-area
- sonner
- separator

### RTL Updated Components

- alert-dialog
- calendar
- command
- dialog
- dropdown-menu
- select
- table
- sheet
- sidebar
- switch

**Notes:**

- **Modified Components**: These have general updates, potentially including RTL adjustments.
- **RTL Updated Components**: These have specific changes for RTL language support (e.g., layout, positioning).
- For implementation details, check the source files in `resources/js/components/ui/`.
- All other Shadcn UI components in the project are standard and can be safely updated via the CLI.

</details>

## Tech Stack

**Backend:** [Laravel 12](https://laravel.com/)

**Frontend Bridge:** [Inertia.js](https://inertiajs.com/) with React adapter

**UI Framework:** [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)

**UI Components:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/) with Laravel plugin

**Routing:** [Laravel Wayfinder](https://github.com/laravel/wayfinder) (Type-safe routing)

**Styling:** [TailwindCSS 4](https://tailwindcss.com/)

**Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons) (Brand icons only)

**Testing:** [Pest PHP](https://pestphp.com/)

## Run Locally

Clone the project

```bash
  git clone <your-repository-url>
```

Go to the project directory

```bash
  cd <project-directory>
```

Install PHP dependencies

```bash
  composer install
```

Install Node dependencies

```bash
  npm install
```

Set up environment file

```bash
  cp .env.example .env
  php artisan key:generate
```

Start the development server (runs Laravel server, queue, logs, and Vite concurrently)

```bash
  composer dev
```

The application will be available at `http://localhost:8000`

## Credits

This project is based on the original [Shadcn Admin Dashboard](https://github.com/satnaing/shadcn-admin) by [@satnaing](https://github.com/satnaing). The UI components and design patterns are adapted from that project.

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
