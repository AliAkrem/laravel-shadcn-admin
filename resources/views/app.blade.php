<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link
            rel="icon"
            type="image/svg+xml"
            href="/images/favicon.svg"
            media="(prefers-color-scheme: light)"
        />
        <link
            rel="icon"
            type="image/svg+xml"
            href="/images/favicon_light.svg"
            media="(prefers-color-scheme: dark)"
        />
        <link
            rel="icon"
            type="image/png"
            href="/images/favicon.png"
            media="(prefers-color-scheme: light)"
        />
        <link
            rel="icon"
            type="image/png"
            href="/images/favicon_light.png"
            media="(prefers-color-scheme: dark)"
        />
        <meta name="title" content="{{config('app.name', 'Laravel')}}" />
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        
        <meta
            name="description"
            content="Admin Dashboard UI built with Laravel, Shadcn and Vite."
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@200..800&display=swap"
        rel="stylesheet"
        />

        <meta name="theme-color" content="#fff" />
        
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
