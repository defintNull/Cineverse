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

<body class="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col">

    <!-- Header -->
    <header class="w-full bg-blue-600 text-white shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 class="text-2xl font-bold tracking-wide">🎬 Cineverse</h1>
            <a href="#" class="flex items-center space-x-2 group">
                <span class="sr-only">Profilo</span>
                <svg class="w-10 h-10 rounded-full border-2 border-white group-hover:border-yellow-300 bg-white text-blue-600 transition"
                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            </a>
        </div>
    </header>

    <!-- Contenuto -->
    <main class="flex-1 w-full max-w-6xl mx-auto px-4 py-8 space-y-8">

        <!-- Barra di ricerca con filtri -->
        <section class="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <form id="searchForm" class="flex flex-col md:flex-row md:flex-wrap items-center gap-4">
                <input type="text" name="query" placeholder="🔍 Cerca film..." id="searchBox"
                    class="flex-1 min-w-0 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm" />
                <select name="genre" id="genreSelect"
                    class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm">
                    <option value="">Tutti i generi</option>
                    <option value="azione">Azione</option>
                    <option value="commedia">Commedia</option>
                    <option value="dramma">Dramma</option>
                </select>
                <select name="year" id="yearSelect"
                    class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm">
                    <option value="">Tutti gli anni</option>
                </select>
            </form>
        </section>

        <!-- Sezione film popolari -->
        <section class="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">🔥 Film popolari</h2>
            <div id="popularMoviesSection" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Film popolari caricati da JS -->
                <div class="bg-gray-50 rounded-lg shadow hover:shadow-lg transition p-4 text-center">
                    <div class="h-40 bg-gray-200 rounded mb-3"></div>
                    <h3 class="font-semibold">Titolo Film</h3>
                    <p class="text-sm text-gray-500">Genere • Anno</p>
                </div>
            </div>
        </section>

        <!-- Sezione film da vedere -->
        <section class="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">📌 Da vedere</h2>
            <div id="watchlistSection" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Film da vedere caricati da JS -->
                <div class="bg-gray-50 rounded-lg shadow hover:shadow-lg transition p-4 text-center">
                    <div class="h-40 bg-gray-200 rounded mb-3"></div>
                    <h3 class="font-semibold">Titolo Film</h3>
                    <p class="text-sm text-gray-500">Genere • Anno</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="text-center py-6 bg-blue-600 text-white mt-8">
        <p>&copy; 2025 Cineverse. Tutti i diritti riservati.</p>
    </footer>

</body>
</html>
