<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif

    <style>
        @custom-variant dark (&:where(.dark, .dark *));
    </style>

    <script>
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    (function () {
        // localStorage stores strings: '0' = dark, '1' = light
        const theme = localStorage.getItem('theme');

        if (theme === '0' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    })();
</script>
</head>

<body class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen flex flex-col">

    <!-- Header -->
    <header class="w-full bg-blue-600 text-white shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <img id="home" src="{{ asset('images/cineverselogo.png') }}" alt="Cineverse Logo"
                class="w-32 h-32 object-contain cursor-pointer self-start" />
            <a href="{{ url('/profile') }}" title="Profilo" class="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded">
                <span class="sr-only">Profilo</span>
                <svg class="w-10 h-10 rounded-full border-2 border-white group-hover:border-yellow-300 bg-white text-blue-600 transition"
                     fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            </a>
        </div>
    </header>

    <!-- Contenuto -->
    <main class="flex flex-col items-center w-full min-h-[calc(100svh-179px)] ">

    </main>

    <!-- Footer -->
    <footer class="text-center py-6 bg-blue-600 text-white mt-8">
        <p>&copy; 2025 Cineverse. Tutti i diritti riservati.</p>
    </footer>

</body>

</html>
