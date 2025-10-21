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

</head>

<body class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen flex flex-col">

    <!-- Header -->
    <header class="w-full bg-indigo-500 dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
        <div id="navbar" class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <div class="flex flex-row gap-x-12 items-center justify-center">
                <img id="home" src="{{ asset('images/cineverselogo.png') }}" alt="Cineverse Logo" class="w-16 h-16 object-contain cursor-pointer self-start" />
                <div class="flex flex-row gap-x-10 items-center justify-center text-center font-semibold">
                    <p id="navbar_home" class="text-gray-900 dark:text-white border-b-2 border-gray-600 dark:border-gray-200 cursor-pointer">Home</p>
                    <p id="navbar_archive" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Archive</p>
                </div>
                <div class="hidden w-px h-14 bg-gray-300"></div>
                <div class="hidden flex flex-row gap-x-10 items-center justify-center text-center font-semibold">
                    <p class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Watchlists</p>
                    <p class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Posts</p>
                    <p class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Groups</p>
                </div>
            </div>

            <div class="flex flex-row gap-x-12 items-center justify-center text-center font-semibold">
                <p id="navbar_login" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Login</p>
                <p id="navbar_register" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Register</p>
            </div>
            {{-- <a href="{{ url('/profile') }}" title="Profilo" class="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded">
                <span class="sr-only">Profilo</span>
                <svg class="w-10 h-10 rounded-full border-2 border-white group-hover:border-yellow-300 bg-white text-blue-600 transition"
                     fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            </a> --}}
        </div>
    </header>

    <!-- Contenuto -->
    <main class="flex flex-col items-center w-full min-h-[calc(100svh-179px)] ">

    </main>

    <!-- Footer -->
    <footer class="text-center py-6 bg-indigo-500 dark:bg-gray-900 text-gray-900 dark:text-white mt-8">
        <p>&copy; 2025 Cineverse. Tutti i diritti riservati.</p>
    </footer>

</body>

</html>
