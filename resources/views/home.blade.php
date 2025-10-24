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
                <div id="navbar_separator" class="hidden w-px h-14 bg-gray-300"></div>
                <div class="hidden flex flex-row gap-x-10 items-center justify-center text-center font-semibold">
                    <p id="navbar_watchlists" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Watchlists</p>
                    <p id="navbar_groups" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Groups</p>
                </div>
            </div>

            <div id="navbar_authentication" class="flex flex-row gap-x-12 items-center justify-center text-center font-semibold">
                <p id="navbar_login" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Login</p>
                <p id="navbar_register" class="text-gray-900 dark:text-white border-gray-600 dark:border-gray-200 cursor-pointer">Register</p>
            </div>
            <div id="navbar_avatar" class="flex flex-col hidden relative items-center justify-center px-8">
                <div id="avatarButton" class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                    <img type="button" class="hidden w-10 h-10 rounded-full" src="" alt="">
                    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
                <div id="avatarDropdown" class="z-10 hidden absolute right-0 top-full mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        <li>
                            <p id="navbar_profile" class="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</p>
                        </li>
                        <li>
                            <p id="navbar_logout" class="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</p>
                        </li>
                    </ul>
                </div>
            </div>
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
